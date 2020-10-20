import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEvent } from '@modules/calendar/types/calendar-event';

@UseFilters(HttpExceptionFilter)
@Resolver('Calendar')
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [CalendarEvent])
  getCalendarEvents(): Promise<CalendarEvent[]> {
    return this.calendarService.getCalendarEvents();
  }
}
