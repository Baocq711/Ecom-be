import env from '@/shared/config/env/env';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { OTPType } from '@prismaclient/index';

@Injectable()
export class OtpRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(email: string, otp: number, type: OTPType) {
    return this.prismaService.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
        type,
      },
    });
  }

  async findOne(email: string, type: OTPType) {
    return this.prismaService.otp.findFirst({
      where: {
        email,
        type,
      },
    });
  }

  async delete(email_type: { email: string; type: OTPType }) {
    return this.prismaService.otp.delete({ where: { email_type: email_type } });
  }

  async upsert(email: string, otp: number, type: OTPType) {
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

  async verify(email: string, otp: number, type: OTPType) {
    const otpVerify = await this.prismaService.otp.findFirst({ where: { email, type } });

    if (!otpVerify || otpVerify.otp !== otp) throw new NotFoundException('modules.auth.otpNotMatch');

    if (otpVerify.expiresAt < new Date(Date.now())) throw new NotFoundException('modules.auth.otpExpired');
  }
}
