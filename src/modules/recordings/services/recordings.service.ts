import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RecordingFile } from '~/modules/recordings/types/recording';

import { RecordingsRepository } from '../repositories/recordings.repository';

@Injectable()
export class RecordingsService {
  constructor(
    @InjectRepository(RecordingsRepository)
    public readonly recordingsRepository: RecordingsRepository,
  ) {}

  async getRecordings(): Promise<RecordingFile[]> {
    const recordings = await this.recordingsRepository.getPublicRecordings();

    return recordings.map<RecordingFile>((rec) => ({
      desc: rec.descriptionShort,
      img: rec.preview,
      name: rec.filename,
      size: rec.filesize,
      year: rec.date.slice(0, 4),
    }));
  }
}
