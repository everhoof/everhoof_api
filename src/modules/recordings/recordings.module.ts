import { Module } from '@nestjs/common';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { RecordingsResolver } from '@modules/recordings/recordings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from '@modules/calendar/calendar.service';
import { RecordingsRepository } from './repositories/recordings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecordingsRepository])],
  providers: [RecordingsService, RecordingsResolver, CalendarService],
})
export class RecordingsModule {}
