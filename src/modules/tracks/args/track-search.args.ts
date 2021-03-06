import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TrackSearchArgs {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  count: number;

  @Field(() => String, { defaultValue: '' })
  q: string;
}
