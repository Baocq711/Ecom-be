import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { DiscountType } from '@prismaclient/index';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateProductDto {
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  name: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  description: string;

  @IsOptional()
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  discount: number;

  @IsOptional()
  @IsEnum(DiscountType, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  discountType: DiscountType;

  @IsOptional()
  @IsBoolean({ message: i18nValidationMessage<I18nTranslations>('validation.isBoolean') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  isActive: boolean;

  @IsOptional()
  @IsUUID('4', { message: i18nValidationMessage<I18nTranslations>('validation.isUUID') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  categoryId: string;
}
