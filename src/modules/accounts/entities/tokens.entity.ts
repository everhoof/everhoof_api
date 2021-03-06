import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';

@ObjectType()
@Entity('tokens')
export class Token {
  @Field(() => Int)
  @PrimaryColumn({
    generated: 'increment',
    unsigned: true,
    width: 10,
  })
  readonly id: number;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 64,
  })
  value: string;

  @Field(() => Int)
  @Column({
    name: 'owner_id',
    unsigned: true,
    width: 10,
  })
  ownerId: number;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'expires_at',
    type: 'datetime',
    width: 6,
    nullable: true,
  })
  expiresAt: Nullable<Date>;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'used_at',
    type: 'datetime',
    width: 6,
    nullable: true,
  })
  usedAt: Nullable<Date>;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'owner_id',
    referencedColumnName: 'id',
  })
  owner: User;
}
