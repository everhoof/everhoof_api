import { Module } from '@nestjs/common';
import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarResolver } from '@modules/calendar/calendar.resolver';
import { CalendarController } from '@modules/calendar/calendar.controller';

@Module({
  providers: [CalendarService, CalendarResolver],
  controllers: [CalendarController],
})
export class CalendarModule {}
