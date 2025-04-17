import genOTP from '@/helper/genOTP';
import env from '@/shared/config/env/env';
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
      where: { email_provider_isDeleted: { email, isDeleted: false, provider: 'LOCAL' } },
      select: {
        id: true,
        password: true,
        provider: true,
      },
    });

    if (!user) return null;

    const { password, provider, ...userWithoutPassword } = user;
    if (provider !== 'LOCAL' || (await this.hashService.compare(pass, password))) {
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

    await this.refreshTokenRepository.update(refreshToken, existsrefreshToken.id);

    await this.refreshTokenRepository.upsert({
      where: { id: existsrefreshToken.id },
      update: { refreshToken, expiresAt: this.tokenService.expiredAccessToken() },
      create: { refreshToken, devices: userAgent, userId: user.id, expiresAt: this.tokenService.expiredAccessToken() },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return {
      accessToken,
    };
  }

  async sendOtp(email: string) {
    const { otp } = await this.otpRepository.upsert(email, genOTP(6), 'SIGNUP');

    this.mailService.sendOtp(email, otp);
  }

  async signUp({ otp, ...createUserDto }: SignUpDto) {
    if (await this.userRepository.exists({ email: createUserDto.email, provider: 'LOCAL' })) {
      throw new ConflictException('t.modules.user.emailExists');
    }

    const otpVerify = await this.otpRepository.findOne(createUserDto.email, 'SIGNUP');

    if (!otpVerify || otpVerify.otp !== otp) throw new NotFoundException('t.modules.auth.otpNotMatch');

    if (otpVerify.expiresAt < new Date(Date.now())) throw new NotFoundException('t.modules.auth.otpExpired');

    createUserDto.password = await this.hashService.hash(createUserDto.password);

    await this.userRepository.create({ data: { ...createUserDto, provider: 'LOCAL' } });

    await this.otpRepository.delete({
      email: otpVerify.email,
      type: 'SIGNUP',
    });
  }

  async googleAuthentication(
    { refreshToken: googleRefreshToken, ...user }: GoogleUser & { refreshToken: string },
    state: string,
    res: Response,
  ) {
    const redirectInfo: {
      redirectTo?: string;
      userAgent?: string;
    } = {
      redirectTo: '',
      userAgent: '',
    };
    try {
      const { userAgent, redirectTo }: GoogleState = JSON.parse(Buffer.from(state, 'base64').toString('utf-8')).state;
      redirectInfo.redirectTo = redirectTo;
      redirectInfo.userAgent = userAgent;
    } catch {
      throw new InternalServerErrorException();
    }
    const { userAgent, redirectTo } = redirectInfo;

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

    await this.refreshTokenRepository.upsert({
      where: { id: existsrefreshToken.id },
      update: { refreshToken, expiresAt: this.tokenService.expiredAccessToken() },
      create: { refreshToken, devices: userAgent, userId: userId, expiresAt: this.tokenService.expiredAccessToken() },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    res.redirect(`${env.FRONTEND_URL}/${redirectTo ?? ''}?accessToken=${accessToken}`);
  }
}
