import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import Calendar = calendar_v3.Calendar;
import { DateTime } from 'luxon';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  CalendarEvent,
  CalendarEventDto,
  CalendarEventParams,
  RecordingCalendarEventDto,
} from '@modules/calendar/types/calendar-event';

@Injectable()
export class CalendarService {
  private readonly calendar: Calendar;
  private calendarEvents: CalendarEvent[] = [];

  constructor() {
    this.calendar = google.calendar({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY,
    });
    this.updateCalendarEvents().catch(console.error);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateCalendarEvents(): Promise<CalendarEvent | undefined> {
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
            startsAt: startsAt,
            endsAt: endsAt,
            ...params,
          });
        }
        return acc;
      }, []);
    } catch (e) {
      console.error(e);
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
      const pair = param.slice(1, -1).split('=');
      params[pair[0]] = pair[1];

      switch (pair[0]) {
        case 'notify':
        case 'recording':
          params[pair[0]] = pair[1] === 'true';
          break;
        default:
          params[pair[0]] = pair[1];
          break;
      }
    });

    return params;
  }
}
