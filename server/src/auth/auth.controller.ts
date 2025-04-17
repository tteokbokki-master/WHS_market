import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Res,
  Put,
  Req,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, type JwtPayload } from './jwt/jwt.guard';
import { User as UserDecorator } from '../user.decorator';

interface AuthenticatedRequest extends Request {
  user: { sub: number; username: string };
}

interface InfoMe extends JwtPayload {
  introduce: string;
}

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
  async getProfile(@UserDecorator() user: InfoMe) {
    const found = await this.authService.findUserById(user.sub);
    return {
      id: user.sub,
      username: user.username,
      introduce: found?.introduce,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  async updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body('newPassword') newPassword: string,
  ) {
    if (!newPassword || typeof newPassword !== 'string') {
      throw new BadRequestException('새 비밀번호를 입력해주세요.');
    }

    const isValid =
      /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        newPassword,
      );
    if (!isValid) {
      throw new BadRequestException(
        '비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.',
      );
    }

    await this.authService.updatePassword(req.user.sub, newPassword);
    return { message: '비밀번호가 변경되었습니다.' };
  }

  @UseGuards(JwtAuthGuard)
  @Put('introduce')
  async updateIntroduce(
    @Req() req: AuthenticatedRequest,
    @Body('introduce') introduce: string,
  ) {
    if (introduce === undefined || typeof introduce !== 'string') {
      throw new BadRequestException('자기소개 내용을 입력해주세요.');
    }

    await this.authService.updateIntroduce(req.user.sub, introduce);
    return { message: '자기소개가 수정되었습니다.' };
  }

  @Get('profile/:id')
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getPublicProfile(id);
  }
}
