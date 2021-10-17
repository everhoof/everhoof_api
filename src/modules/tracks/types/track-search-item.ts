import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

import { Track } from '~/modules/tracks/types/track';

@ObjectType()
export class TrackSearchItem {
  @Field(() => String)
  requestId: string;

  @Field(() => Track)
  track: Track;
}
