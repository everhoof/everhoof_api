import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

import { Listeners } from '~/modules/station/types/listeners';

@ObjectType()
export class Mount {
  @Field(() => String)
  path: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;

  @Field(() => Number, { nullable: true })
  bitrate: number | null;

  @Field(() => String, { nullable: true })
  format: string | null;

  @Field(() => Listeners)
  listeners: Listeners;
}
