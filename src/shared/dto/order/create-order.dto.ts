import { I18nTranslations } from '@i18ntypes/i18n.generated';
import { DiscountType, OrderStatus, PaymentMethod } from '@prismaclient/index';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateOrderDto {
  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  totalAmount: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(OrderStatus, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  status: OrderStatus;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  discount: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(DiscountType, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  discountType: DiscountType;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsEnum(PaymentMethod, { message: i18nValidationMessage<I18nTranslations>('validation.isEnum') })
  paymentMethod: PaymentMethod;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  trackingNumber: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  shippingAddress: string;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.isNumber') })
  @IsPositive({ message: i18nValidationMessage<I18nTranslations>('validation.isPositive') })
  shippingFee: number;

  @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.isNotEmpty') })
  @IsArray({ message: i18nValidationMessage<I18nTranslations>('validation.isArray') })
  @IsUUID('4', { each: true, message: i18nValidationMessage<I18nTranslations>('validation.isString') })
  cartItemIds: string[];
}
