import { Track } from '@modules/tracks/types/track';
import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class TrackSearchItem {
  @Field(() => String)
  requestId: string;

  @Field(() => Track)
  track: Track;
}
