import { NAME_REGEX } from '@/shared/@types/constants';
import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { Method, Module } from '@prismaclient/index';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreatePermissionDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Matches(NAME_REGEX, { message: i18nValidationMessage<I18nTranslations>('validation.matches') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  name: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  path: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(Method, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    return value;
  })
  method: Method;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(Module, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    return value;
  })
  module: Module;

  @IsOptional()
  @IsNotEmpty({ each: true, message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsUUID('4', { each: true, message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  roleIds?: string[];
}
