import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpException } from '@common/exceptions/exceptions';

@Catch(CustomHttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): CustomHttpException {
    const gqlHost = GqlArgumentsHost.create(host);
    const lang = gqlHost.getContext().req.query.lang || 'en';

    return new CustomHttpException(exception.getStatus(), exception.exception, exception.args, lang);
  }
}
