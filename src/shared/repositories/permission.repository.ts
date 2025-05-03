import { popObject } from '@/helper/popObject';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreatePermissionDto } from '@/shared/dto/permission/create-permission.dto';
import { UpdatePermissionDto } from '@/shared/dto/permission/update-permission.dto';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsUnique(findOneByPathAndMethodPermission: FindOneByPathAndMethodPermission) {
    return this.prismaService.permission.findFirst({
      where: {
        path: findOneByPathAndMethodPermission.path,
        method: findOneByPathAndMethodPermission.method,
      },
    });
  }

  async create(createPermissionDto: CreatePermissionDto) {
    const { roleIds } = popObject(createPermissionDto, 'roleIds');
    return this.prismaService.permission.create({
      data: {
        ...createPermissionDto,
        roles: {
          connect: roleIds?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAndCount(query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.permission.findMany({
        where: { deletedAt: query?.withDeleted ? undefined : null },
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prismaService.permission.count(),
    ]);
  }
  async findOneById(id: string) {
    return this.prismaService.permission.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const { roleIds } = popObject(updatePermissionDto, 'roleIds');
    return this.prismaService.permission.update({
      where: { id },
      data: {
        ...updatePermissionDto,
        roles: { set: roleIds?.map((id) => ({ id })) },
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.permission.delete({
      where: { id },
    });
  }
}
