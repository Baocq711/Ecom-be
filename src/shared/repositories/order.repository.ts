import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createOrder: CreateOrder) {
    return this.prismaService.order.create({
      data: {
        ...createOrder,
        userId,
        items: {
          createMany: {
            data: createOrder.items,
          },
        },
      },
    });
  }

  async findAndCount(userId: string, query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.order.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.order.count({
        where: { userId },
      }),
    ]);
  }

  async findOneById(id: string) {
    return this.prismaService.order.findUnique({
      where: { id, deletedAt: null },
      include: {
        items: true,
      },
    });
  }

  async update(id: string, updateOrder: UpdateOrder) {
    return this.prismaService.order.update({
      where: { id, deletedAt: null },
      data: updateOrder,
    });
  }

  async delete(id: string) {
    return this.prismaService.order.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findOneByPaymentCode(paymentCode: number) {
    return this.prismaService.order.findUnique({
      where: { paymentCode, deletedAt: null },
    });
  }
}
