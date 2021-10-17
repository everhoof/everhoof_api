import { TrackRequestArgs } from '@modules/tracks/args/track-request.args';
import { TrackSearchArgs } from '@modules/tracks/args/track-search.args';
import { TracksGateway } from '@modules/tracks/tracks.gateway';
import { AzuracastNowPlaying } from '@modules/tracks/types/azuracast-nowplaying';
import {
  AzuracastRequestResponse,
  AzuracastRequests,
} from '@modules/tracks/types/azuracast-requests';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { GatewayTrack } from '@modules/tracks/types/gateway';
import { HistoryItem } from '@modules/tracks/types/history';
import { TrackRequestResponse } from '@modules/tracks/types/track-request-response';
import { TrackSearchResponse } from '@modules/tracks/types/track-search-response';
import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got, { Got } from 'got';
import { DateTime } from 'luxon';

@Injectable()
export class TracksService {
  private readonly azuracastClient: Got;

  private currentPlaying?: CurrentPlaying;

  private tracksHistory: HistoryItem[] = [];

  constructor(
    @Inject(forwardRef(() => TracksGateway))
    private readonly tracksGateway: TracksGateway,
  ) {
    this.azuracastClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.AZURACAST_URL}/api/`,
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
    const response = await this.azuracastClient(`station/${process.env.AZURACAST_STATION_ID}/requests`, {
      searchParams: {
        current: trackSearchArgs.page,
        rowCount: trackSearchArgs.count,
        searchPhrase: trackSearchArgs.q,
      },
    }).json<AzuracastRequests>();
    if (!response) {
      return {
        page: 1,
        count: 0,
        total: 0,
        items: [],
      };
    }

    return {
      page: response.current,
      count: response.rowCount,
      total: response.total,
      items: response.rows.map((track) => ({
        requestId: track.request_id,
        track: {
          id: track.song_id,
          title: track.song_title,
          artist: track.song_artist,
          album: track.song_album,
          art: track.song_art,
          lyrics: track.song_lyrics,
          text: track.song_text,
        },
      })),
    };
  }

  async requestTrack(args: TrackRequestArgs, ip?: string): Promise<TrackRequestResponse> {
    try {
      const headers = {};
      if (ip) {
        headers['X-Forwarded-For'] = ip;
      }
      const response = await this.azuracastClient(
        `station/${process.env.AZURACAST_STATION_ID}/request/${args.songId}`,
        { headers },
      ).json<AzuracastRequestResponse>();

      return {
        success: response.success,
        message: response.message,
      };
    } catch (e) {
      return {
        success: e.response.body.success,
        message: e.response.body.message,
      };
    }
  }

  @Interval(5000)
  private async updateCurrentPlaying() {
    const currentPlaying: CurrentPlaying = new CurrentPlaying();

    try {
      const response: AzuracastNowPlaying | null = await this.azuracastClient(
        `nowplaying/${process.env.AZURACAST_STATION_ID}`,
      ).json();

      if (!response) return;

      let id: string = response.now_playing?.song.id || '';
      let title: string = response.now_playing?.song.title || '';
      let artist: string = response.now_playing?.song.artist || '';
      let name: string = response.now_playing?.song.text || '';
      let duration: number = response.now_playing?.duration || 0;
      let startsAt: number = (response.now_playing?.played_at || 0) * 1000 || Date.now();
      let endsAt: number = startsAt + duration * 1000;
      let art: string = response.now_playing?.song.art || '';

      if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
        art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
      }

      currentPlaying.current = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      id = response.playing_next?.song.id || '';
      title = response.playing_next?.song.title || '';
      artist = response.playing_next?.song.artist || '';
      name = response.playing_next?.song.text || '';
      duration = response.playing_next?.duration || 0;
      startsAt = (response.playing_next?.cued_at || 0) * 1000 || Date.now();
      endsAt = startsAt + duration * 1000;
      art = response.playing_next?.song.art || '';

      if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
        art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
      }

      currentPlaying.next = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      id = response.song_history[0].song.id || '';
      title = response.song_history[0].song.title || '';
      artist = response.song_history[0].song.artist || '';
      name = response.song_history[0].song.text || '';
      duration = response.song_history[0].duration || 0;
      startsAt = (response.song_history[0].played_at || 0) * 1000 || Date.now();
      endsAt = startsAt + duration * 1000;
      art = response.song_history[0].song.art || '';

      if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
        art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
      }

      currentPlaying.previous = {
        id, title, artist, name, duration, startsAt, endsAt, art,
      };

      currentPlaying.live = {
        isLive: response.live?.is_live || false,
        streamerName: response.live?.streamer_name || '',
        broadcastStart: response.live?.broadcast_start || 0,
      };

      currentPlaying.timestamp = Date.now();

      currentPlaying.listenersCount = response.listeners?.unique || 0;

      if (this.currentPlaying?.current.id !== currentPlaying.current.id) {
        this.currentPlaying = currentPlaying;
        this.tracksGateway.sendCurrentTrack();
      } else {
        this.currentPlaying = currentPlaying;
      }

      this.tracksHistory = response.song_history.map((item) => ({
        id: item.sh_id,
        playedAt: item.played_at,
        duration: item.duration,
        playlist: item.playlist,
        streamer: item.streamer,
        isRequest: item.is_request,
        track: {
          id: item.song.id,
          text: item.song.text,
          artist: item.song.title,
          title: item.song.title,
          album: item.song.album,
          lyrics: item.song.lyrics,
          art: (item.song.art || '').replace(
            process.env.AZURACAST_PUBLIC_URL || '',
            process.env.AZURACAST_REAL_PUBLIC_URL || '',
          ),
        },
      }));
    } catch (e) {
      throw new InternalServerErrorException(e);
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
