import { InitRoleName } from '@/shared/@types/enum';
import env from '@/shared/config/env/env';
import { CacheService } from '@/shared/services/cache.service';
import { HashService } from '@/shared/services/hash.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { initPermissions } from '@i18ntypes/init.generated';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class InitService implements OnModuleInit {
  private readonly logger = new Logger(InitService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
    private readonly cacheService: CacheService,
  ) {}

  async onModuleInit() {
    this.logger.log('Service initializing...');
    await this.cacheService.clear();
    await this.initRoles();
    await this.initPermissions();
    await this.initUser();

    const userRole = await this.prismaService.role.findFirst({
      where: { name: InitRoleName.USER },
    });
    const adminRole = await this.prismaService.role.findFirst({
      where: { name: InitRoleName.ADMIN },
    });

    await this.cachePermissions(userRole!.id);
    await this.cachePermissions(adminRole!.id);
    this.logger.log('InitService initialized');
  }

  initRoles = async () => {
    const isInitRoleExist = await this.prismaService.role.findMany({
      where: { OR: [{ name: InitRoleName.ADMIN }, { name: InitRoleName.USER }] },
    });

    if (isInitRoleExist.length === 0) {
      await this.prismaService.role.createMany({
        data: [
          {
            name: InitRoleName.ADMIN,
            description: 'Admin role',
          },
          {
            name: InitRoleName.USER,
            description: 'User role',
          },
        ],
      });

      this.logger.log(`Roles initialized: Admin, User`);
    } else if (isInitRoleExist.length === 1) {
      const role = isInitRoleExist[0].name === InitRoleName.ADMIN ? InitRoleName.USER : InitRoleName.ADMIN;
      const newRole = await this.prismaService.role.create({
        data: {
          name: role,
          description: `${role} role`,
        },
      });

      this.logger.log(`Role initialized: ${newRole.name}`);
    } else {
      this.logger.log(`Roles already initialized`);
    }

    await this.cacheService.setUserRoleId(
      (await this.prismaService.role.findFirst({ where: { name: InitRoleName.USER } }))!.id,
    );
  };

  initPermissions = async () => {
    const initRole = await this.prismaService.role.findMany({
      where: { OR: [{ name: InitRoleName.ADMIN }, { name: InitRoleName.USER }] },
    });

    const adminRole = initRole.find((role) => role.name === InitRoleName.ADMIN);

    if ((await this.prismaService.permission.count()) > 0) {
      this.logger.log(`Permissions already initialized`);
      return;
    }

    const permissions = await this.prismaService.permission.createManyAndReturn({
      data: initPermissions,
    });

    await this.prismaService.role.update({
      where: {
        id: adminRole!.id,
        OR: [{ name: InitRoleName.ADMIN }],
      },
      data: {
        permissions: {
          set: permissions.map((permission) => ({ id: permission.id })),
        },
      },
    });
    this.logger.log(`Permissions initialized`);
  };

  initUser = async () => {
    const isAdminExist = await this.prismaService.user.findFirst({
      where: { email: env.INIT_ADMIN_USERNAME },
    });
    const isUserExist = await this.prismaService.user.findFirst({
      where: { email: env.INIT_USER_USERNAME },
    });

    if (!isAdminExist) {
      const adminRole = await this.prismaService.role.findFirst({
        where: { name: InitRoleName.ADMIN },
      });

      await this.prismaService.user.create({
        data: {
          email: env.INIT_ADMIN_USERNAME,
          password: await this.hashService.hash(env.INIT_PASSWORD),
          name: env.INIT_ADMIN_USERNAME.split('@')[0],
          provider: 'LOCAL',
          roleId: adminRole!.id,
        },
      });
      this.logger.log(`Admin initialized`);
    } else {
      this.logger.log(`Admin already initialized`);
    }

    if (!isUserExist) {
      const userRole = await this.prismaService.role.findFirst({
        where: { name: InitRoleName.USER },
      });

      await this.prismaService.user.create({
        data: {
          email: env.INIT_USER_USERNAME,
          password: await this.hashService.hash(env.INIT_PASSWORD),
          name: env.INIT_USER_USERNAME.split('@')[0],
          provider: 'LOCAL',
          roleId: userRole!.id,
        },
      });
      this.logger.log(`User initialized`);
    } else {
      this.logger.log(`User already initialized`);
    }
  };

  cachePermissions = async (roleId: string) => {
    const permissions = await this.prismaService.permission.findMany({
      select: {
        path: true,
        method: true,
      },
      where: {
        roles: {
          some: {
            id: roleId,
          },
        },
      },
    });
    await this.cacheService.setPermissions(roleId, permissions);
  };
}
