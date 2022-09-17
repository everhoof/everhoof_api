import {
  ArgsType,
  Field,
  Int,
} from '@nestjs/graphql';
import {
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@ArgsType()
export class TrackSearchArgs {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  @Min(1)
  @Max(250)
  count: number;

  @Field(() => String, { defaultValue: '' })
  @MinLength(2)
  @MaxLength(32)
  q: string;
}
