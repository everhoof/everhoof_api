import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { RecordingsService } from '@modules/recordings/recordings.service';
import { RecordingFile } from '@modules/recordings/types/recording';
import { RecordEvent } from './utils/record-event';
import { RecordEventArgs } from './args/record-event.args';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Recordings')
export class RecordingsResolver {
  constructor(private readonly recordingsService: RecordingsService) {}

  @Query(() => [RecordingFile])
  getRecordings(): Promise<RecordingFile[]> {
    return this.recordingsService.getRecordings();
  }

  @Query(() => Boolean)
  async reloadRecordings(): Promise<boolean> {
    await this.recordingsService.reloadAllRecordings();
    return true;
  }

  @Query(() => [RecordEvent])
  getPendingRecordings(): Promise<RecordEvent[]> {
    return this.recordingsService.getPendingRecordings();
  }

  @Query(() => [RecordEvent])
  getBrokenRecordings(): Promise<RecordEvent[]> {
    return this.recordingsService.getBrokenRecordings();
  }

  @Query(() => [RecordEvent])
  getQueue(): Promise<RecordEvent[]> {
    return this.recordingsService.getQueue();
  }

  @Mutation(() => Boolean)
  async processRecording(@Args() args: RecordEventArgs): Promise<boolean> {
    await this.recordingsService.processRecording(args);
    return true;
  }

  /*  @Query(() => Boolean)
    loadRecordingsFromLocalJson(): Promise<boolean> {
      return this.recordingsService.loadRecordingsFromLocalJson();
    }*/
}
