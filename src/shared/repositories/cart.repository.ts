import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string) {
    return this.prismaService.cart.create({
      data: {
        userId,
        items: {
          create: [],
        },
      },
    });
  }

  async findOne(userId: string) {
    return this.prismaService.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
        _count: true,
      },
    });
  }

  async delete(userId: string) {
    return this.prismaService.cart.update({
      data: {
        items: {
          deleteMany: {},
        },
      },
      where: {
        userId,
      },
    });
  }
}
