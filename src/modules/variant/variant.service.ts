import { FileService } from '@/modules/file/file.service';
import { FileType } from '@/shared/@types/enum/file-type.enum';
import { FOLDER_S3 } from '@/shared/@types/file-folder';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreateVariantDto } from '@/shared/dto/variant/create-variant.dto';
import { UpdateVariantDto } from '@/shared/dto/variant/update-variant.dto';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { InternalServerErrorException } from '@/shared/exception/internal-server-error.exception';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { VariantRepository } from '@/shared/repositories/variant.repository';
import { Injectable } from '@nestjs/common';
import { arrayNotEmpty } from 'class-validator';

@Injectable()
export class VariantService {
  constructor(
    private readonly variantRepository: VariantRepository,
    private readonly fileService: FileService,
  ) {}

  async create(productId: string, createVariantDto: CreateVariantDto, files: Express.Multer.File[]) {
    const exist = await this.variantRepository.exist({
      productId,
      size: createVariantDto.size,
      color: createVariantDto.color,
      material: createVariantDto.material,
    });
    if (exist) {
      throw new BadRequestException('modules.variant.variantExists');
    }
    const variant = await this.variantRepository.create(productId, createVariantDto);
    const images = await Promise.all(
      files.map(async (file) => {
        const image = await this.fileService.upload({
          file,
          folder: FOLDER_S3.product[':id'].image,
          fileType: FileType.image,
          id: variant.id,
        });
        if (!image) {
          throw new InternalServerErrorException('modules.file.uploadFailed');
        }
        return image;
      }),
    );
    await this.variantRepository.update(variant.id, { images });

    return {
      id: variant.id,
      createdAt: variant.createdAt,
    };
  }

  async findAll(query: PaginationDto) {
    const [variants, totalRecords] = await this.variantRepository.findAndCount(query);
    return {
      meta: {
        page: query.page,
        limit: query.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / query.limit),
      },
      variants,
    };
  }

  async findOne(id: string) {
    const variant = await this.variantRepository.findOneById(id);
    if (!variant) {
      throw new NotFoundException('modules.variant.variantNotExists');
    }
    return variant;
  }

  async update(id: string, updateVariantDto: UpdateVariantDto, files: Express.Multer.File[]) {
    const variant = await this.variantRepository.findOneById(id);
    if (!variant) {
      throw new NotFoundException('modules.variant.variantNotExists');
    }
    if (arrayNotEmpty(files)) {
      const images = await Promise.all(
        files.map(async (file) => {
          const image = await this.fileService.upload({
            file,
            folder: FOLDER_S3.product[':id'].image,
            fileType: FileType.image,
            id: variant.id,
          });
          if (!image) {
            throw new InternalServerErrorException('modules.file.uploadFailed');
          }
          return image;
        }),
      );
      await this.variantRepository.update(variant.id, { images });
    }
    await this.variantRepository.update(variant.id, updateVariantDto);
    return {
      id: variant.id,
      createdAt: variant.createdAt,
    };
  }

  async remove(id: string) {
    const isExist = await this.variantRepository.findOneById(id);
    if (!isExist) {
      throw new NotFoundException('modules.variant.variantNotExists');
    }
    const variant = await this.variantRepository.remove(id);
    return {
      id: variant.id,
      deletedAt: variant.deletedAt,
    };
  }
}
