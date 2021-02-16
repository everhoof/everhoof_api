import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpException, ExceptionMessage } from '@common/exceptions/exceptions';
import { Request, Response } from 'express';

@Catch(CustomHttpException)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): CustomHttpException {
    const gqlHost = GqlArgumentsHost.create(host);
    const lang = gqlHost.getContext().req.query.lang || 'en';

    return new CustomHttpException(exception.getStatus(), exception.exception, exception.args, lang);
  }
}

@Catch(CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang: keyof ExceptionMessage = (request.query.lang as keyof ExceptionMessage) || 'en';

    const translatedException = new CustomHttpException(
      exception.getStatus(),
      exception.exception,
      exception.args,
      lang,
    );

    response.status(status).json(translatedException.getResponse());
  }
}
