import { BadRequestException } from '@nestjs/common';
import { readdir, stat } from 'fs/promises';
import { RecordingCalendarEventDto } from '@modules/calendar/types/calendar-event';
import { CalendarService } from '@modules/calendar/calendar.service';
import { Recording } from '../entities/recordings.entity';
import { RecordingsService } from '../recordings.service';
import { DateTime } from 'luxon';
import { RecordEvent } from './record-event';
import { spawn } from 'child_process';

export class RadioRecordProcessing {
  readonly azuraPath: string = 'Y:\\mnt\\radioStorage\\AzuraRecordings\\Everhoof';
  readonly outputPath: string = 'E:\\temp';

  private calendarService: CalendarService;
  private recordingsService: RecordingsService;

  private azuraRecordings: string[] = [];
  private calendarEvents: RecordingCalendarEventDto[] = [];
  private uploadedRecords: Recording[] = [];
  private recordEvents: RecordEvent[] = [];
  private recordEventsBroken: RecordEvent[] = [];
  private recordEventsQueue: RecordEvent[] = [];

  constructor(calendarService: CalendarService, recordingsService: RecordingsService) {
    this.calendarService = calendarService;
    this.recordingsService = recordingsService;
  }

  public async getNewRecordings(): Promise<RecordEvent[]> {
    if (this.recordEvents.length === 0) {
      await this.reloadAll();
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
    if (!process.env.FFMPEG_PATH) throw new BadRequestException('ffmpeg path not found');

    const a = this.calendarEvents.find((e) => e.date === entry.date);
    if (!a) throw new BadRequestException('File not found in internal list');

    const upl = this.uploadedRecords.find((e) => e.date === entry.date);
    if (upl) throw new BadRequestException('File already uploaded');

    const queue = this.recordEventsQueue.find((e) => e.date === entry.date);
    if (queue) throw new BadRequestException('File already in queue');

    if (this.recordEventsQueue.length > 0) throw new BadRequestException('Processing queue is full, please wait');

    const ffmpeg = spawn(process.env.FFMPEG_PATH, [
      `-hide_banner`,
      `-loglevel`,
      `quiet`,
      `-threads`,
      `1`,
      `-i`,
      `${entry.fileName}`,
      `-threads`,
      `1`,
      `-vn`,
      `-acodec`,
      `libvorbis`,
      `-qscale:a`,
      `6.2`,
      `-y`,
      `${this.outputPath}/${entry.date}.ogg`,
    ]);

    this.recordEventsQueue.push(entry);

    ffmpeg.on('close', async (code) => {
      if (code == 0) {
        const fstat = await stat(`${this.outputPath}/${entry.date}.ogg`);

        const newRec = this.recordingsService.recordingsRepository.create({
          date: entry.date,
          descriptionShort: entry.eventDescriptionShort,
          descriptionFull: '',
          filename: `${entry.date}.ogg`,
          preview: entry.preview,
          filesize: Math.round(fstat.size / 1024 / 1024),
          hide: false,
        });

        await this.recordingsService.recordingsRepository.addRecording(newRec);
        this.uploadedRecords.push(newRec);
      } else {
        console.error(`ffmpeg exited with code ${code}`);
      }
      this.recordEventsQueue.splice(this.recordEventsQueue.indexOf(entry));
    });
  }

  public async reloadAll(): Promise<void> {
    await Promise.all([this.loadCalendarEvents(), this.loadUploadedRecordings(), this.loadAzuraRecordings()]);
    this.findEventForRecording();
  }

  findEventForRecording(): void {
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
          const a = this.recordEvents.find((e) => e.date === calEntry.date);
          const b = this.recordEventsBroken.find((e) => e.date === calEntry.date);

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

  async loadAzuraRecordings(): Promise<void> {
    this.azuraRecordings = [];

    const dirs = await readdir(this.azuraPath, { withFileTypes: true });

    for (let i = 0; i < dirs.length; i++) {
      if (!dirs[i].isDirectory()) continue;

      const dirs2 = await readdir(`${this.azuraPath}/${dirs[i].name}`, { withFileTypes: true });
      dirs2.forEach((file) => {
        if (file.isFile()) this.azuraRecordings.push(`${this.azuraPath}/${dirs[i].name}/${file.name}`);
      });
    }
  }

  async loadCalendarEvents(): Promise<void> {
    this.calendarEvents = await this.calendarService.getRecordingCalendarEvents();
  }

  async loadUploadedRecordings(): Promise<void> {
    this.uploadedRecords = await this.recordingsService.recordingsRepository.getRecordings();
  }
}
