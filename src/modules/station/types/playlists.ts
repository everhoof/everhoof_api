import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class Playlists {
  @Field(() => String)
  m3u: string;

  @Field(() => String)
  pls: string;
}
