import env from '@/shared/config/env/env';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: UserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: env.ACCESS_TOKEN_SECRET,
      expiresIn: Number(env.ACCESS_TOKEN_EXPIRES_IN),
      algorithm: 'HS512',
    });
  }

  verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: env.ACCESS_TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }

  signRefreshToken(payload: UserPayload) {
    return this.jwtService.signAsync(payload, {
      secret: env.REFRESH_TOKEN_SECRET,
      expiresIn: Number(env.REFRESH_TOKEN_EXPIRES_IN),
      algorithm: 'HS512',
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: env.REFRESH_TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }
}
