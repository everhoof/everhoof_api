import { Injectable } from '@nestjs/common';
import {
  Cron,
  CronExpression,
} from '@nestjs/schedule';
import got, { Got } from 'got';
import { DateTime } from 'luxon';

import {
  CalendarEvent,
} from '~/modules/calendar/types/calendar-event';
import { CalendarEventDto } from '~/modules/calendar/types/calendar-event.dto';
import { LiveEventResponse } from '~/modules/calendar/types/live-event';

@Injectable()
export class CalendarService {
  private readonly rbaClient: Got;

  private calendarEvents: CalendarEvent[] = [];

  constructor() {
    this.rbaClient = got.extend({
      responseType: 'json',
      prefixUrl: `${process.env.RBA_API_BASE_URL}`,
    });
    this.updateCalendarEvents()
      .catch((error) => {
        console.log(error);
      });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async updateCalendarEvents(): Promise<void> {
    const date = new Date();
    date.setDate(date.getDate() - 10 * 365);

    try {
      const from = DateTime.now().minus({ day: 1 }).toISO();
      const events = await this.rbaClient.get('LiveEvent/public', {
        searchParams: {
          after: from,
          limit: 20,
          page: 1,
        },
      }).json<LiveEventResponse>();

      this.calendarEvents = events.value?.items.reduce<CalendarEvent[]>((accumulator, event) => {
        if (event.description && event.beginsAt) {
          const startsAt = DateTime.fromISO(event.beginsAt).toMillis();
          const endsAt = DateTime.fromISO(event.estimatedEnd).toMillis();

          accumulator.push({
            summary: event.description,
            startsAt,
            endsAt,
            notify: true,
            recording: true,
            preview: '',
          });
        }
        return accumulator;
      }, []);
    } catch (error) {
      console.log(error);
    }
  }

  async getCalendarEvents(): Promise<CalendarEvent[]> {
    return this.calendarEvents;
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
}
