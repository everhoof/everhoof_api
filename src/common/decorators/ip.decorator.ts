import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as requestIp from 'request-ip';

export const Ip = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const req = ctx.getContext().req;

  const ip = (req && requestIp.getClientIp(ctx.getContext().req)) || undefined;
  if (ip && ip.substr(0, 7) === '::ffff:') return ip.substr(7);
  return ip;
});
