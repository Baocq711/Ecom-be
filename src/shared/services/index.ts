import { HashService } from '@/shared/services/hash.service';
import { PrismaService } from '@/shared/services/prisma.service';
import { TokenService } from '@/shared/services/jwt.service';
import { Provider } from '@nestjs/common';
import { MailService } from '@/shared/services/mail.service';
import { CacheService } from '@/shared/services/cache.service';

const services = [PrismaService, HashService, TokenService, MailService, CacheService] as Provider[];
export default services;
