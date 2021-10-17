import { UseFilters } from '@nestjs/common';
import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { Ip } from '~/common/decorators/ip.decorator';
import { GraphqlExceptionFilter } from '~/common/filters/graphql-exception.filter';
import { TrackRequestArgs } from '~/modules/tracks/args/track-request.args';
import { TrackSearchArgs } from '~/modules/tracks/args/track-search.args';
import { TracksService } from '~/modules/tracks/tracks.service';
import { CurrentPlaying } from '~/modules/tracks/types/current-playing';
import { HistoryItem } from '~/modules/tracks/types/history';
import { TrackRequestResponse } from '~/modules/tracks/types/track-request-response';
import { TrackSearchResponse } from '~/modules/tracks/types/track-search-response';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Tracks')
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Query(() => CurrentPlaying, { nullable: true })
  getCurrentPlaying(): Promise<CurrentPlaying | undefined> {
    return this.tracksService.getCurrentPlaying();
  }

  @Query(() => [HistoryItem])
  getTracksHistory(): Promise<HistoryItem[]> {
    return this.tracksService.getTracksHistory();
  }

  @Query(() => TrackSearchResponse)
  searchTracks(@Args() trackSearchArgs: TrackSearchArgs): Promise<TrackSearchResponse> {
    return this.tracksService.searchTracks(trackSearchArgs);
  }

  @Query(() => TrackRequestResponse)
  requestTrack(@Args() args: TrackRequestArgs, @Ip() ip?: string): Promise<TrackRequestResponse> {
    return this.tracksService.requestTrack(args, ip);
  }
}
