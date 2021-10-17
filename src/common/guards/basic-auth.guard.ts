import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();

    if (!request) {
      const graphqlContext = GqlExecutionContext.create(context);
      request = graphqlContext.getContext().req;
    }

    const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
    return b64auth === process.env.BASIC_AUTH;
  }
}
