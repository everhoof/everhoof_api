import { Controller, Get, UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEventDto } from '@modules/calendar/types/calendar-event';
import { DateTime } from 'luxon';

@UseFilters(GraphqlExceptionFilter)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/nogard')
  async getEvents(): Promise<CalendarEventDto[]> {
    const events = await this.calendarService.getCalendarEvents();
    return events.reduce<CalendarEventDto[]>((acc, event) => {
      if (event.notify) {
        acc.push({
          summary: event.summary,
          starts_at: DateTime.fromMillis(event.startsAt).toISO(),
          ends_at: DateTime.fromMillis(event.endsAt).toISO(),
          preview: event.preview,
        });
      }
      return acc;
    }, []);
  }
}
