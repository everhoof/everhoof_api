import { Controller, Get, UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEventDto, RecordingCalendarEventDto } from '@modules/calendar/types/calendar-event';

@UseFilters(GraphqlExceptionFilter)
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('/recordings')
  async getRecordingEvents(): Promise<RecordingCalendarEventDto[]> {
    return this.calendarService.getRecordingCalendarEvents();
  }

  @Get('/nogard')
  async getNogardEvents(): Promise<CalendarEventDto[]> {
    return this.calendarService.getNextCalendarEvents();
  }
}
