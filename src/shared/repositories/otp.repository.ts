import env from '@/shared/config/env/env';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { OTPType } from '@prismaclient/index';

@Injectable()
export class OtpRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(email: string, otp: number, type: OTPType) {
    return this.prismaService.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
        type,
      },
    });
  }

  findOne(email: string, type: OTPType) {
    return this.prismaService.otp.findFirst({
      where: {
        email,
        type,
      },
    });
  }

  delete = async (email_type: { email: string; type: OTPType }) =>
    this.prismaService.otp.delete({ where: { email_type: email_type } });

  upsert(email: string, otp: number, type: OTPType) {
    return this.prismaService.otp.upsert({
      where: {
        email_type: {
          email,
          type,
        },
      },
      update: {
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
      },
      create: {
        email,
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
        type,
      },
    });
  }
}
