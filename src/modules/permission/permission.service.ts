import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreatePermissionDto } from '@/shared/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from '@/shared/dto/permission/update-permission.dto';
import { ConflictException } from '@/shared/exception/conflict.exception';
import { PermissionRepository } from '@/shared/repositories/permission.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permissionExists = await this.permissionRepository.existsUnique({
      path: createPermissionDto.path,
      method: createPermissionDto.method,
    });
    if (permissionExists) {
      throw new ConflictException('modules.permission.permissionExists');
    }

    const permission = await this.permissionRepository.create(createPermissionDto);

    return {
      id: permission.id,
      createdAt: permission.createdAt,
    };
  }

  async findAll(query: PaginationDto) {
    const [permissions, totalRecords] = await this.permissionRepository.findAndCount(query);

    return {
      meta: {
        page: query.page,
        limit: query.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / query.limit),
      },
      permissions,
    };
  }

  async findOne(id: string) {
    const permission = await this.permissionRepository.findOneById(id);
    if (!permission) {
      throw new ConflictException('modules.permission.permissionNotExists');
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    await this.findOne(id);

    const permission = await this.permissionRepository.update(id, updatePermissionDto);
    return {
      id: permission.id,
      updatedAt: permission.updatedAt,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    const permission = await this.permissionRepository.remove(id);

    return {
      id: permission.id,
      deletedAt: new Date(),
    };
  }
}
