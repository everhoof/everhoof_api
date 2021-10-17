import {
  Field,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { AzuraSong } from './azura-song.entity';

@ObjectType()
@Entity('song_votes')
export class SongVote {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
  })
  readonly id: number;

  @Field(() => String)
  @Column({
    name: 'azura_song_id',
    type: 'varchar',
    length: 32,
  })
  azuraSongId: string;

  @Field(() => Number)
  @Column({
    type: 'int',
  })
  rating: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 40,
  })
  ip: string;

  @Field(() => Date)
  @Column({
    type: 'timestamp with time zone',
    default: 'now()',
  })
  ts: Date;

  @ManyToOne(() => AzuraSong, ({ votes }) => votes)
  @JoinColumn({
    name: 'azura_song_id',
    referencedColumnName: 'id',
  })
  azuraSong: AzuraSong;
}
