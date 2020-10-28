import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => String)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  artist: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  album: string;

  @Field(() => String)
  lyrics: string;

  @Field(() => String)
  art: string;
}
