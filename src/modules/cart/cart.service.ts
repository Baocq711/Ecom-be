import { Injectable } from '@nestjs/common';
import { CartRepository } from '@/shared/repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  create(user: UserJwtPayload) {
    return this.cartRepository.create(user.id);
  }

  findOne(user: UserJwtPayload) {
    return this.cartRepository.findOne(user.id);
  }

  remove(user: UserJwtPayload) {
    return this.cartRepository.delete(user.id);
  }
}
