import { createSlug } from '@/helper/createSlug';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { PrismaService } from '@/shared/services/prisma.service';
import { countProductsByCategory, productsByCategory } from '@/shared/sql/product.sql';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prismaclient/index';
import { arrayNotEmpty } from 'class-validator';

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
      data: { ...createProduct, slug: createSlug(createProduct.name) },
    });
  }

  async update(id: string, updateProduct: UpdateProduct) {
    return this.prismaService.product.update({
      where: { id, deletedAt: null },
      data: { ...updateProduct, slug: updateProduct.name ? createSlug(updateProduct.name) : undefined },
    });
  }

  async findAndCount(query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.product.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        where: {
          deletedAt: null,
          variants: {
            some: {},
          },
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

  async findOneByName(name: string) {
    return this.prismaService.product.findFirst({
      where: {
        name,
        deletedAt: null,
      },
      include: {
        variants: true,
      },
    });
  }

  async findByCategoryName(slug: string[], query: PaginationDto) {
    const category = await this.recursiveFindByCategoryName(slug);
    return this.prismaService
      .$transaction([
        this.prismaService.$queryRaw<ProductSql[]>(productsByCategory(category.id, query)),
        // findMany({
        //   skip: (query.page - 1) * query.limit,
        //   take: query.limit,
        //   where: {
        //     category: {
        //       id: category.level === 2 ? category.id : undefined,
        //       parentId: category.level === 1 ? category.id : undefined,
        //     },
        //     deletedAt: null,
        //     variants: {
        //       some: {},
        //     },
        //   },
        //   include: {
        //     variants: true,
        //   },
        // }),
        this.prismaService.$queryRaw<{ totalRecords: bigint }[]>(countProductsByCategory(category.id)),
      ])
      .then(([products, total]) => ({ products, totalRecords: Number(total[0].totalRecords) }));
  }

  async recursiveFindByCategoryName(slug: string[], parentId?: string): Promise<Prisma.CategoryGetPayload<{}>> {
    const category = await this.prismaService.category.findFirst({
      where: { slug: slug.shift(), parentId: parentId ?? null },
    });

    if (!category) {
      throw new NotFoundException('modules.category.categoryNotExists');
    }

    if (arrayNotEmpty(slug)) {
      return this.recursiveFindByCategoryName(slug, category.id);
    }

    return category;
  }
}
