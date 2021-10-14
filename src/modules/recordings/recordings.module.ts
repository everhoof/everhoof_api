import { Module } from '@nestjs/common';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { RecordingsResolver } from '@modules/recordings/recordings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recording } from './entities/recordings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recording])
  ],
  providers: [RecordingsService, RecordingsResolver],
})
export class RecordingsModule { }
