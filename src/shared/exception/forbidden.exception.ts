import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    const i18n = I18nContext.current();

    if (message) {
      if (message?.startsWith('t.')) {
        message = i18n?.t(message.slice(2));
      }
    } else {
      message = i18n?.t('response.exception.forbidden');
    }

    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        error: 'Forbidden',
        message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
