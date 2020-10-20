import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Live {
  @Field(() => Boolean)
  isLive: boolean;
  @Field(() => String)
  streamerName: string;
  @Field(() => Number)
  broadcastStart: number;
}

@ObjectType()
export class CurrentPlayingTrack {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  artist: string;

  @Field(() => Number)
  startsAt: number;

  @Field(() => Number)
  endsAt: number;

  @Field(() => Number)
  duration: number;

  @Field(() => String)
  art: string;
}

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
