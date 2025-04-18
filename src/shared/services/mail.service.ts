import env from '@/shared/config/env/env';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OTPType } from '@prismaclient/index';
import { Address } from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(to: string | Address, otp: number, type: OTPType) {
    this.mailerService.sendMail({
      from: env.EMAIL_USER,
      to,
      subject: 'Your OTP code',
      context: {
        appName: env.APP_NAME,
        userName: to,
        otpCode: otp,
        expiryMinutes: env.OTP_EXPIRES_IN / 60000,
        currentYear: new Date().getFullYear(),
        supportEmail: env.EMAIL_USER,
      },
      template: type.toLowerCase(),
    });
  }
}
