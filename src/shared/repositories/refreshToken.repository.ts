import env from '@/shared/config/env/env';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(refreshToken: string, userId: string, params?: Partial<Record<string, string>>) {
    return this.prismaService.refreshToken.create({
      data: {
        ...params,
        refreshToken: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
        devices: params?.devices || '',
      },
    });
  }

  upsert = this.prismaService.refreshToken.upsert;

  findByToken(token: string) {
    return this.prismaService.refreshToken.findFirst({
      where: {
        refreshToken: token,
      },
    });
  }

  update(refreshToken: string, refreshTokenId: string, params?: Partial<Record<string, string>>) {
    if (!refreshTokenId) return null;

    return this.prismaService.refreshToken.update({
      where: { id: refreshTokenId },
      data: {
        ...params,
        refreshToken: refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
      },
    });
  }

  delete(id: string) {
    return this.prismaService.refreshToken.delete({
      where: { id },
    });
  }

  exists(devices: string, userId: string) {
    return this.prismaService.refreshToken.findFirst({
      where: {
        devices,
        userId,
      },
      select: {
        id: true,
      },
    });
  }
}
