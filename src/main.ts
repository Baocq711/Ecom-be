import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import '@/shared/config/env/env';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { TransformInterceptor } from '@/shared/inteceptor/transform.interceptor';
import cookieParser from 'cookie-parser';
import { JwtAuthGuard } from '@/shared/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
