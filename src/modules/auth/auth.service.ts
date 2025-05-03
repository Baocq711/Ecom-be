import genOTP from '@/helper/genOTP';
import { COOKIE_KEY } from '@/shared/@types/enum';
import env from '@/shared/config/env/env';
import { ForgotPasswordDto } from '@/shared/dto/auth/forgot-password.dto';
import { SendOTPDto } from '@/shared/dto/auth/send-otp.dto';
import { SignUpDto } from '@/shared/dto/auth/sign-up.dto';
import { ConflictException } from '@/shared/exception/conflict.exception';
import { InternalServerErrorException } from '@/shared/exception/internal-server-error.exception';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { OtpRepository } from '@/shared/repositories/otp.repository';
import { RefreshTokenRepository } from '@/shared/repositories/refreshToken.repository';
import { UserRepository } from '@/shared/repositories/user.repository';
import { CacheService } from '@/shared/services/cache.service';
import { HashService } from '@/shared/services/hash.service';
import { TokenService } from '@/shared/services/jwt.service';
import { MailService } from '@/shared/services/mail.service';
import { Injectable } from '@nestjs/common';
import { OTPType, Provider } from '@prismaclient/index';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly otpRepository: OtpRepository,
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly cacheService: CacheService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userRepository.validateUser({
      email,
      provider: Provider.LOCAL,
    });

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    if (!(await this.hashService.compare(pass, password))) {
      return null;
    }
    return userWithoutPassword;
  }

  async signIn(user: UserJwtPayload, { device, ip }: ClientInfo, res: Response) {
    const [existsrefreshToken, accessToken, refreshToken] = await Promise.all([
      this.refreshTokenRepository.exists({
        userId: user.id,
        device,
        ip,
      }),
      this.tokenService.signAccessToken({
        id: user.id,
      }),
      this.tokenService.signRefreshToken({
        id: user.id,
      }),
    ]);

    if (!existsrefreshToken) {
      await this.refreshTokenRepository.create({
        refreshToken,
        device,
        ip,
        userId: user.id,
      });
    } else {
      await this.refreshTokenRepository.update({
        refreshToken,
        refreshTokenId: existsrefreshToken.id,
      });
    }

    await this.cacheService.setAccessToken(user.id, accessToken);
    res.cookie(COOKIE_KEY.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
    };
  }

  async sendOtp(sendOTPDto: SendOTPDto) {
    const { otp } = await this.otpRepository.upsert(sendOTPDto, genOTP(6));
    this.mailService.sendOtp(sendOTPDto, otp);
  }

  async signUp(signUpDto: SignUpDto) {
    const provider: Provider = Provider.LOCAL;
    const otpType: OTPType = OTPType.SIGNUP;

    if (await this.userRepository.findByEmail({ email: signUpDto.email, provider })) {
      throw new ConflictException('modules.user.emailExists');
    }

    await this.otpRepository.verify({ email: signUpDto.email, otpType }, signUpDto.otp);

    await Promise.all([
      this.userRepository.create(
        { email: signUpDto.email, password: signUpDto.password, name: signUpDto.name },
        provider,
      ),
      this.otpRepository.delete({
        email: signUpDto.email,
        otpType,
      }),
    ]);
  }

  async googleAuthentication(
    { refreshToken: googleRefreshToken, ...googleUser }: GoogleUser & { refreshToken: string },
    stateString: string,
    res: Response,
  ) {
    try {
      const state: GoogleState = JSON.parse(Buffer.from(stateString, 'base64').toString('utf-8')).state;

      const user = await this.userRepository.upsertByEmail(
        { email: googleUser.email, provider: Provider.GOOGLE },
        {
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.avatar,
          provider: googleUser.provider,
          refreshTokenProvider: googleRefreshToken,
        },
        {
          name: googleUser.name,
          avatar: googleUser.avatar,
          refreshTokenProvider: googleRefreshToken,
        },
      );

      const accessToken = await this.signIn(
        {
          id: user.id,
        },
        {
          device: state.device,
          ip: state.ip,
        },
        res,
      );

      res.redirect(`${env.FRONTEND_URL}/${state.redirectTo ?? ''}?accessToken=${accessToken}`);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async signOut(userId: string, res: Response) {
    await Promise.all([this.refreshTokenRepository.delete(userId), this.cacheService.delAccessToken(userId)]);
    res.clearCookie(COOKIE_KEY.REFRESH_TOKEN);
  }

  async forgotPassword({ email, otp, confirmPassword, password }: ForgotPasswordDto) {
    const provider: Provider = Provider.LOCAL;
    const otpType: OTPType = OTPType.FORGOT_PASSWORD;

    const user = await this.userRepository.findByEmail({ email, provider });
    if (!user) {
      throw new NotFoundException('modules.user.emailNotExists');
    }

    await this.otpRepository.verify({ email, otpType }, otp);

    if (password !== confirmPassword) {
      throw new ConflictException('modules.auth.confirmPasswordNotMatch');
    }

    await Promise.all([
      this.userRepository.updatePassword(user.id, password),
      this.otpRepository.delete({ email, otpType }),
    ]);
  }
}
