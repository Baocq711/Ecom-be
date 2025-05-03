import { popObject } from '@/helper/popObject';
import { PaginationDto } from '@/shared/dto/pagination/pagination.dto';
import { CreateRoleDto } from '@/shared/dto/role/create-role.dto';
import { UpdateRoleDto } from '@/shared/dto/role/update-role.dto';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsUnique(name: string) {
    return this.prismaService.role.findFirst({
      where: {
        name,
      },
    });
  }

  async create(createRoleDto: CreateRoleDto) {
    const { permissionIds } = popObject(createRoleDto, 'permissionIds');
    return this.prismaService.role.create({
      data: {
        ...createRoleDto,
        permissions: {
          connect: permissionIds?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAndCount(query: PaginationDto) {
    return this.prismaService.$transaction([
      this.prismaService.role.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      this.prismaService.role.count(),
    ]);
  }
  async findOneById(id: string) {
    return this.prismaService.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { permissionIds } = popObject(updateRoleDto, 'permissionIds');
    return this.prismaService.role.update({
      where: { id },
      data: {
        ...updateRoleDto,
        permissions: { set: permissionIds?.map((id) => ({ id })) },
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.role.delete({
      where: { id },
    });
  }
}
