import { Injectable } from '@nestjs/common';
import { CartRepository } from '@/shared/repositories/cart.repository';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { NotFoundException } from '@/shared/exception/not-found.exception';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async create(user: UserJwtPayload) {
    const isExists = await this.cartRepository.findOne(user.id);

    if (isExists) throw new BadRequestException('modules.cart.cartExists');

    const cart = await this.cartRepository.create(user.id);

    return {
      id: cart.id,
      createdAt: cart.createdAt,
    };
  }

  async findOne(user: UserJwtPayload) {
    const cart = await this.cartRepository.findOne(user.id);

    if (!cart) throw new NotFoundException('modules.cart.cartNotExists');

    return cart;
  }

  async remove(user: UserJwtPayload) {
    const cart = await this.cartRepository.findOne(user.id);

    if (!cart) throw new NotFoundException('modules.cart.cartNotExists');

    await this.cartRepository.delete(user.id);

    return {
      id: cart.id,
      deletedAt: new Date(),
    };
  }
}
