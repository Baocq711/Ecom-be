import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '@/shared/dto/category/create-category.dto';
import { UpdateCategoryDto } from '@/shared/dto/category/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('level') level: number) {
    return this.categoryService.findAllByLevel(level);
  }

  @Get('parent/:id')
  findByParent(@Param('id') id: string) {
    return this.categoryService.findByParent(id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string) {
    return this.categoryService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
