import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class DeleteFileDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  filePath: string;
}
