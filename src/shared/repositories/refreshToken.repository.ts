import env from '@/shared/config/env/env';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRefreshToken: CreateRefreshToken) {
    return this.prismaService.refreshToken.create({
      data: {
        device: createRefreshToken.device,
        ip: createRefreshToken.ip,
        userId: createRefreshToken.userId,
        refreshToken: createRefreshToken.refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
      },
      select: {
        id: true,
      },
    });
  }

  findByToken(refreshToken: string) {
    return this.prismaService.refreshToken.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  update(updateRefreshToken: UpdateRefreshToken) {
    return this.prismaService.refreshToken.update({
      where: { id: updateRefreshToken.refreshTokenId },
      data: {
        refreshToken: updateRefreshToken.refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN),
      },
    });
  }

  delete(refreshTokenId: string) {
    return this.prismaService.refreshToken.delete({
      where: { id: refreshTokenId },
    });
  }

  deleteByDevice(device: Omit<CreateRefreshToken, 'refreshToken'>) {
    return this.prismaService.refreshToken.deleteMany({
      where: {
        userId: device.userId,
        device: device.device,
        ip: device.ip,
      },
    });
  }

  exists(existsRefreshToken: ExistRefreshToken) {
    return this.prismaService.refreshToken.findFirst({
      where: {
        userId: existsRefreshToken.userId,
        device: existsRefreshToken.device,
        ip: existsRefreshToken.ip,
      },
    });
  }
}
