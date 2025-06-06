import env from '@/shared/config/env/env';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async signAccessToken(payload: UserJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: env.ACCESS_TOKEN_SECRET,
      expiresIn: String(env.ACCESS_TOKEN_EXPIRES_IN),
      algorithm: 'HS512',
    });
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: env.ACCESS_TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }

  async signRefreshToken(payload: UserJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: String(env.REFRESH_TOKEN_EXPIRES_IN),
      algorithm: 'HS512',
    });
  }

  async verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: env.REFRESH_TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }

  expiredAccessToken = () => new Date(Date.now() + env.ACCESS_TOKEN_EXPIRES_IN);
}
