import {
  ArgsType,
  Field,
} from '@nestjs/graphql';
import {
  IsInt,
  Max,
  Min,
} from 'class-validator';

@ArgsType()
export class VoteArgs {
  @Field(() => Number)
  @Max(5)
  @Min(1)
  @IsInt()
  rating: number;
}
