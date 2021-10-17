import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class Live {
  @Field(() => Boolean)
  isLive: boolean;

  @Field(() => String)
  streamerName: string;

  @Field(() => Number)
  broadcastStart: number;
}
