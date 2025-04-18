import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prismaclient/index';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create = this.prismaService.user.create;
  upsert = this.prismaService.user.upsert;
  findFirst = this.prismaService.user.findFirst;
  findUnique = this.prismaService.user.findUnique;
  findMany = this.prismaService.user.findMany;
  update = this.prismaService.user.update;
  delete = this.prismaService.user.delete;
  deleteMany = this.prismaService.user.deleteMany;
  aggregate = this.prismaService.user.aggregate;
  count = this.prismaService.user.count;
  groupBy = this.prismaService.user.groupBy;
  updateMany = this.prismaService.user.updateMany;
  findUniqueOrThrow = this.prismaService.user.findUniqueOrThrow;
  findFirstOrThrow = this.prismaService.user.findFirstOrThrow;

  async exists(where?: Prisma.UserWhereInput, options?: { withDeleted?: boolean }) {
    return this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: where?.deletedAt === undefined ? (options?.withDeleted ? undefined : null) : where?.deletedAt,
      },
      select: { id: true },
    });
  }
}
