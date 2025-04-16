import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number; username: string };
}

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    await this.productService.create(dto, req.user);
    return { message: '상품이 성공적으로 등록되었습니다.' };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.findOne(id);
    if (!product) throw new NotFoundException('해당 상품을 찾을 수 없습니다.');
    return product;
  }
}
