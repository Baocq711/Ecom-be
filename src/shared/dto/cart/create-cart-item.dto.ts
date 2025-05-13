import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCartItemDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage('validation.isNumber') })
  @IsInt({ message: i18nValidationMessage('validation.isInt') })
  @IsPositive({ message: i18nValidationMessage('validation.isPositive') })
  quantity: number;

  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsUUID('4', { message: i18nValidationMessage('validation.isUUID') })
  variantId: string;
}
