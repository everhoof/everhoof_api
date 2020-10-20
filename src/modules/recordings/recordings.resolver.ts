import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { Recording } from '@modules/recordings/types/recording';

@UseFilters(HttpExceptionFilter)
@Resolver('Recordings')
export class RecordingsResolver {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Query(() => [Recording])
  getRecordings(): Promise<Recording[]> {
    return this.recordingsService.getRecordings();
  }
}
