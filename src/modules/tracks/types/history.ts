import { Track } from '@modules/tracks/types/track';
import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class HistoryItem {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  playedAt: number;

  @Field(() => Number)
  duration: number;

  @Field(() => String)
  playlist: string;

  @Field(() => String)
  streamer: string;

  @Field(() => Boolean)
  isRequest: boolean;

  @Field(() => Track)
  track: Track;
}
