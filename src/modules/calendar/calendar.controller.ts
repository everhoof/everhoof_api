import {
  Controller,
  Get,
  UseFilters,
} from '@nestjs/common';

import { GraphqlExceptionFilter } from '~/common/filters/graphql-exception.filter';
import { CalendarService } from '~/modules/calendar/calendar.service';
import { CalendarEventDto } from '~/modules/calendar/types/calendar-event.dto';

@UseFilters(GraphqlExceptionFilter)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/nogard')
  async getNogardEvents(): Promise<CalendarEventDto[]> {
    return this.calendarService.getNextCalendarEvents();
  }
}
