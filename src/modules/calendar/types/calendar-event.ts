import { Field, Float, ObjectType } from '@nestjs/graphql';

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
}

export interface CalendarEventParams {
  notify: boolean;
  preview: string;
}

export class CalendarEventDto {
  summary: string;
  starts_at: string;
  ends_at: string;
  preview: string;
}
