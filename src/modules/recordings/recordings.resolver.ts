import { UseFilters } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { GraphqlExceptionFilter } from '~/common/filters/graphql-exception.filter';
import { RecordingsService } from '~/modules/recordings/services/recordings.service';
import { RecordingFile } from '~/modules/recordings/types/recording';

import { RecordEventArgs } from './args/record-event.args';
import { RecordingProcessingService } from './services/recording-processing.service';
import { RecordEvent } from './types/record-event';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Recordings')
export class RecordingsResolver {
  constructor(
    private readonly recordingsService: RecordingsService,
    private readonly recordingProcessingService: RecordingProcessingService,
  ) {}

  @Query(() => [RecordingFile])
  getRecordings(): Promise<RecordingFile[]> {
    return this.recordingsService.getRecordings();
  }

  @Query(() => Boolean)
  async reloadRecordings(): Promise<boolean> {
    await this.recordingProcessingService.reloadAllRecordings();
    return true;
  }

  @Query(() => [RecordEvent])
  getPendingRecordings(): Promise<RecordEvent[]> {
    return this.recordingProcessingService.getPendingRecordings();
  }

  @Query(() => [RecordEvent])
  getBrokenRecordings(): RecordEvent[] {
    return this.recordingProcessingService.getBrokenRecordings();
  }

  @Query(() => [RecordEvent])
  getQueue(): RecordEvent[] {
    return this.recordingProcessingService.getQueue();
  }

  @Mutation(() => Boolean)
  async processRecording(@Args() args: RecordEventArgs): Promise<boolean> {
    await this.recordingProcessingService.processRecording(args);
    return true;
  }
}
