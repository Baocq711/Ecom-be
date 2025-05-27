import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PaginationDto {
  @IsOptional()
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsInt({ message: i18nValidationMessage<I18nTranslations>('validation.isInt') })
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean({ message: i18nValidationMessage<I18nTranslations>('validation.isBoolean') })
  withDeleted: boolean;
}
