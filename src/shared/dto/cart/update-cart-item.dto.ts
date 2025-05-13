import { CreateCartItemDto } from '@/shared/dto/cart/create-cart-item.dto';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class UpdateCartItemDto extends PartialType(OmitType(CreateCartItemDto, ['variantId'])) {}
