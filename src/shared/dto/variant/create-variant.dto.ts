import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateVariantDto {
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
  @Type(() => Number)
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  stock?: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Type(() => Number)
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  price: number;
}
