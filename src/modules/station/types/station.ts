import { Mount } from '@modules/station/types/mount';
import { Playlists } from '@modules/station/types/playlists';
import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class Station {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  shortcode: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  frontend: string;

  @Field(() => String)
  backend: string;

  @Field(() => String)
  listenUrl: string;

  @Field(() => Boolean)
  public: boolean;

  @Field(() => Playlists)
  playlists: Playlists;

  @Field(() => [Mount])
  mounts: Mount[];
}
