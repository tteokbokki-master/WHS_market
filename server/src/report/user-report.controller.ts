import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UserReportService } from './user-report.service';
import { CreateUserReportDto } from './dto/create-user-report.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('reports/users')
export class UserReportController {
  constructor(private readonly svc: UserReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateUserReportDto,
  ) {
    await this.svc.create(req.user.sub, dto);
    return { message: '유저 신고가 접수되었습니다.' };
  }
}
