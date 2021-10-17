import {
  ArgsType,
  Field,
} from '@nestjs/graphql';

@ArgsType()
export class RecordEventArgs {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  preview: string;

  @Field(() => String)
  eventDescriptionShort: string;

  @Field(() => String)
  eventDescriptionLong: string;
}
