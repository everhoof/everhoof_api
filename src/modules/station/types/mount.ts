import { Listeners } from '@modules/station/types/listeners';
import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

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
  bitrate: number;

  @Field(() => String, { nullable: true })
  format: string;

  @Field(() => Listeners)
  listeners: Listeners;
}
