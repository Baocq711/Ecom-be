import env from '@/shared/config/env/env';
import { SendOTPDto } from '@/shared/dto/auth/send-otp.dto';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOtp: CreateOtp) {
    return this.prismaService.otp.create({
      data: {
        email: createOtp.email,
        otp: createOtp.otp,
        otpType: createOtp.otpType,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
      },
    });
  }

  async findOne(findOneOtp: FindOneOtp) {
    return this.prismaService.otp.findFirst({
      where: {
        email: findOneOtp.email,
        otpType: findOneOtp.otpType,
      },
    });
  }

  async delete(findOneOtp: FindOneOtp) {
    return this.prismaService.otp.delete({ where: { email_otpType: findOneOtp } });
  }

  async upsert(sendOTPDto: SendOTPDto, otp: number) {
    return this.prismaService.otp.upsert({
      where: {
        email_otpType: {
          email: sendOTPDto.email,
          otpType: sendOTPDto.otpType,
        },
      },
      update: {
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
      },
      create: {
        email: sendOTPDto.email,
        otpType: sendOTPDto.otpType,
        otp,
        expiresAt: new Date(Date.now() + env.OTP_EXPIRES_IN),
      },
    });
  }

  async verify(sendOTPDto: SendOTPDto, otp: number) {
    const otpVerify = await this.prismaService.otp.findFirst({
      where: {
        email: sendOTPDto.email,
        otpType: sendOTPDto.otpType,
      },
    });

    if (!otpVerify) throw new NotFoundException('modules.user.emailNotExists');
    if (otpVerify.otp !== otp) throw new NotFoundException('modules.auth.otpNotMatch');

    if (otpVerify.expiresAt < new Date(Date.now())) throw new NotFoundException('modules.auth.otpExpired');
  }
}
