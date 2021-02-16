import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import Calendar = calendar_v3.Calendar;
import { DateTime } from 'luxon';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CalendarEvent, CalendarEventParams } from '@modules/calendar/types/calendar-event';

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
    date.setDate(date.getDate() - 1);

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

  private static parseParams(event: calendar_v3.Schema$Event): CalendarEventParams {
    const params: CalendarEventParams = {
      notify: true,
    };
    const match = event.description?.match(/\[(.*)=(.*)]/gm);
    if (!match) return params;

    match.forEach((param) => {
      const pair = param.slice(1, -1).split('=');
      params[pair[0]] = pair[1];

      if (pair[0] === 'notify') {
        params.notify = pair[1] === 'true';
      }
    });

    return params;
  }
}
