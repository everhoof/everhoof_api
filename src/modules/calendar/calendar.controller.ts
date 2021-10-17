import { GraphqlExceptionFilter } from '@common/filters/graphql-exception.filter';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEventDto } from '@modules/calendar/types/calendar-event.dto';
import { RecordingCalendarEventDto } from '@modules/calendar/types/recording-calendar-event.dto';
import {
  Controller,
  Get,
  UseFilters,
} from '@nestjs/common';

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
