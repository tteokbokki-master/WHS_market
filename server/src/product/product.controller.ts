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
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { StorageEngine, diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number; username: string };
}

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const originalName = file.originalname ?? 'unnamed';
    const ext = extname(originalName);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const finalName = `${uniqueName}${ext}`;
    cb(null, finalName);
  },
}) as StorageEngine;

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
    @Req() req: AuthenticatedRequest,
  ) {
    dto.imageUrl = `/uploads/${file.filename}`;
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
