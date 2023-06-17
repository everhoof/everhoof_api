import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import got, { Got } from 'got';

import { MountsResponse } from '~/modules/station/types/mounts.response';
import { Station } from '~/modules/station/types/station';

@Injectable()
export class StationService {
  private readonly rbaClient: Got;

  private station: Station;

  constructor() {
    this.rbaClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.RBA_API_BASE_URL}`,
    });
  }

  async getStation(): Promise<Station> {
    if (!this.station) await this.updateStation();
    return this.station;
  }

  @Interval(60000)
  private async updateStation() {
    try {
      const mounts: MountsResponse = await this.rbaClient.get('PublicInfo/mounts').json();

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
        mounts: mounts.value
          .sort((a, b) => {
            if (a.bitrate < b.bitrate) {
              return 1;
            }

            if (a.bitrate > b.bitrate) {
              return -1;
            }

            return 0;
          })
          .map((mount, index) => ({
            id: index + 1,
            default: index === 0,
            path: mount.path,
            name: `${mount.bitrate}KBit/s ${mount.format}`,
            url: mount.path.replace(/(:\d+)/, ''),
            bitrate: mount.bitrate,
            format: mount.format,
            listeners: {
              current: 0,
              unique: 0,
              total: 0,
            },
          })),
      };
    } catch (error) {
      console.log('Error while updating station:');
      console.log(error);
    }
  }
}
