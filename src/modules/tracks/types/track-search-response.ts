import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Track } from '@modules/tracks/types/track';

@ObjectType()
export class TrackSearchResponse {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  total: number;

  @Field(() => [Track])
  tracks: Track[];
}
