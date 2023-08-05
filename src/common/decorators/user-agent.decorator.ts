import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserAgent = createParamDecorator((data: unknown, context: ExecutionContext): string => {
  const graphqlContext = GqlExecutionContext.create(context);
  const { req } = graphqlContext.getContext();

  return req.headers['user-agent'] || undefined;
});
