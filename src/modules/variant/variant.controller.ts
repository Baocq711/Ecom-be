import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VariantService } from './variant.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreateVariantDto } from '@/shared/dto/variant/create-variant.dto';
import { UpdateVariantDto } from '@/shared/dto/variant/update-variant.dto';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post(':id')
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @Param('id') productId: string,
    @Body() createVariantDto: CreateVariantDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.variantService.create(productId, createVariantDto, files);
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.variantService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.variantService.update(id, updateVariantDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(id);
  }
}
