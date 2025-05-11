import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@/shared/dto/order/create-order.dto';
import { UpdateOrderDto } from '@/shared/dto/order/update-order.dto';
import { User } from '@/shared/decorator/user.decorator';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@User() user: UserJwtPayload, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(user, createOrderDto);
  }

  @Get()
  findAll(@User() user: UserJwtPayload, @Query() query: PaginationDto) {
    return this.orderService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
