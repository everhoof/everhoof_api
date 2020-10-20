import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@modules/users/entities/users.entity';

@ObjectType()
@Entity('roles')
export class Role {
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
  name: string;

  @ManyToMany(() => User, ({ roles }) => roles, { lazy: true })
  users: Promise<User[]>;
}
