import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';

@ObjectType()
@Entity('users')
export class User {
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
    length: 254,
  })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    length: 32,
  })
  username: string;

  @Column({
    length: 64,
    select: false,
  })
  salt: string;

  @Column({
    length: 64,
    select: false,
  })
  hash: string;

  @Field(() => Date, { nullable: true })
  @Column({
    name: 'was_online_at',
    type: 'datetime',
    width: 6,
    nullable: true,
  })
  wasOnlineAt: Nullable<Date>;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;

  @OneToMany(() => Token, (token) => token.owner)
  tokens: Token[];

  @ManyToMany(() => Role, ({ users }) => users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
