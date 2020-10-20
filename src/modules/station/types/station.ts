import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Playlists {
  @Field(() => String)
  m3u: string;

  @Field(() => String)
  pls: string;
}

@ObjectType()
export class Listeners {
  @Field(() => Number)
  current: number;

  @Field(() => Number)
  unique: number;

  @Field(() => Number)
  total: number;
}

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

  @Field(() => Number)
  bitrate: number;

  @Field(() => String)
  format: string;

  @Field(() => Listeners)
  listeners: Listeners;
}

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
