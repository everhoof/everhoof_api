import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

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
