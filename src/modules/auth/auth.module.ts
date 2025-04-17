import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '@/modules/auth/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy';
import { GoogleStrategy } from '@/modules/auth/strategy/google.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
