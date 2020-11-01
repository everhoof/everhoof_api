import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class TrackRequestArgs {
  @Field(() => String)
  songId: string;
}
