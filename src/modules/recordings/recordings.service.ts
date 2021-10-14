import { Injectable } from '@nestjs/common';
import got from 'got';
import { RecordingFile } from '@modules/recordings/types/recording';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarService } from '@modules/calendar/calendar.service';
import { RadioRecordProcessing } from './utils/radio-record-processing';
import { RecordingsRepository } from './repositories/recordings.repository';
import { RecordEvent } from './utils/record-event';

@Injectable()
export class RecordingsService {
  readonly rrp: RadioRecordProcessing;

  constructor(
    @InjectRepository(RecordingsRepository)
    public readonly recordingsRepository: RecordingsRepository,
    private readonly calendarService: CalendarService,
  ) {
    this.rrp = new RadioRecordProcessing(calendarService, this);
  }

  async getPendingRecordings(): Promise<RecordEvent[]> {
    return this.rrp.getNewRecordings();
  }

  async reloadAllRecordings(): Promise<void> {
    return this.rrp.reloadAll();
  }

  async getBrokenRecordings(): Promise<RecordEvent[]> {
    return this.rrp.getBrokenRecordings();
  }

  async getQueue(): Promise<RecordEvent[]> {
    return this.rrp.getQueue();
  }

  async processRecording(recordEvent: RecordEvent): Promise<void> {
    return this.rrp.processRecording(recordEvent);
  }

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

  async loadRecordingsFromLocalJson(): Promise<boolean> {
    const recordingsRaw = await got(`${process.env.RECORDINGS_URL}`).json<RecordingFile[]>();

    const recordings = recordingsRaw.map((rec) => {
      const parsedDate = new Date(rec.name.replace('_LF', '').slice(0, -4)).toString();

      return this.recordingsRepository.create({
        hide: false,
        date: parsedDate,
        descriptionFull: '',
        descriptionShort: rec.desc,
        filename: rec.name,
        filesize: rec.size,
        preview: rec.img,
      });
    });
    this.recordingsRepository.save(recordings);
    return true;
  }
}
