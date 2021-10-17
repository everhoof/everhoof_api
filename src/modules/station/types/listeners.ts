import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class Listeners {
  @Field(() => Number)
  current: number;

  @Field(() => Number)
  unique: number;

  @Field(() => Number)
  total: number;
}
