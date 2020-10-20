import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CalendarEvent {
  @Field(() => String)
  summary: string;

  @Field(() => Float)
  startsAt: number;

  @Field(() => Float)
  endsAt: number;
}
