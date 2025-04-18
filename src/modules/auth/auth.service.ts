import genOTP from '@/helper/genOTP';
import { ResponseCookieFormat } from '@/shared/@types/enum';
import env from '@/shared/config/env/env';
import { ForgotPasswordDto } from '@/shared/dto/auth/forgot-password.dto';
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
import { Request, Response } from 'express';
import { v7 } from 'uuid';

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
    const user = await this.userRepository.findUnique({
      where: { email_provider_isDeleted: { email, isDeleted: false, provider: Provider.LOCAL } },
      select: {
        id: true,
        password: true,
        provider: true,
      },
    });

    if (!user) return null;

    const { password, provider, ...userWithoutPassword } = user;
    if (provider !== Provider.LOCAL || (await this.hashService.compare(pass, password))) {
      return userWithoutPassword;
    }

    return null;
  }

  async signIn(user: UserJwtPayload, res: Response, req: Request) {
    const userAgent = req.headers['user-agent'] as string;
    const existsrefreshToken = (await this.refreshTokenRepository.exists(userAgent, user.id)) || { id: v7() };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ ...user, refreshTokenId: existsrefreshToken.id }),
      this.tokenService.signRefreshToken({ ...user, refreshTokenId: existsrefreshToken.id }),
    ]);

    await Promise.all([
      this.refreshTokenRepository.upsert({
        where: { id: existsrefreshToken.id },
        update: { refreshToken, expiresAt: this.tokenService.expiredAccessToken() },
        create: {
          refreshToken,
          devices: userAgent,
          userId: user.id,
          expiresAt: this.tokenService.expiredAccessToken(),
        },
      }),
      this.cacheService.setAccessToken(user.id, accessToken),
    ]);
    res.cookie(ResponseCookieFormat.refreshToken, refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
    };
  }

  async sendOtp(email: string, type: OTPType) {
    const { otp } = await this.otpRepository.upsert(email, genOTP(6), type);

    this.mailService.sendOtp(email, otp, type);
  }

  async signUp({ otp, ...createUserDto }: SignUpDto) {
    const provider: Provider = Provider.LOCAL;
    const otpType: OTPType = OTPType.SIGNUP;

    if (await this.userRepository.exists({ email: createUserDto.email, provider })) {
      throw new ConflictException('modules.user.emailExists');
    }

    await this.otpRepository.verify(createUserDto.email, otp, otpType);

    createUserDto.password = await this.hashService.hash(createUserDto.password);

    await Promise.all([
      this.userRepository.create({ data: { ...createUserDto, provider } }),
      this.otpRepository.delete({
        email: createUserDto.email,
        type: otpType,
      }),
    ]);
  }

  async googleAuthentication(
    { refreshToken: googleRefreshToken, ...user }: GoogleUser & { refreshToken: string },
    stateString: string,
    res: Response,
  ) {
    const state: {
      redirectTo?: string;
      userAgent?: string;
    } = {
      redirectTo: '',
      userAgent: '',
    };
    try {
      const { userAgent, redirectTo }: GoogleState = JSON.parse(
        Buffer.from(stateString, 'base64').toString('utf-8'),
      ).state;
      state.redirectTo = redirectTo;
      state.userAgent = userAgent;
    } catch {
      throw new InternalServerErrorException();
    }
    const { userAgent, redirectTo } = state;

    const { id: userId } = await this.userRepository.upsert({
      where: {
        email_provider_isDeleted: {
          email: user.email,
          provider: user.provider,
          isDeleted: false,
        },
      },
      update: {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        refreshTokenProvider: googleRefreshToken,
      },
      create: {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        provider: user.provider,
        password: '',
        refreshTokenProvider: googleRefreshToken,
      },
      select: {
        id: true,
      },
    });

    const existsrefreshToken = (await this.refreshTokenRepository.exists(userAgent, userId)) || {
      id: v7(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken({ id: userId, refreshTokenId: existsrefreshToken.id }),
      this.tokenService.signRefreshToken({ id: userId, refreshTokenId: existsrefreshToken.id }),
    ]);

    await Promise.all([
      this.refreshTokenRepository.upsert({
        where: { id: existsrefreshToken.id },
        update: { refreshToken, expiresAt: this.tokenService.expiredAccessToken() },
        create: { refreshToken, devices: userAgent, userId: userId, expiresAt: this.tokenService.expiredAccessToken() },
      }),
      this.cacheService.setAccessToken(userId, accessToken),
    ]);

    res.cookie(ResponseCookieFormat.refreshToken, refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    res.redirect(`${env.FRONTEND_URL}/${redirectTo ?? ''}?accessToken=${accessToken}`);
  }

  async signOut(userId: string, res: Response) {
    await Promise.all([this.refreshTokenRepository.delete(userId), this.cacheService.delAccessToken(userId)]);
    res.clearCookie(ResponseCookieFormat.refreshToken);
  }

  async forgotPassword({ email, otp, confirmPassword, password }: ForgotPasswordDto) {
    const provider: Provider = Provider.LOCAL;
    const otpType: OTPType = OTPType.FORGOT_PASSWORD;

    const user = await this.userRepository.exists({ email, provider });
    if (!user) {
      throw new NotFoundException('modules.user.emailNotExists');
    }

    await this.otpRepository.verify(email, otp, otpType);

    if (password !== confirmPassword) {
      throw new ConflictException('modules.auth.confirmPasswordNotMatch');
    }

    await Promise.all([
      this.userRepository.update({
        where: { id: user.id },
        data: {
          password: await this.hashService.hash(password),
        },
      }),
      this.otpRepository.delete({ email, type: otpType }),
    ]);
  }
}
