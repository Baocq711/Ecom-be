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

  async exists(where?: Prisma.UserWhereInput, options?: { withDeleted?: boolean }) {
    return await this.prismaService.user.findFirst({
      where: {
        ...where,
        deletedAt: where?.deletedAt === undefined ? (options?.withDeleted ? undefined : null) : where?.deletedAt,
      },
      select: { id: true },
    });
  }
}
