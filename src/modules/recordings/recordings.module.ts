import { Module } from '@nestjs/common';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { RecordingsResolver } from '@modules/recordings/recordings.resolver';

@Module({
  providers: [RecordingsService, RecordingsResolver],
})
export class RecordingsModule {}
