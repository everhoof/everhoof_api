import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TracksService } from '@modules/tracks/tracks.service';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';
import { TrackSearchResponse } from '@modules/tracks/types/track-search-response';
import { TrackSearchArgs } from '@modules/tracks/args/track-search.args';
import { TrackRequestArgs } from '@modules/tracks/args/track-request.args';
import { TrackRequestResponse } from '@modules/tracks/types/track-request-response';

@UseFilters(HttpExceptionFilter)
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
  requestTrack(@Args() args: TrackRequestArgs): Promise<TrackRequestResponse> {
    return this.tracksService.requestTrack(args);
  }
}
