import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Request } from 'express';
import { User } from '../auth/entities/user/user';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateReportDto) {
    const reporter = { id: req.user.sub } as User;
    await this.reportService.create(dto, reporter);
    return { message: '신고가 접수되었습니다.' };
  }
}
