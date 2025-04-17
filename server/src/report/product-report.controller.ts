import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ProductReportService } from './product-report.service';
import { CreateProductReportDto } from './dto/create-product-report.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('reports/products')
export class ProductReportController {
  constructor(private readonly svc: ProductReportService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() dto: CreateProductReportDto,
  ) {
    await this.svc.create(req.user.sub, dto);
    return { message: '상품 신고가 접수되었습니다.' };
  }
}
