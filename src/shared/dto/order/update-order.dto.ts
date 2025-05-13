import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '@/shared/dto/order/create-order.dto';

export class UpdateOrderDto extends PartialType(
  PickType(CreateOrderDto, ['status', 'paymentMethod', 'trackingNumber', 'shippingAddress', 'shippingFee']),
) {}
