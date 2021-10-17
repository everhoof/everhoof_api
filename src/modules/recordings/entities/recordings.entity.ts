import {
  Field,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity('recordings')
export class Recording {
  @Field(() => Int)
  @PrimaryColumn({
    type: 'int',
    generated: 'increment',
  })
  readonly id: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 32,
  })
  filename: string;

  @Field(() => Int)
  @Column({
    type: 'int',
  })
  filesize: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  preview: string;

  @Field(() => String)
  @Column({
    type: 'date',
  })
  date: string;

  @Field(() => String)
  @Column({
    name: 'description_short',
    type: 'varchar',
    length: 128,
  })
  descriptionShort: string;

  @Field(() => String)
  @Column({
    name: 'description_full',
    type: 'text',
    nullable: true,
  })
  descriptionFull: string;

  @Field(() => Boolean)
  @Column({
    type: 'boolean',
  })
  hide: boolean;
}
