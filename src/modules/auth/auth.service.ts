import genOTP from '@/helper/genOTP';
import { removeApiPrefix } from '@/helper/removePrefix';
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
import { InitService } from '@/shared/services/init.service';
import { TokenService } from '@/shared/services/jwt.service';
import { MailService } from '@/shared/services/mail.service';
import { Injectable } from '@nestjs/common';
import { OTPType, Provider } from '@prismaclient/index';
import { Request, Response } from 'express';

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
    private readonly initService: InitService,
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

  async validatePermission(user: UserJwtPayload, req: Request) {
    const permissions = await this.cacheService.getPermissions(user.roleId);
    if (!permissions) {
      await this.initService.cachePermissions(user.roleId);
      return this.validatePermission(user, req);
    }
    const method = req.method.toUpperCase();
    const url = removeApiPrefix(req.route.path);
    return permissions.some((permission) => method === permission.method && url === permission.path);
  }

  async signIn(user: UserJwtPayload, { device, ip }: ClientInfo, res: Response) {
    const [existsrefreshToken, accessToken, refreshToken] = await Promise.all([
      this.refreshTokenRepository.exists({
        userId: user.id,
        device,
        ip,
      }),
      this.tokenService.signAccessToken(user),
      this.tokenService.signRefreshToken(user),
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
    const provider: Provider = Provider.LOCAL;
    if (await this.userRepository.findByEmail({ email: sendOTPDto.email, provider })) {
      throw new ConflictException('modules.user.emailExists');
    }

    const { otp } = await this.otpRepository.upsert(sendOTPDto, genOTP(6));
    this.mailService.sendOtp(sendOTPDto, otp);
  }

  async signUp(signUpDto: SignUpDto, clientInfo: ClientInfo, res: Response) {
    const provider: Provider = Provider.LOCAL;
    const otpType: OTPType = OTPType.SIGNUP;

    if (await this.userRepository.findByEmail({ email: signUpDto.email, provider })) {
      throw new ConflictException('modules.user.emailExists');
    }

    await this.otpRepository.verify({ email: signUpDto.email, otpType }, signUpDto.otp);

    const [user] = await Promise.all([
      this.userRepository.create(
        { email: signUpDto.email, password: signUpDto.password, name: signUpDto.name },
        provider,
      ),
      this.otpRepository.delete({
        email: signUpDto.email,
        otpType,
      }),
    ]);

    return this.signIn({ id: user.id, roleId: user.roleId }, clientInfo, res);
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

      const { accessToken } = await this.signIn(
        { id: user.id, roleId: user.roleId },
        { device: state.userAgent, ip: state.ip },
        res,
      );

      res.redirect(`${env.FRONTEND_URL}/${state.redirectTo ?? ''}?accessToken=${accessToken}`);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async getProfile(user: UserJwtPayload) {
    return this.userRepository.findOneById(user.id);
  }

  async signOut(refreshToken: string, clientInfo: ClientInfo, res: Response) {
    const userId = (await this.tokenService.verifyRefreshToken(refreshToken)).id;
    await Promise.all([
      this.refreshTokenRepository.deleteByDevice({
        userId,
        ...clientInfo,
      }),
      this.cacheService.delAccessToken(userId),
    ]);
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
