import { Body, Controller, Post, Query, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type JwtPayload } from './jwt/jwt.guard';
import { User as UserDecorator } from '../user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Get('check-username')
  async checkUsername(@Query('username') username: string) {
    const isTaken = await this.authService.isUsernameTaken(username);
    return { isTaken };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(dto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60,
    });

    return { message: '로그인 성공' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    });

    return { message: '로그아웃 성공' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@UserDecorator() user: JwtPayload) {
    return {
      id: user.sub,
      username: user.username,
    };
  }
}
