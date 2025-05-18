import { CreateUserDto } from '@/shared/dto/user/create-user.dto';
import { CacheService } from '@/shared/services/cache.service';
import { HashService } from '@/shared/services/hash.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Provider } from '@prismaclient/index';

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
    private readonly cacheService: CacheService,
  ) {}
  private readonly getUserRole = () => this.cacheService.getUserRoleId();

  async validateUser(user: SignInUser) {
    const { email, provider } = user;
    return this.prismaService.user.findFirst({
      where: {
        email: email,
        provider: provider,
        deletedAt: null,
      },
      select: {
        id: true,
        password: true,
        roleId: true,
      },
    });
  }

  async findByEmail(findByEmailUser: FindByEmailUser) {
    return this.prismaService.user.findFirst({
      where: {
        email: findByEmailUser.email,
        provider: findByEmailUser.provider,
        deletedAt: null,
      },
    });
  }

  async create(createUserDto: CreateUserDto, provider: Provider) {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: await this.hashService.hash(createUserDto.password),
        name: createUserDto.name,
        provider,
        role: {
          connect: {
            id: (await this.getUserRole())!,
          },
        },
        cart: {
          create: {},
        },
      },
    });
  }

  async upsertByEmail(
    findByEmailUser: FindByEmailUser,
    createUserByGoogle: CreateUserByGoogle,
    updateUserByGoogle: UpdateUserByGoogle,
  ) {
    const userExist = await this.findByEmail({
      email: findByEmailUser.email,
      provider: findByEmailUser.provider,
    });

    if (!userExist) {
      return this.prismaService.user.create({
        data: {
          email: createUserByGoogle.email,
          name: createUserByGoogle.name,
          provider: createUserByGoogle.provider,
          avatar: createUserByGoogle.avatar,
          refreshTokenProvider: createUserByGoogle.refreshTokenProvider,
          password: '',
          role: {
            connect: {
              id: (await this.getUserRole())!,
            },
          },
        },
      });
    } else {
      return this.prismaService.user.update({
        where: {
          id: userExist.id,
        },
        data: {
          name: updateUserByGoogle.name,
          avatar: updateUserByGoogle.avatar,
          refreshTokenProvider: updateUserByGoogle.refreshTokenProvider,
        },
      });
    }
  }

  async updatePassword(id: string, password: string) {
    return this.prismaService.user.update({
      where: {
        id,
        deletedAt: null,
      },
      data: {
        password: await this.hashService.hash(password),
      },
    });
  }

  async findOneById(id: string) {
    return this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
      include: {
        cart: true,
      },
      omit: {
        password: true,
        refreshTokenProvider: true,
        roleId: true,
      },
    });
  }
}
