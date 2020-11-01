import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TrackRequestResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
