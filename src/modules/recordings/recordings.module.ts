import { Module } from '@nestjs/common';

import { RecordingsResolver } from '~/modules/recordings/recordings.resolver';
import { RecordingsService } from '~/modules/recordings/recordings.service';

@Module({
  providers: [RecordingsService, RecordingsResolver],
})
export class RecordingsModule {}
