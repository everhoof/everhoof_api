import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TracksService } from '@modules/tracks/tracks.service';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';

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
}
