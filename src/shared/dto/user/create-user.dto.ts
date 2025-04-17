import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsEmail({}, { message: i18nValidationMessage('validation.isEmail') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @MinLength(6, { message: i18nValidationMessage('validation.minLength') })
  @MaxLength(20, { message: i18nValidationMessage('validation.maxLength') })
  @Matches(/^[A-Za-z0-9!@#$%^&*?]*$/, { message: i18nValidationMessage('validation.matches') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  password: string;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @Matches(
    /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸỳỵỷỹ ]*$/,
    { message: i18nValidationMessage('validation.matches') },
  )
  @IsString({ message: i18nValidationMessage('validation.isString') })
  name: string;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  phone: string;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  address: string;

  @IsOptional()
  roleId: string;
}
