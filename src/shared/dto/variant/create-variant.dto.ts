import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateVariantDto {
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  sku: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  size: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  color: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  material: string;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  stock?: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  price: number;
}
