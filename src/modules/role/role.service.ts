import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreateRoleDto } from '@/shared/dto/role/create-role.dto';
import { UpdateRoleDto } from '@/shared/dto/role/update-role.dto';
import { ConflictException } from '@/shared/exception/conflict.exception';
import { RoleRepository } from '@/shared/repositories/role.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleExists = await this.roleRepository.existsUnique(createRoleDto.name);
    if (roleExists) {
      throw new ConflictException('modules.role.nameExists');
    }

    const role = await this.roleRepository.create(createRoleDto);

    return {
      id: role.id,
      createdAt: role.createdAt,
    };
  }

  async findAll(query: PaginationDto) {
    const [roles, totalRecords] = await this.roleRepository.findAndCount(query);

    return {
      meta: {
        page: query.page,
        limit: query.limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / query.limit),
      },
      roles,
    };
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOneById(id);
    if (!role) {
      throw new ConflictException('modules.role.roleNotExists');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    await this.findOne(id);

    const role = await this.roleRepository.update(id, updateRoleDto);

    return {
      id: role.id,
      updatedAt: role.updatedAt,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    const role = await this.roleRepository.remove(id);

    return {
      id: role.id,
      deletedAt: new Date(),
    };
  }
}
