import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { DiscountType, OrderStatus, PaymentMethod } from '@prismaclient/index';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateOrderDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  totalAmount: number;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(OrderStatus, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    return value;
  })
  status: OrderStatus;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  discount: number;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(DiscountType, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase();
    return value;
  })
  discountType: DiscountType;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(PaymentMethod, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.toUpperCase().replace(' ', '_');
    return value;
  })
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  trackingNumber: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  shippingAddress: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  shippingFee: number;
}
