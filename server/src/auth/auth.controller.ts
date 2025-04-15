import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

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
}
