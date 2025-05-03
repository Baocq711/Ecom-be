import { OTPType } from '@prismaclient/index';

export {};
declare global {
  interface CreateOtp {
    email: string;
    otp: number;
    otpType: OTPType;
  }

  interface FindOneOtp {
    email: string;
    otpType: OTPType;
  }
}
