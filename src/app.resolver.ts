import { GraphqlExceptionFilter } from '@common/filters/graphql-exception.filter';
import { UseFilters } from '@nestjs/common';
import {
  Query,
  Resolver,
} from '@nestjs/graphql';

@UseFilters(GraphqlExceptionFilter)
@Resolver('App')
export class AppResolver {
  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }
}
