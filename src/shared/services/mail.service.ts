import env from '@/shared/config/env/env';
import { SendOTPDto } from '@/shared/dto/auth/send-otp.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(sendOTPDto: SendOTPDto, otp: number) {
    this.mailerService.sendMail({
      from: env.EMAIL_USER,
      to: sendOTPDto.email,
      subject: 'Your OTP code',
      context: {
        appName: env.APP_NAME,
        userName: sendOTPDto.email,
        otpCode: otp,
        expiryMinutes: env.OTP_EXPIRES_IN / 60000,
        currentYear: new Date().getFullYear(),
        supportEmail: env.EMAIL_USER,
      },
      template: sendOTPDto.otpType.toLowerCase(),
    });
  }
}
