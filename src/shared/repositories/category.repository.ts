import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(name: string) {
    return this.prismaService.category.findUnique({
      where: { name: name },
    });
  }

  async findById(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }

  async create(createCategory: CreateCategory) {
    return this.prismaService.category.create({
      data: createCategory,
    });
  }

  async update(id: string, updateCategory: UpdateCategory) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategory,
    });
  }

  async findByLevel(level?: number) {
    return this.prismaService.category.findMany({
      where: { level },
      include: { children: true },
    });
  }

  async findByParent(parentId: string) {
    return this.prismaService.category.findMany({
      where: { parentId },
      include: { products: true },
    });
  }

  async findByName(name: string) {
    return this.prismaService.category.findUnique({
      where: { name },
      include: { products: true },
    });
  }

  async delete(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
