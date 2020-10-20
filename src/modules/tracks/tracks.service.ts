import { Injectable } from '@nestjs/common';
import got, { Got } from 'got';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { Interval } from '@nestjs/schedule';
import { AzuracastNowPlaying } from '@modules/tracks/types/azuracast-nowplaying';

@Injectable()
export class TracksService {
  private readonly azuracastClient: Got;
  private currentPlaying?: CurrentPlaying;

  constructor() {
    this.azuracastClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.AZURACAST_URL}/api/`,
    });
  }

  async getCurrentPlaying(): Promise<CurrentPlaying | undefined> {
    if (!this.currentPlaying) await this.updateCurrentPlaying();
    return this.currentPlaying;
  }

  @Interval(5000)
  private async updateCurrentPlaying() {
    const currentPlaying: CurrentPlaying = new CurrentPlaying();

    try {
      const response: AzuracastNowPlaying | null = await this.azuracastClient(
        `nowplaying/${process.env.AZURACAST_STATION_ID}`,
      ).json();

      let id: string = response?.now_playing?.song.id || '';
      let title: string = response?.now_playing?.song.title || '';
      let artist: string = response?.now_playing?.song.artist || '';
      let name: string = response?.now_playing?.song.text || '';
      let duration: number = response?.now_playing?.duration || 0;
      let startsAt: number = (response?.now_playing?.played_at || 0) * 1000 || Date.now();
      let endsAt: number = startsAt + duration * 1000;
      let art: string = response?.now_playing?.song.art || '';

      currentPlaying.current = { id, title, artist, name, duration, startsAt, endsAt, art };

      id = response?.playing_next?.song.id || '';
      title = response?.playing_next?.song.title || '';
      artist = response?.playing_next?.song.artist || '';
      name = response?.playing_next?.song.text || '';
      duration = response?.playing_next?.duration || 0;
      startsAt = (response?.playing_next?.cued_at || 0) * 1000 || Date.now();
      endsAt = startsAt + duration * 1000;
      art = response?.playing_next?.song.art || '';

      currentPlaying.next = { id, title, artist, name, duration, startsAt, endsAt, art };

      id = response?.song_history[0].song.id || '';
      title = response?.song_history[0].song.title || '';
      artist = response?.song_history[0].song.artist || '';
      name = response?.song_history[0].song.text || '';
      duration = response?.song_history[0].duration || 0;
      startsAt = (response?.song_history[0].played_at || 0) * 1000 || Date.now();
      endsAt = startsAt + duration * 1000;
      art = response?.song_history[0].song.art || '';

      currentPlaying.previous = { id, title, artist, name, duration, startsAt, endsAt, art };

      currentPlaying.live = {
        isLive: response?.live?.is_live || false,
        streamerName: response?.live?.streamer_name || '',
        broadcastStart: response?.live?.broadcast_start || 0,
      };

      currentPlaying.timestamp = Date.now();

      currentPlaying.listenersCount = response?.listeners?.unique || 0;
      this.currentPlaying = currentPlaying;
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
