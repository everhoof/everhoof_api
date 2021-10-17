import {
  Field,
  Float,
  ObjectType,
} from '@nestjs/graphql';

import { CurrentPlayingTrack } from '~/modules/tracks/types/current-playing-track';
import { Live } from '~/modules/tracks/types/live';

@ObjectType()
export class CurrentPlaying {
  @Field(() => CurrentPlayingTrack)
  previous: CurrentPlayingTrack;

  @Field(() => CurrentPlayingTrack)
  current: CurrentPlayingTrack;

  @Field(() => CurrentPlayingTrack)
  next: CurrentPlayingTrack;

  @Field(() => Live)
  live: Live;

  @Field(() => Float)
  timestamp: number;

  @Field(() => Number)
  listenersCount: number;
}
