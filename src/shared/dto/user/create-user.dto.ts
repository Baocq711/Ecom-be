import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.isEmail') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @MinLength(6, { message: i18nValidationMessage<I18nTranslations>('validation.minLength') })
  @MaxLength(20, { message: i18nValidationMessage<I18nTranslations>('validation.maxLength') })
  @Matches(/^[A-Za-z0-9!@#$%^&*?]*$/, { message: i18nValidationMessage<I18nTranslations>('validation.matches') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  password: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Matches(
    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸỳỵỷỹ ]*$/,
    { message: i18nValidationMessage<I18nTranslations>('validation.matches') },
  )
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  address: string;

  @IsOptional()
  roleId: string;
}
