import {
  ArgsType,
  Field,
  Int,
} from '@nestjs/graphql';
import {
  IsInt,
  Min,
} from 'class-validator';

@ArgsType()
export class ActionOnUserArgs {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  userId: number;
}
