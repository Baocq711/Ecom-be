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
    // Truy cập đường link hoặc refresh đường link sau khi đăng nhập google
    if (err) throw new ForbiddenException();
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
