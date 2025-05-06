import { AuthService } from '@/modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '@/shared/decorator/public.decorator';
import { ForbiddenException } from '@/shared/exception/forbidden.exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const req = context.switchToHttp().getRequest();
    const user: UserJwtPayload = req.user;
    const isActivate = await this.authService.validatePermission(user, req);
    if (!isActivate) {
      throw new ForbiddenException();
    }

    return true;
  }
}
