import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from '@/shared/dto/order/create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
