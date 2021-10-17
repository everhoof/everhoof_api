import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CalendarService } from '~/modules/calendar/calendar.service';
import { RecordingsResolver } from '~/modules/recordings/recordings.resolver';
import { RecordingsService } from '~/modules/recordings/services/recordings.service';

import { RecordingsRepository } from './repositories/recordings.repository';
import { RecordingProcessingService } from './services/recording-processing.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecordingsRepository])],
  providers: [RecordingsService, RecordingsResolver, CalendarService, RecordingProcessingService],
})
export class RecordingsModule {}
