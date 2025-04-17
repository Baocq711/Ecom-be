import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable, Req } from '@nestjs/common';
import env from '@/shared/config/env/env';
import { Request } from 'express';
import { Provider } from '@prismaclient/index';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://${env.HOST}:${env.PORT}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  authorizationParams(): object {
    return {
      access_type: 'offline',
      prompt: 'consent select_account',
    };
  }

  authenticate(@Req() req: Request): void {
    const ip = req.ips.length > 0 ? req.ips[0] : req.ip;
    const userAgent = req.headers['user-agent'];
    const query = req.query && Object.keys(req.query).length > 0 ? req.query : undefined;
    const state = {
      ip,
      userAgent,
      ...query,
    };
    const stateString = Buffer.from(
      JSON.stringify({
        state,
      }),
    ).toString('base64');
    return super.authenticate(req, { state: stateString });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const user: GoogleUser = {
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos[0].value,
      provider: profile.provider.toUpperCase() as Provider,
    };

    return {
      refreshToken,
      ...user,
    };
  }
}
