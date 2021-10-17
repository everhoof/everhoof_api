import { TrackSearchItem } from '@modules/tracks/types/track-search-item';
import {
  Field,
  Int,
  ObjectType,
} from '@nestjs/graphql';

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
