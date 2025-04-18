import { RESPONSE_MESSAGE } from '@/shared/decorator/response_message.decorator';
import { I18nPath, I18nTranslations } from '@i18ntypes/i18n.generated';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const i18n = I18nContext.current<I18nTranslations>();

    const message = i18n?.t(
      (this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) || 'response.default') as I18nPath,
    ) as string;

    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message,
        data,
      })),
    );
  }
}
