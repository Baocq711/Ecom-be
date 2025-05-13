import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async exist(name: string) {
    return this.prismaService.product.findFirst({
      where: {
        name,
        deletedAt: null,
      },
    });
  }

  async existById(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async create(createProduct: CreateProduct) {
    return this.prismaService.product.create({
      data: createProduct,
    });
  }

  async update(id: string, updateProduct: UpdateProduct) {
    return this.prismaService.product.update({
      where: { id, deletedAt: null },
      data: updateProduct,
    });
  }

  async findAndCount(query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.product.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        where: {
          deletedAt: null,
        },
        include: {
          variants: true,
        },
      }),
      this.prismaService.product.count({
        where: {
          deletedAt: null,
        },
      }),
    ]);
  }

  async remove(id: string) {
    return this.prismaService.product.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async findOneById(id: string) {
    return this.prismaService.product.findUnique({ where: { id, deletedAt: null }, include: { variants: true } });
  }
}
