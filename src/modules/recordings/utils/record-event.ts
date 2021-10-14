import { RecordingCalendarEventDto } from '@modules/calendar/types/calendar-event';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
@ObjectType()
export class RecordEvent {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  date: string;

  @Field(() => String, { nullable: true })
  preview?: string;

  @Field(() => String)
  eventDescriptionShort: string;

  @Field(() => String, { nullable: true })
  eventDescriptionLong?: string;

  constructor(fileName: string, calendarEvent: RecordingCalendarEventDto) {
    this.fileName = fileName;

    this.date = calendarEvent.date;
    this.eventDescriptionShort = calendarEvent.name;
    this.preview = calendarEvent.preview;
  }
}
