import {
  Field,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class RecordingFile {
  @Field(() => String)
  name: string;

  @Field(() => String)
  img: string;

  @Field(() => String)
  year: string;

  @Field(() => String)
  desc: string;

  @Field(() => Number)
  size: number;
}
