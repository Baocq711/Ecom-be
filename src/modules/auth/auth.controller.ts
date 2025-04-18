import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@/shared/guard/local-auth.guard';
import { User } from '@/shared/decorator/user.decorator';
import { Request, Response } from 'express';
import { Public } from '@/shared/decorator/public.decorator';
import { SignUpDto } from '@/shared/dto/auth/sign-up.dto';
import { GoogleOAuthGuard } from '@/shared/guard/google-auth.guard';
import { SendOTPDto } from '@/shared/dto/auth/send-otp.dto';
import { ForgotPasswordDto } from '@/shared/dto/auth/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp')
  @Public()
  async sendOtp(@Body() body: SendOTPDto) {
    return this.authService.sendOtp(body.email, body.type);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Get('google')
  @Public()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Req() req) {
    console.log(req);
  }

  @Get('google/callback')
  @Public()
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(
    @User() user: GoogleUser & { refreshToken: string },
    @Query('state') stateString: string,
    @Res() res: Response,
  ) {
    return this.authService.googleAuthentication(user, stateString, res);
  }

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@User() user: UserJwtPayload, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.signIn(user, res, req);
  }

  @Post('sign-out')
  async signOut(@User() user: UserJwtPayload, @Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(user.id, res);
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }
}
