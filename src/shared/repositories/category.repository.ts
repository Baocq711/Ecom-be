import { createSlug } from '@/helper/createSlug';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async exists(name: string) {
    return this.prismaService.category.findFirst({
      where: { name },
    });
  }

  async findById(id: string) {
    return this.prismaService.category.findUnique({
      where: { id },
    });
  }

  async create(createCategory: CreateCategory) {
    return this.prismaService.category.create({
      data: { ...createCategory, slug: createSlug(createCategory.name) },
    });
  }

  async update(id: string, updateCategory: UpdateCategory) {
    return this.prismaService.category.update({
      where: { id },
      data: { ...updateCategory, slug: updateCategory.name ? createSlug(updateCategory.name) : undefined },
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

  async findPath(id: string) {
    return this.prismaService.$queryRaw<Array<{ name: string }>>`
        WITH RECURSIVE CategoryHierarchy AS (
          -- Anchor member: select the starting category
          SELECT id, "name", "parentId"
          FROM "Category"
          WHERE id = ${id}::uuid  -- Your input is 'id'

          UNION ALL

          -- Recursive member: select the parent of the current category
          SELECT c.id, c."name", c."parentId"
          FROM "Category" c
          INNER JOIN CategoryHierarchy ch ON c.id = ch."parentId"
        )
        -- Select all names from the hierarchy
        -- To exclude the starting category (identified by ${id}), filter by its 'id'
        SELECT "name"
        FROM CategoryHierarchy
        -- WHERE id != ${id}; -- Corrected: Exclude the starting category using its id
      `.then((res) => res.map((item) => item.name));
  }

  async delete(id: string) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
