import { Injectable } from '@nestjs/common';
import { calendar_v3, google } from 'googleapis';
import Calendar = calendar_v3.Calendar;
import { DateTime } from 'luxon';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CalendarEvent } from '@modules/calendar/types/calendar-event';

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

  @Cron(CronExpression.EVERY_10_MINUTES)
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
          acc.push({
            summary: event.summary,
            startsAt: startsAt,
            endsAt: endsAt,
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
}
