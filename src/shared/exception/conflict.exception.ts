import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class ConflictException extends HttpException {
  constructor(message?: string) {
    const i18n = I18nContext.current();

    if (message) {
      if (message?.startsWith('t.')) {
        message = i18n?.t(message.slice(2));
      }
    } else {
      message = i18n?.t('response.exception.conflict');
    }

    super(
      {
        statusCode: HttpStatus.CONFLICT,
        error: 'Conflict',
        message,
      },
      HttpStatus.CONFLICT,
    );
  }
}
