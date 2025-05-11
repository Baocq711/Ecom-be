import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import '@/shared/config/env/env';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { TransformInterceptor } from '@/shared/inteceptor/transform.interceptor';
import cookieParser from 'cookie-parser';
import { JwtAuthGuard } from '@/shared/guard/jwt-auth.guard';
import { PermissionGuard } from '@/shared/guard/permission.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { VersioningType } from '@nestjs/common';
import { ValidateIdPipe } from '@/shared/pipes/validate-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
    new ValidateIdPipe(),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: ['1'],
  });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  const authService = app.get(AuthService);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new PermissionGuard(reflector, authService));

  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
