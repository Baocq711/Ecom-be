import { CreateCartItemDto } from '@/shared/dto/cart/create-cart-item.dto';
import { UpdateCartItemDto } from '@/shared/dto/cart/update-cart-item.dto';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { CartItemRepository } from '@/shared/repositories/cart-item.repository';
import { VariantRepository } from '@/shared/repositories/variant.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartItemService {
  constructor(
    private readonly cartItemRepository: CartItemRepository,
    private readonly variantRepository: VariantRepository,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const isVariantExist = await this.variantRepository.findOneById(createCartItemDto.variantId);
    if (!isVariantExist) {
      throw new BadRequestException('modules.cart.cartNotExists');
    }

    const isCartItemExist = isVariantExist.cartItems.find((item) => item.id === createCartItemDto.cartId);
    if (isCartItemExist) {
      const cartItem = await this.cartItemRepository.update(isCartItemExist.id, {
        quantity: isCartItemExist.quantity + createCartItemDto.quantity,
      });
      return {
        id: cartItem.id,
        updatedAt: cartItem.updatedAt,
      };
    }

    const cartItem = await this.cartItemRepository.create(createCartItemDto);
    return {
      id: cartItem.id,
      createdAt: cartItem.createdAt,
    };
  }

  async findOne(id: string) {
    const cartItem = await this.cartItemRepository.findOneById(id);
    if (!cartItem) {
      throw new BadRequestException('modules.cart.cartNotExists');
    }
    return cartItem;
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    const isCartItemExist = await this.cartItemRepository.findOneById(id);
    if (!isCartItemExist) {
      throw new BadRequestException('modules.cart.cartNotExists');
    }

    const cartItem = await this.cartItemRepository.update(id, updateCartItemDto);

    return {
      id: cartItem.id,
      updatedAt: cartItem.updatedAt,
    };
  }

  async remove(id: string) {
    const isCartItemExist = await this.cartItemRepository.findOneById(id);
    if (!isCartItemExist) {
      throw new BadRequestException('modules.cart.cartNotExists');
    }

    await this.cartItemRepository.delete(id);

    return {
      id: isCartItemExist.id,
      deletedAt: new Date(),
    };
  }
}
