import { CreateProductDto } from '@/shared/dto/product/create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
