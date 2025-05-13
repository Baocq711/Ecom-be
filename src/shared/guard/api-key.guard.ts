import env from '@/shared/config/env/env';
import { UnauthorizedException } from '@/shared/exception/unauthorized.exception';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization'].split(' ')[1];
    if (!apiKey || apiKey !== env.API_KEY) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
