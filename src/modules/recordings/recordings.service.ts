import { Injectable } from '@nestjs/common';
import got from 'got';
import { Recording } from '@modules/recordings/types/recording';

@Injectable()
export class RecordingsService {
  private recordings: Recording[] = [];

  async getRecordings(): Promise<Recording[]> {
    await this.updateRecordings();
    return this.recordings;
  }

  private async updateRecordings() {
    try {
      const recordings = await got(`${process.env.RECORDINGS_URL}`).json<Recording[]>();
      this.recordings = recordings.reverse();
    } catch (e) {
      console.error(e);
    }
  }
}
