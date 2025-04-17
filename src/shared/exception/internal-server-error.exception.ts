import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class InternalServerErrorException extends HttpException {
  constructor(message?: string) {
    const i18n = I18nContext.current();

    if (message) {
      if (message?.startsWith('t.')) {
        message = i18n?.t(message.slice(2));
      }
    } else {
      message = i18n?.t('response.exception.internalServerError');
    }

    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
