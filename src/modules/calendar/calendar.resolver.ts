import { GraphqlExceptionFilter } from '@common/filters/graphql-exception.filter';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEvent } from '@modules/calendar/types/calendar-event';
import { UseFilters } from '@nestjs/common';
import {
  Query,
  Resolver,
} from '@nestjs/graphql';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Calendar')
export class CalendarResolver {
  constructor(private readonly calendarService: CalendarService) {}

  @Query(() => [CalendarEvent])
  getCalendarEvents(): Promise<CalendarEvent[]> {
    return this.calendarService.getCalendarEvents();
  }
}
