import {
  Field,
  Float,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class CalendarEvent {
  @Field(() => String)
  summary: string;

  @Field(() => Float)
  startsAt: number;

  @Field(() => Float)
  endsAt: number;

  @Field(() => String)
  preview: string;

  @Field(() => Boolean)
  notify: boolean;

  @Field(() => Boolean)
  recording: boolean;
}

export interface CalendarEventParameters {
  notify: boolean;
  recording: boolean;
  preview: string;
}
