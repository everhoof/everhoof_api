import { spawn } from 'child_process';
import {
  readdir,
  stat,
} from 'fs/promises';

import { CalendarService } from '@modules/calendar/calendar.service';
import { RecordingCalendarEventDto } from '@modules/calendar/types/recording-calendar-event.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';

import { Recording } from '../entities/recordings.entity';
import { RecordingsRepository } from '../repositories/recordings.repository';
import { RecordEvent } from '../types/record-event';

@Injectable()
export class RecordingProcessingService {
  private azuraRecordings: string[] = [];

  private calendarEvents: RecordingCalendarEventDto[] = [];

  private uploadedRecords: Recording[] = [];

  private recordEvents: RecordEvent[] = [];

  private recordEventsBroken: RecordEvent[] = [];

  private recordEventsQueue: RecordEvent[] = [];

  constructor(
    @InjectRepository(RecordingsRepository)
    private readonly recordingsRepository: RecordingsRepository,
    private readonly calendarService: CalendarService,
  ) {}

  public async getPendingRecordings(): Promise<RecordEvent[]> {
    if (this.recordEvents.length === 0) {
      await this.reloadAllRecordings();
    }
    return this.recordEvents;
  }

  public getQueue(): RecordEvent[] {
    return this.recordEventsQueue;
  }

  public getBrokenRecordings(): RecordEvent[] {
    return this.recordEventsBroken;
  }

  public processRecording(entry: RecordEvent): void {
    if (!process.env.RECORD_PROCESSING_FFMPEG_PATH) throw new BadRequestException('ffmpeg path not found');
    if (!process.env.RECORD_PROCESSING_OUTPUT_PATH) throw new BadRequestException('Output path not found');

    const a = this.calendarEvents.find((event) => event.date === entry.date);
    if (!a) throw new BadRequestException('File not found in internal list');

    const upl = this.uploadedRecords.find((recording) => recording.date === entry.date);
    if (upl) throw new BadRequestException('File already uploaded');

    const queue = this.recordEventsQueue.find((event) => event.date === entry.date);
    if (queue) throw new BadRequestException('File already in queue');

    if (this.recordEventsQueue.length > 0) throw new BadRequestException('Processing queue is full, please wait');

    const ffmpeg = spawn(process.env.RECORD_PROCESSING_FFMPEG_PATH, [
      '-hide_banner',
      '-loglevel',
      'quiet',
      '-threads',
      '1',
      '-i',
      `${entry.fileName}`,
      '-threads',
      '1',
      '-vn',
      '-acodec',
      'libvorbis',
      '-qscale:a',
      '6.2',
      '-y',
      `${process.env.RECORD_PROCESSING_OUTPUT_PATH}/${entry.date}.ogg`,
    ]);

    this.recordEventsQueue.push(entry);

    ffmpeg.on('close', async (code) => {
      if (code === 0) {
        const fstat = await stat(`${process.env.RECORD_PROCESSING_OUTPUT_PATH}/${entry.date}.ogg`);

        const newRec = this.recordingsRepository.create({
          date: entry.date,
          descriptionShort: entry.eventDescriptionShort,
          descriptionFull: '',
          filename: `${entry.date}.ogg`,
          preview: entry.preview,
          filesize: Math.round(fstat.size / 1024 / 1024),
          hide: false,
        });

        await this.recordingsRepository.addRecording(newRec);
        this.uploadedRecords.push(newRec);
      } else {
        throw new InternalServerErrorException(`ffmpeg exited with code ${code}`);
      }
      this.recordEventsQueue.splice(this.recordEventsQueue.indexOf(entry));
    });
  }

  public async reloadAllRecordings(): Promise<void> {
    await Promise.all([this.loadCalendarEvents(), this.loadUploadedRecordings(), this.loadAzuraRecordings()]);
    this.findEventForRecording();
  }

  private findEventForRecording(): void {
    this.recordEvents = [];
    this.recordEventsBroken = [];

    for (let i = 0; i < this.azuraRecordings.length; i++) {
      const file = this.azuraRecordings[i];
      for (let j = 0; j < this.calendarEvents.length; j++) {
        const calEntry = this.calendarEvents[j];

        const dateRaw = file.slice(file.lastIndexOf('/') + 1).slice(0, 8);
        const date = DateTime.fromFormat(dateRaw, 'yyyyMMdd').toFormat('yyyy-MM-dd');

        let cancel = false;
        for (let n = 0; n < this.uploadedRecords.length; n++) {
          if (this.uploadedRecords[n].date === date) cancel = true;
        }

        if (cancel) continue;

        if (calEntry.date === date) {
          const a = this.recordEvents.find((event) => event.date === calEntry.date);
          const b = this.recordEventsBroken.find((event) => event.date === calEntry.date);

          if (!a && !b) {
            this.recordEvents.push(new RecordEvent(file, calEntry));
          } else {
            if (a) {
              this.recordEventsBroken.push(a);
              this.recordEvents.splice(this.recordEvents.indexOf(a), 1);
            }
            this.recordEventsBroken.push(new RecordEvent(file, calEntry));
          }
        }
      }
    }
  }

  private async loadAzuraRecordings(): Promise<void> {
    if (!process.env.RECORD_PROCESSING_AZURA_PATH) return;
    this.azuraRecordings = [];

    const directories = await readdir(process.env.RECORD_PROCESSING_AZURA_PATH, { withFileTypes: true });

    for (let i = 0; i < directories.length; i++) {
      if (!directories[i].isDirectory()) continue;

      const files = await readdir(`${process.env.RECORD_PROCESSING_AZURA_PATH}/${directories[i].name}`, {
        withFileTypes: true,
      });
      files.forEach((file) => {
        if (file.isFile()) this.azuraRecordings.push(`${process.env.RECORD_PROCESSING_AZURA_PATH}/${directories[i].name}/${file.name}`);
      });
    }
  }

  private async loadCalendarEvents(): Promise<void> {
    this.calendarEvents = await this.calendarService.getRecordingCalendarEvents();
  }

  private async loadUploadedRecordings(): Promise<void> {
    this.uploadedRecords = await this.recordingsRepository.getRecordings();
  }
}
