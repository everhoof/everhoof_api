// eslint-disable-next-line max-classes-per-file
import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';

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

type ExceptionArgs = {
  [key: string]: string;
};

type Exception = {
  [key in keyof ExceptionKeys]: ExceptionMessage;
};

const exceptions: Exception = {
  UNKNOWN: {
    en: 'An unknown error occurred',
    ru: 'Произошла неизвестная ошибка',
  },
  FORBIDDEN: {
    en: 'Access to the resource is forbidden',
    ru: 'Доступ к ресурсу запрещён',
  },
  USER_DOES_NOT_EXIST_WITH_ID: {
    en: 'User with id %id% does not exist',
    ru: 'Пользователь с id %id% не существует',
  },
  USERNAME_OCCUPIED: {
    en: 'This username is already occupied',
    ru: 'Это имя пользователя уже занято',
  },
  EMAIL_OCCUPIED: {
    en: 'This email is already occupied',
    ru: 'Этот электронный адрес уже используется',
  },
  WRONG_CREDENTIALS: {
    en: 'Wrong credentials',
    ru: 'Неверные учётные данные',
  },
};

function createExceptionMessage(
  exception: keyof ExceptionKeys,
  lang: keyof ExceptionMessage = 'en',
  args?: ExceptionArgs,
): string {
  if (exceptions[exception] && exceptions[exception][lang]) {
    const message = exceptions[exception][lang];
    if (args) {
      return Object.keys(args).reduce((accumulator, key) => accumulator.replace(new RegExp(`/%${key}%/`), args[key]), message);
    }
    return message;
  }
  return 'An unknown error occurred';
}

export class CustomHttpException extends HttpException {
  public readonly exception: keyof ExceptionKeys;

  public readonly lang: keyof ExceptionMessage;

  public readonly args: ExceptionArgs | undefined;

  constructor(
    status: number,
    exception: keyof ExceptionKeys,
    args?: ExceptionArgs,
    lang: keyof ExceptionMessage = 'en',
  ) {
    const message = createExceptionMessage(exception, lang, args);
    super(
      {
        statusCode: status,
        error: exception,
        message,
      },
      status,
    );
    this.exception = exception;
    this.lang = lang;
    this.args = args;
  }
}

export class UnauthorizedException extends CustomHttpException {
  constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs) {
    super(HttpStatus.UNAUTHORIZED, exception, args);
  }
}

export class BadRequestException extends CustomHttpException {
  constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs) {
    super(HttpStatus.BAD_REQUEST, exception, args);
  }
}

export class InternalServerErrorException extends CustomHttpException {
  constructor(exception: keyof ExceptionKeys, args?: ExceptionArgs) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, exception, args);
  }
}
