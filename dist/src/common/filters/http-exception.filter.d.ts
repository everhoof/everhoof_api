import { ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpException } from '@common/exceptions/exceptions';
export declare class HttpExceptionFilter implements GqlExceptionFilter {
    catch(exception: CustomHttpException, host: ArgumentsHost): CustomHttpException;
}
