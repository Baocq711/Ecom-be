import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { OTPType } from '@prismaclient/index';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SendOTPDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.isEmail') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(OTPType, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  })
  otpType: OTPType;
}
