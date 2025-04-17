import { ForbiddenException } from '@/shared/exception/forbidden.exception';
import { UnauthorizedException } from '@/shared/exception/unauthorized.exception';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor() {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err) throw new ForbiddenException();
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
