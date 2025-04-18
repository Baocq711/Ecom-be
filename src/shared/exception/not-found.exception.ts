import { I18nPath } from '@i18ntypes/i18n.generated';
import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

export class NotFoundException extends HttpException {
  constructor(message?: I18nPath, translate: boolean = true) {
    const i18n = I18nContext.current();
    if (message) {
      if (translate) {
        message = i18n?.t(message as unknown as string);
      }
    } else {
      message = i18n?.t('response.exception.notFound');
    }

    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        error: 'Not Found',
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
