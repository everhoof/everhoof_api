import {
  CustomHttpException,
  ExceptionMessage,
} from '@common/exceptions/exceptions';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import {
  Request,
  Response,
} from 'express';

@Catch(CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
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
