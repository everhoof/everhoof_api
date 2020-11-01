import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Track } from '@modules/tracks/types/track';

@ObjectType()
export class TrackSearchItem {
  @Field(() => String)
  requestId: string;

  @Field(() => Track)
  track: Track;
}

@ObjectType()
export class TrackSearchResponse {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  total: number;

  @Field(() => [TrackSearchItem])
  items: TrackSearchItem[];
}
