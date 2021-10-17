import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { Recording } from '../entities/recordings.entity';

@EntityRepository(Recording)
export class RecordingsRepository extends Repository<Recording> {
  getPublicRecordings(): Promise<Recording[]> {
    return this.find({
      order: { date: 'DESC' },
      where: { hide: false },
    });
  }

  getRecordings(): Promise<Recording[]> {
    return this.find({
      order: { date: 'DESC' },
    });
  }

  async addRecording(recording: Recording): Promise<void> {
    await this.save(recording);
  }
}
