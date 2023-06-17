import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got, {
  Got,
  HTTPError,
} from 'got';
import {
  DateTime,
  Duration,
} from 'luxon';

import { BaseResponse } from '~/common/types';
import { StationService } from '~/modules/station/station.service';
import { TrackRequestArgs } from '~/modules/tracks/args/track-request.args';
import { TrackSearchArgs } from '~/modules/tracks/args/track-search.args';
import { TracksGateway } from '~/modules/tracks/tracks.gateway';
import { CurrentPlaying } from '~/modules/tracks/types/current-playing';
import { GatewayTrack } from '~/modules/tracks/types/gateway';
import { HistoryItem } from '~/modules/tracks/types/history';
import { NowPlayingResponse } from '~/modules/tracks/types/nowplaying';
import { HistoryResponse } from '~/modules/tracks/types/playout-history';
import { SongsResponse } from '~/modules/tracks/types/songs';
import { TrackRequestResponse } from '~/modules/tracks/types/track-request-response';
import { TrackSearchResponse } from '~/modules/tracks/types/track-search-response';

@Injectable()
export class TracksService {
  private readonly rbaClient: Got;

  private currentPlaying?: CurrentPlaying;

  private tracksHistory: HistoryItem[] = [];

  constructor(
    @Inject(forwardRef(() => TracksGateway))
    private readonly tracksGateway: TracksGateway,
    private readonly stationService: StationService,
  ) {
    this.rbaClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.RBA_API_BASE_URL}`,
    });
  }

  async getCurrentPlaying(): Promise<CurrentPlaying | undefined> {
    if (!this.currentPlaying) await this.updateCurrentPlaying();
    else this.currentPlaying.timestamp = Date.now();
    return this.currentPlaying;
  }

  async getTracksHistory(): Promise<HistoryItem[]> {
    if (this.tracksHistory.length === 0) await this.updateCurrentPlaying();
    return this.tracksHistory;
  }

  async searchTracks(trackSearchArgs: TrackSearchArgs): Promise<TrackSearchResponse> {
    const response = await this.rbaClient.post('ListenerSongRequest/search-song', {
      searchParams: {
        page: trackSearchArgs.page,
        limit: trackSearchArgs.count,
        query: trackSearchArgs.q,
      },
    }).json<SongsResponse>();
    if (!response) {
      return {
        page: 1,
        count: 0,
        total: 0,
        items: [],
      };
    }

    return {
      page: response.value.pageNumber,
      count: trackSearchArgs.count,
      total: response.value.totalCount,
      items: response.value.items.map((track) => ({
        requestId: `${track.id}`,
        track: {
          id: `${track.id}`,
          title: track.title ?? '',
          artist: track.artist ?? '',
          album: track.album ?? '',
          art: this.getArt(track.id),
          lyrics: '',
          text: [track.artist, track.title].filter((part) => part).join(' - '),
        },
      })),
    };
  }

  async requestTrack(args: TrackRequestArgs, ip?: string): Promise<TrackRequestResponse> {
    const headers = {};
    if (ip) {
      headers['X-Forwarded-For'] = ip;
    }

    try {
      const response = await this.rbaClient.post('ListenerSongRequest/add-request', {
        searchParams: {
          songId: args.songId,
        },
        headers,
      }).json<BaseResponse<string>>();

      if (response.succeeded) {
        return {
          success: response.succeeded,
          message: response.value || 'Трек успешно добавлен в очередь.',
        };
      }

      return {
        success: response.succeeded,
        message: response.errors.join('\n'),
      };
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = JSON.parse(error.response.rawBody.toString());
        return {
          success: false,
          message: response.errors.join('\n'),
        };
      }
    }

    return {
      success: false,
      message: 'Unknown error',
    };
  }

  private transformDuration(length?: string | null): number {
    if (!length) return 0;
    return Duration.fromISOTime(length.split('.')[0]).as('seconds');
  }

  private transformIsoToUnix(isoDate?: string | null): number {
    if (!isoDate) return Date.now();
    return DateTime.fromISO(isoDate).toMillis();
  }

  private getArt(songId?: string | number | null): string {
    if (!songId) return '';
    return `${process.env.PUBLIC_URL}SongAsset/cover?songId=${songId}`;
  }

  @Interval(5000)
  private async updateCurrentPlaying() {
    const currentPlaying: CurrentPlaying = new CurrentPlaying();

    try {
      const station = await this.stationService.getStation();
      const response: NowPlayingResponse = await this.rbaClient('PublicInfo/now-playing').json();
      const history: HistoryResponse = await this.rbaClient('PublicInfo/history?itemCount=15').json();

      this.tracksHistory = history.value
        .map((item, i) => ({
          id: i,
          playedAt: this.transformIsoToUnix(item.playingEnded),
          duration: 0,
          playlist: 'unknown',
          streamer: 'unknown',
          isRequest: false,
          track: {
            id: i.toString(),
            text: [item.artist, item.title].filter((part) => part).join(' - '),
            artist: item.artist ?? '',
            title: item.title ?? '',
            album: '',
            lyrics: '',
            art: '',
          },
        })).slice(0, 10) ?? [];

      if (!response.value) return;

      let id: string = response.value.now?.id?.toString() || '';
      let title: string = response.value.now?.title || response.value.rawMetadata?.title || '';
      let artist: string = response.value.now?.artist || response.value.rawMetadata?.artist || '';
      let name: string = [artist, title].filter((part) => part).join(' - ') || '';
      let duration: number = this.transformDuration(response.value.now?.audioLength);
      let startsAt: number = this.transformIsoToUnix(response.value.now?.begin);
      let endsAt: number = startsAt + duration * 1000;
      let art: string = this.getArt(id);

      if (response.value.liveUser) {
        if (response.value.rawMetadata?.title) {
          const split = response.value.rawMetadata?.title?.split(/[–—-]/);
          if (split[0]) {
            if (split[1]) {
              artist = split[0].trim();
              title = split[1].trim();
              name = `${artist} - ${title}`;
            } else {
              artist = 'Unknown';
              title = split[0].trim();
              name = title;
            }
          }
        }

        if (response.value.rawMetadata?.artist) {
          artist = response.value.rawMetadata?.artist;
        }
      }

      currentPlaying.current = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      id = response.value.next?.id?.toString() || '';
      title = response.value.next?.title || '';
      artist = response.value.next?.artist || '';
      name = [artist, title].filter((part) => part).join(' - ') || '';
      duration = this.transformDuration(response.value.next?.audioLength);
      startsAt = this.transformIsoToUnix(response.value.next?.begin);
      endsAt = startsAt + duration * 1000;
      art = this.getArt(id);

      currentPlaying.next = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      id = this.tracksHistory[0]?.id.toString() || '';
      title = this.tracksHistory[0]?.track.title || '';
      artist = this.tracksHistory[0]?.track.artist || '';
      name = this.tracksHistory[0]?.track.text || '';
      duration = this.tracksHistory[0]?.duration;
      startsAt = this.tracksHistory[0]?.playedAt;
      endsAt = startsAt + duration * 1000;
      art = this.getArt(id);

      currentPlaying.previous = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      currentPlaying.live = {
        isLive: !!response.value.liveUser,
        streamerName: response.value.liveUser ?? '',
        broadcastStart: 0,
      };

      currentPlaying.timestamp = Date.now();
      currentPlaying.listenersCount = 0;

      station.mounts.forEach((mount) => {
        currentPlaying.listenersCount += mount.listeners.unique;
      });

      if (this.currentPlaying?.current.id !== currentPlaying.current.id) {
        this.currentPlaying = currentPlaying;
        this.tracksGateway.sendCurrentTrack();
      } else {
        this.currentPlaying = currentPlaying;
      }
    } catch (error) {
      console.log('Error while updating currentPlaying:');
      console.log(error);
    }
  }

  getGatewayTrack(): GatewayTrack | undefined {
    let track: GatewayTrack | undefined;

    if (this.currentPlaying?.current) {
      track = {
        id: this.currentPlaying.current.id,
        title: this.currentPlaying.current.title,
        artist: this.currentPlaying.current.artist,
        name: this.currentPlaying.current.name,
        art: this.currentPlaying.current.art,
        duration: this.currentPlaying.current.duration,
        starts_at: this.currentPlaying.current.startsAt
          ? DateTime.fromMillis(this.currentPlaying.current.startsAt).toISO()
          : null,
        ends_at: this.currentPlaying.current.endsAt
          ? DateTime.fromMillis(this.currentPlaying.current.endsAt).toISO()
          : null,
      };
    }

    return track;
  }
}
