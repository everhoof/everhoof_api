import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { RecordingFile } from '@modules/recordings/types/recording';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Recordings')
export class RecordingsResolver {
  constructor(private readonly recordingsService: RecordingsService) { }

  @Query(() => [RecordingFile])
  getRecordings(): Promise<RecordingFile[]> {
    return this.recordingsService.getRecordings();
  }

  /*  @Query(() => Boolean)
    loadRecordingsFromLocalJson(): Promise<boolean> {
      return this.recordingsService.loadRecordingsFromLocalJson();
    }*/
}
