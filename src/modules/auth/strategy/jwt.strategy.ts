import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import env from '@/shared/config/env/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.ACCESS_TOKEN_SECRET,
      algorithms: ['HS512'],
    });
  }

  async validate(payload: UserJwtPayload & JwtPayload) {
    delete payload.iat;
    delete payload.exp;
    return payload;
  }
}
