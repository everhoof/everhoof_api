import { CalendarController } from '@modules/calendar/calendar.controller';
import { CalendarResolver } from '@modules/calendar/calendar.resolver';
import { CalendarService } from '@modules/calendar/calendar.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CalendarService, CalendarResolver],
  controllers: [CalendarController],
})
export class CalendarModule {}
