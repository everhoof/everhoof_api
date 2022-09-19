import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got, { Got } from 'got';

import { CurrentListenersResponse } from '~/modules/station/types/current-listeners.response';
import {
  MountsResponseItem,
  StreamFormat,
} from '~/modules/station/types/mounts.response';
import { Station } from '~/modules/station/types/station';

@Injectable()
export class StationService {
  private readonly rbaClient: Got;

  private station: Station;

  constructor() {
    this.rbaClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.RBA_API_BASE_URL}`,
      headers: {
        CoreApiKey: `${process.env.RBA_API_KEY}`,
      },
    });
  }

  async getStation(): Promise<Station> {
    if (!this.station) await this.updateStation();
    return this.station;
  }

  getReadableMountFormat(format: StreamFormat): string {
    switch (format) {
      case StreamFormat.mp3:
        return 'mp3';
      case StreamFormat.oggVorbis:
        return 'ogg';
      case StreamFormat.oggOpus:
        return 'opus';
      case StreamFormat.aac:
        return 'aac';
      case StreamFormat.flac:
        return 'flac';
      default:
        return 'unknown';
    }
  }

  @Interval(60000)
  private async updateStation() {
    try {
      const listeners: CurrentListenersResponse = await this.rbaClient.get('Statistics/currentListeners', {
        searchParams: {
          listenerInfo: false,
        },
      }).json();
      const mounts: MountsResponseItem[] = await this.rbaClient.get('Mount').json();

      this.station = {
        id: 1,
        name: 'Everhoof Radio',
        shortcode: 'radio',
        description: 'Интернет-радиостанция',
        frontend: 'icecast',
        backend: 'liquidsoap',
        listenUrl: `${process.env.PUBLIC_URL}320`,
        public: true,
        playlists: {
          m3u: `${process.env.PUBLIC_URL}m3u`,
          pls: `${process.env.PUBLIC_URL}pls`,
        },
        mounts: mounts
          .sort((a, b) => {
            if (a.bitrate < b.bitrate) {
              return 1;
            }

            if (a.bitrate > b.bitrate) {
              return -1;
            }

            return 0;
          })
          .filter((mount) => /^\d+$/.test(mount.name))
          .map((mount, index) => {
            const listenersMount = listeners.mounts.find((m) => m.name.replace('/', '') === mount.name);
            const format = this.getReadableMountFormat(mount.format);

            return {
              id: index + 1,
              default: index === 0,
              path: `/${mount.name}`,
              name: `${mount.bitrate}KBit/s ${format.toUpperCase()}`,
              url: `${process.env.PUBLIC_URL}${mount.name}`,
              bitrate: mount.bitrate,
              format,
              listeners: {
                current: listenersMount?.totalListeners ?? 0,
                unique: listenersMount?.totalListeners ?? 0,
                total: listenersMount?.totalListeners ?? 0,
              },
            };
          }),
      };
    } catch (error) {
      console.log('Error while updating station:');
      console.log(error);
    }
  }
}
