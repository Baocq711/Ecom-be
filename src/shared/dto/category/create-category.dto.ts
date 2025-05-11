import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCategoryDto {
  @IsNotEmpty({ message: i18nValidationMessage('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage('validation.isString') })
  name: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.isString') })
  description?: string;

  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.isString') })
  @IsUUID('4', { message: i18nValidationMessage('validation.isUUID') })
  parentId?: string;

  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.isArray') })
  @IsUUID('4', { each: true, message: i18nValidationMessage('validation.isUUID') })
  productIds?: string[];
}
