import {
  CalendarEvent,
  CalendarEventParams,
} from '@modules/calendar/types/calendar-event';
import { CalendarEventDto } from '@modules/calendar/types/calendar-event.dto';
import { RecordingCalendarEventDto } from '@modules/calendar/types/recording-calendar-event.dto';
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';
import {
  calendar_v3,
  google,
} from 'googleapis';
import { DateTime } from 'luxon';

import Calendar = calendar_v3.Calendar;

@Injectable()
export class CalendarService {
  private readonly calendar: Calendar;

  private calendarEvents: CalendarEvent[] = [];

  constructor() {
    this.calendar = google.calendar({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY,
    });
    this.updateCalendarEvents()
      .catch((e) => {
        throw new InternalServerErrorException(e);
      });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateCalendarEvents(): Promise<CalendarEvent | undefined> {
    if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_CALENDAR_ID) return;

    const date = new Date();
    date.setDate(date.getDate() - 10 * 365);

    try {
      const events = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        singleEvents: true,
        orderBy: 'startTime',
        timeMin: date.toISOString(),
      });

      if (!events.data.items) return;
      this.calendarEvents = events.data.items.reduce<CalendarEvent[]>((acc, event) => {
        if (event.summary && event.start?.dateTime && event.end?.dateTime) {
          const startsAt = DateTime.fromISO(event.start?.dateTime).toMillis();
          const endsAt = DateTime.fromISO(event.end?.dateTime).toMillis();
          const params = CalendarService.parseParams(event);
          acc.push({
            summary: event.summary,
            startsAt,
            endsAt,
            ...params,
          });
        }
        return acc;
      }, []);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getCalendarEvents(): Promise<CalendarEvent[]> {
    return this.calendarEvents;
  }

  async getRecordingCalendarEvents(): Promise<RecordingCalendarEventDto[]> {
    return this.calendarEvents
      .filter((event) => event.recording && event.endsAt <= Date.now())
      .map((event) => ({
        name: event.summary,
        date: DateTime.fromMillis(event.startsAt).toFormat('yyyy-MM-dd'),
        preview: event.preview,
      }));
  }

  async getNextCalendarEvents(): Promise<CalendarEventDto[]> {
    return this.calendarEvents
      .filter((event) => event.startsAt >= Date.now() - 1000 * 60 * 60 * 24)
      .map((event) => ({
        summary: event.summary,
        starts_at: DateTime.fromMillis(event.startsAt).toISO(),
        ends_at: DateTime.fromMillis(event.endsAt).toISO(),
        preview: event.preview,
      }));
  }

  private static parseParams(event: calendar_v3.Schema$Event): CalendarEventParams {
    const params: CalendarEventParams = {
      notify: true,
      recording: true,
      preview: '',
    };
    const match = event.description?.match(/\[(.*?)=(.*?)]/gm);
    if (!match) return params;

    match.forEach((param) => {
      const [key, value] = param.slice(1, -1).split('=');
      params[key] = value;

      switch (key) {
        case 'notify':
        case 'recording':
          params[key] = value === 'true';
          break;
        default:
          params[key] = value;
          break;
      }
    });

    return params;
  }
}
