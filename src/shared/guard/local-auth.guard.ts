import { UnauthorizedException } from '@/shared/exception/unauthorized.exception';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('modules.auth.missingCredentials');
    }
    return user;
  }
}
