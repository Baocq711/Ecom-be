import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import repositories from '@/shared/repositories';
import services from '@/shared/services';
import { MailerModule } from '@nestjs-modules/mailer';
import env from '@/shared/config/env/env';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheService } from './services/cache.service';
import path from 'path';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    JwtModule,
    CacheModule.register(),
    MailerModule.forRoot({
      transport: {
        host: env.EMAIL_HOST,
        secure: false,
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: path.join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [...services, ...repositories, CacheService],
  exports: [...services, ...repositories],
})
export class SharedModule {}
