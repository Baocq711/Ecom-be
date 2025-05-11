import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCartItem: CreateCartItem) {
    return this.prismaService.cartItem.create({
      data: createCartItem,
    });
  }

  async findByVariantId(variantId: string) {
    return this.prismaService.variant.findFirst({
      where: { id: variantId },
      include: {
        cartItems: true,
      },
    });
  }

  async update(id: string, updateCartItem: UpdateCartItem) {
    return this.prismaService.cartItem.update({
      where: { id },
      data: updateCartItem,
    });
  }

  async findOneById(id: string) {
    return this.prismaService.cartItem.findUnique({
      where: { id },
      include: {
        variant: true,
      },
    });
  }
  async delete(id: string) {
    return this.prismaService.cartItem.delete({
      where: { id },
    });
  }

  async findMany(ids: string[]) {
    return this.prismaService.cartItem.findMany({
      where: { id: { in: ids } },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
