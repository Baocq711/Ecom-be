import { Controller, Get, Post, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { User } from '@/shared/decorator/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@User() user: UserJwtPayload) {
    return this.cartService.create(user);
  }

  @Get()
  findOne(@User() user: UserJwtPayload) {
    return this.cartService.findOne(user);
  }

  @Delete()
  remove(@User() user: UserJwtPayload) {
    return this.cartService.remove(user);
  }
}
