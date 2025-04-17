import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@/shared/guard/local-auth.guard';
import { User } from '@/shared/decorator/user.decorator';
import { Request, Response } from 'express';
import { Public } from '@/shared/decorator/public.decorator';
import { SignUpDto } from '@/shared/dto/auth/sign-up.dto';
import { GoogleOAuthGuard } from '@/shared/guard/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@User() user: UserJwtPayload, @Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return this.authService.signIn(user, res, req);
  }

  @Post('otp')
  @Public()
  async sendOtp(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }

  @Post('sign-up')
  @Public()
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
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
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    return this.authService.googleAuthentication(user, state, res);
  }
}
