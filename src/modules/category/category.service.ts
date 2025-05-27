import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '@/shared/repositories/category.repository';
import { CreateCategoryDto } from '@/shared/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@/shared/dto/category/update-category.dto';
import { BadRequestException } from '@/shared/exception/bad-request.exception';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const isExists = await this.categoryRepository.exists(createCategoryDto.name);

    if (isExists) {
      throw new BadRequestException('modules.category.categoryExists');
    }

    const category = await this.categoryRepository.create(createCategoryDto);

    return {
      id: category.id,
      createdAt: category.createdAt,
    };
  }

  async findAllByLevel(level?: number) {
    const categories = await this.categoryRepository.findByLevel(level);

    return categories;
  }

  async findByParent(parentId: string) {
    return this.categoryRepository.findByParent(parentId);
  }

  async findPath(id: string) {
    return this.categoryRepository.findPath(id);
  }

  async findById(id: string) {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new BadRequestException('modules.category.categoryNotExists');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findById(id);

    const category = await this.categoryRepository.update(id, updateCategoryDto);

    return {
      id: category.id,
      updatedAt: category.updatedAt,
    };
  }

  async remove(id: string) {
    await this.findById(id);

    const category = await this.categoryRepository.delete(id);

    return {
      id: category.id,
      deletedAt: new Date(),
    };
  }
}
