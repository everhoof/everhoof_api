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

import { StationService } from '~/modules/station/station.service';
import { TrackRequestArgs } from '~/modules/tracks/args/track-request.args';
import { TrackSearchArgs } from '~/modules/tracks/args/track-search.args';
import { TracksGateway } from '~/modules/tracks/tracks.gateway';
import { CurrentPlaying } from '~/modules/tracks/types/current-playing';
import { GatewayTrack } from '~/modules/tracks/types/gateway';
import { HistoryItem } from '~/modules/tracks/types/history';
import { NowPlaying } from '~/modules/tracks/types/nowplaying';
import {
  PlayoutHistory,
  QueueOrigin,
} from '~/modules/tracks/types/playout-history';
import { SongsResponse } from '~/modules/tracks/types/songs';
import { TrackRequestResponse } from '~/modules/tracks/types/track-request-response';
import { TrackSearchResponse } from '~/modules/tracks/types/track-search-response';

@Injectable()
export class TracksService {
  private readonly rbaClient: Got;

  private readonly rbaPrivateClient: Got;

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
    this.rbaPrivateClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.RBA_API_BASE_URL}`,
      headers: {
        CoreApiKey: `${process.env.RBA_API_KEY}`,
      },
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
    const response = await this.rbaClient('Song', {
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
      page: response.page,
      count: trackSearchArgs.count,
      total: response.totalItems,
      items: response.items.map((track) => ({
        requestId: `${track.id}`,
        track: {
          id: `${track.id}`,
          title: track.title ?? '',
          artist: track.artist ?? '',
          album: track.album ?? '',
          art: this.getArt(track.id),
          lyrics: track.lyrics ?? '',
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
      const response = await this.rbaClient.post('Queue/addRequest', {
        searchParams: {
          songId: args.songId,
        },
        headers,
      }).text();

      return {
        success: true,
        message: response,
      };
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = error.response.rawBody.toString();
        return {
          success: false,
          message: response,
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
    return `${process.env.PUBLIC_URL}AssetProxy/songCover?songId=${songId}`;
  }

  @Interval(5000)
  private async updateCurrentPlaying() {
    const currentPlaying: CurrentPlaying = new CurrentPlaying();

    try {
      const station = await this.stationService.getStation();
      const response: NowPlaying | null = await this.rbaClient('Statistics/currentPlaying').json();
      const history: PlayoutHistory | null = await this.rbaPrivateClient('Statistics/playoutHistory?limit=15').json();

      this.tracksHistory = history?.items
        .filter((item) => item.origin !== QueueOrigin.AutoDJ_jingle)
        .map((item) => ({
          id: item.id,
          playedAt: this.transformIsoToUnix(item.begin),
          duration: this.transformDuration(item.song.length),
          playlist: 'unknown',
          streamer: 'unknown',
          isRequest: false,
          track: {
            id: item.song.id.toString(),
            text: [item.song.artist, item.song.title].filter((part) => part).join(' - '),
            artist: item.song.artist ?? '',
            title: item.song.title ?? '',
            album: item.song.album ?? '',
            lyrics: '',
            art: '',
          },
        })).slice(0, 10) ?? [];

      if (!response) return;

      let id: string = response.current?.id.toString() || response.lastMetadata?.id || '';
      let title: string = response.current?.title || response.lastMetadata?.title || '';
      let artist: string = response.current?.artist || response.lastMetadata?.artist || '';
      let name: string = [artist, title].filter((part) => part).join(' - ') || '';
      let duration: number = this.transformDuration(response.current?.length);
      let startsAt: number = this.transformIsoToUnix(response.current?.begin);
      let endsAt: number = startsAt + duration * 1000;
      let art: string = this.getArt(id);

      if (response.liveUser) {
        if (response.lastMetadata?.id) {
          id = response.lastMetadata?.id;
        }

        if (response.lastMetadata?.title) {
          const split = response.lastMetadata?.title?.split(/[–—-]/);
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

        if (response.lastMetadata?.artist) {
          artist = response.lastMetadata?.artist;
        }
      }

      currentPlaying.current = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      id = response.next?.id.toString() || '';
      title = response.next?.title || '';
      artist = response.next?.artist || '';
      name = [artist, title].filter((part) => part).join(' - ') || '';
      duration = this.transformDuration(response.next?.length);
      startsAt = this.transformIsoToUnix(response.next?.begin);
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
        isLive: !!response.liveUser,
        streamerName: response.liveUser ?? '',
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
