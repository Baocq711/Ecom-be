import { Global, Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';
import { HashService } from './service/hash.service';
import { TokenService } from './service/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  providers: [PrismaService, HashService, TokenService],
  exports: [PrismaService, HashService, TokenService],
})
export class SharedModule {}
ư;
