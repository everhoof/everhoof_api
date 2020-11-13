import { Injectable } from '@nestjs/common';
import got, { Got } from 'got';
import { Interval } from '@nestjs/schedule';
import { Station } from '@modules/station/types/station';
import { AzuracastStation } from '@modules/station/types/azuracast-station';

@Injectable()
export class StationService {
  private readonly azuracastClient: Got;
  private station: Station;

  constructor() {
    this.azuracastClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.AZURACAST_URL}/api/`,
    });
  }

  async getStation(): Promise<Station> {
    if (!this.station) await this.updateStation();
    return this.station;
  }

  @Interval(60000)
  private async updateStation() {
    try {
      const response: AzuracastStation | null = await this.azuracastClient(
        `station/${process.env.AZURACAST_STATION_ID}`,
      ).json();

      this.station = {
        id: response?.id || 0,
        name: response?.name || '',
        shortcode: response?.shortcode || '',
        description: response?.description || '',
        frontend: response?.frontend || '',
        backend: response?.backend || '',
        listenUrl: response?.listen_url || '',
        public: response?.is_public || true,
        playlists: {
          m3u: `https://everhoof.ru/m3u`,
          pls: `https://everhoof.ru/pls`,
        },
        mounts: (response?.mounts || []).map((mount) => ({
          id: mount.id,
          default: mount.is_default,
          path: mount.path,
          name: mount.name,
          url: mount.url,
          bitrate: mount.bitrate,
          format: mount.format,
          listeners: {
            current: mount.listeners.current,
            unique: mount.listeners.unique,
            total: mount.listeners.total,
          },
        })),
      };
    } catch (e) {
      console.error(e);
      return;
    }
  }
}
