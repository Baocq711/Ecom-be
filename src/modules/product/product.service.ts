import { FileService } from '@/modules/file/file.service';
import { FileType } from '@/shared/@types/enum/file-type.enum';
import { FOLDER_S3 } from '@/shared/@types/file-folder';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreateProductDto } from '@/shared/dto/product/create-product.dto';
import { UpdateProductDto } from '@/shared/dto/product/update-product.dto';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { InternalServerErrorException } from '@/shared/exception/internal-server-error.exception';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { ProductRepository } from '@/shared/repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { arrayNotEmpty } from 'class-validator';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly fileService: FileService,
  ) {}

  async create(createProductDto: CreateProductDto, files: Express.Multer.File[]) {
    const isExist = await this.productRepository.exist(createProductDto.name);
    if (isExist) {
      throw new BadRequestException('modules.product.productExists');
    }

    const product = await this.productRepository.create(createProductDto);
    const images = await Promise.all(
      files.map(async (file) => {
        const image = await this.fileService.upload({
          file,
          folder: FOLDER_S3.product[':id'].image,
          fileType: FileType.image,
          id: product.id,
        });
        if (!image) {
          throw new InternalServerErrorException('modules.file.uploadFailed');
        }
        return image;
      }),
    );
    await this.productRepository.update(product.id, { images });

    return {
      id: product.id,
      createdAt: product.createdAt,
    };
  }

  async findAll(query: PaginationDto) {
    const [products, totalRecords] = await this.productRepository.findAndCount(query);
    return {
      meta: {
        page: query.page,
        limit: query.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / query.limit),
      },
      products,
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneById(id);
    if (!product) {
      throw new NotFoundException('modules.product.productNotExists');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]) {
    const isExistProduct = await this.productRepository.findOneById(id);
    if (!isExistProduct) {
      throw new NotFoundException('modules.product.productNotExists');
    }
    const product = await this.productRepository.update(id, updateProductDto);
    if (arrayNotEmpty(files)) {
      const images = await Promise.all(
        files.map(async (file) => {
          const image = await this.fileService.upload({
            file,
            folder: FOLDER_S3.product[':id'].image,
            fileType: FileType.image,
            id: product.id,
          });
          if (!image) {
            throw new InternalServerErrorException('modules.file.uploadFailed');
          }
          return image;
        }),
      );
      await this.productRepository.update(product.id, { images });
    }

    return {
      id: product.id,
      updatedAt: product.updatedAt,
    };
  }

  async remove(id: string) {
    const isExist = await this.productRepository.findOneById(id);
    if (!isExist) {
      throw new NotFoundException('modules.product.productNotExists');
    }
    const product = await this.productRepository.remove(id);
    return {
      id: product.id,
      deletedAt: product.deletedAt,
    };
  }
}
