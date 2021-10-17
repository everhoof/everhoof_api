import { Module } from '@nestjs/common';

import { CalendarController } from '~/modules/calendar/calendar.controller';
import { CalendarResolver } from '~/modules/calendar/calendar.resolver';
import { CalendarService } from '~/modules/calendar/calendar.service';

@Module({
  providers: [CalendarService, CalendarResolver],
  controllers: [CalendarController],
})
export class CalendarModule {}
