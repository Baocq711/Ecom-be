import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VariantRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async exist(sku: string) {
    return this.prismaService.variant.findFirst({
      where: {
        sku,
        deletedAt: null,
      },
    });
  }

  async create(productId: string, createVariant: CreateVariant) {
    return this.prismaService.variant.create({
      data: {
        ...createVariant,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async update(id: string, updateVariant: UpdateVariant) {
    return this.prismaService.variant.update({
      where: { id },
      data: updateVariant,
    });
  }

  async findAndCount(query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.variant.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prismaService.variant.count(),
    ]);
  }

  async remove(id: string) {
    return this.prismaService.variant.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findOneById(id: string) {
    return this.prismaService.variant.findUnique({ where: { id }, include: { cartItems: true } });
  }
}
