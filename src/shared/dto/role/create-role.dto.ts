import { NAME_REGEX } from '@/shared/@types/constants';
import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateRoleDto {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Matches(NAME_REGEX, {
    message: i18nValidationMessage<I18nTranslations>('validation.matches'),
  })
  name: string;

  @IsOptional()
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty'),
  })
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('validation.isString'),
  })
  @Matches(NAME_REGEX, {
    message: i18nValidationMessage<I18nTranslations>('validation.matches'),
  })
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', {
    message: i18nValidationMessage<I18nTranslations>('validation.isUUID'),
    each: true,
  })
  permissionIds?: string[];
}
