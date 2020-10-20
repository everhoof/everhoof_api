import { Module } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarResolver } from '@modules/calendar/calendar.resolver';

@Module({
  providers: [CalendarService, CalendarResolver],
})
export class CalendarModule {}
