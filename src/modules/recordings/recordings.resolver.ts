import { UseFilters } from '@nestjs/common';
import {
  Query,
  Resolver,
} from '@nestjs/graphql';

import { GraphqlExceptionFilter } from '~/common/filters/graphql-exception.filter';
import { RecordingsService } from '~/modules/recordings/recordings.service';
import { Recording } from '~/modules/recordings/types/recording';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Recordings')
export class RecordingsResolver {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Query(() => [Recording])
  getRecordings(): Promise<Recording[]> {
    return this.recordingsService.getRecordings();
  }
}
