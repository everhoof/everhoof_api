import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as requestIp from 'request-ip';

export const Ip = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const graphqlContext = GqlExecutionContext.create(context);
  const { req } = graphqlContext.getContext();

  const ip = (req && requestIp.getClientIp(graphqlContext.getContext().req)) || undefined;
  if (ip && ip.slice(0, 7) === '::ffff:') return ip.slice(7);
  return ip;
});
