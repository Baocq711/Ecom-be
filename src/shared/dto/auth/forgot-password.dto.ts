import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ForgotPasswordDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.isEmail') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  email: string;

  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @Min(100000, { message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Max(999999, { message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  otp: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @MinLength(6, { message: i18nValidationMessage<I18nTranslations>('validation.minLength') })
  @MaxLength(20, { message: i18nValidationMessage<I18nTranslations>('validation.maxLength') })
  @Matches(/^[A-Za-z0-9!@#$%^&*?]*$/, { message: i18nValidationMessage<I18nTranslations>('validation.matches') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  password: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @MinLength(6, { message: i18nValidationMessage<I18nTranslations>('validation.minLength') })
  @MaxLength(20, { message: i18nValidationMessage<I18nTranslations>('validation.maxLength') })
  @Matches(/^[A-Za-z0-9!@#$%^&*?]*$/, { message: i18nValidationMessage<I18nTranslations>('validation.matches') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  confirmPassword: string;
}
