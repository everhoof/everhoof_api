import { HttpException } from '@nestjs/common';
export interface ExceptionMessage {
    en: string;
    ru: string;
}
export interface ExceptionKeys {
    UNKNOWN: ExceptionMessage;
    FORBIDDEN: ExceptionMessage;
    USER_DOES_NOT_EXIST_WITH_ID: ExceptionMessage;
    USERNAME_OCCUPIED: ExceptionMessage;
    EMAIL_OCCUPIED: ExceptionMessage;
    WRONG_CREDENTIALS: ExceptionMessage;
}
declare type ExceptionArgs = {
    [key: string]: string;
};
export declare class CustomHttpException extends HttpException {
    readonly exception: keyof ExceptionKeys;
    readonly lang: keyof ExceptionMessage;
    readonly args: ExceptionArgs | undefined;
    constructor(status: number, exception: keyof ExceptionKeys, args?: ExceptionArgs, lang?: keyof ExceptionMessage);
}
export declare class UnauthorizedException extends CustomHttpException {
    constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs);
}
export declare class BadRequestException extends CustomHttpException {
    constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs);
}
export declare class InternalServerErrorException extends CustomHttpException {
    constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs);
}
export {};
