import {
  Field,
  ObjectType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { SongVote } from './song-vote.entity';

@ObjectType()
@Entity('azura_songs')
export class AzuraSong {
  @Field(() => String)
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 32,
  })
  id: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 64,
  })
  artist: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @OneToMany(() => SongVote, ({ azuraSong }) => azuraSong)
  votes: SongVote[];
}
