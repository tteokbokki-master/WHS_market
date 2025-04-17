import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReport } from './entities/product_report';
import { User } from '../auth/entities/user/user';
import { Product } from '../product/entities/product.entity';
import { CreateProductReportDto } from './dto/create-product-report.dto';

@Injectable()
export class ProductReportService {
  constructor(
    @InjectRepository(ProductReport)
    private readonly repo: Repository<ProductReport>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) {}

  async create(
    userId: number,
    dto: CreateProductReportDto,
  ): Promise<ProductReport> {
    const reporter = await this.users.findOneBy({ id: userId });
    const product = await this.products.findOneBy({ id: dto.productId });
    if (!reporter || !product)
      throw new BadRequestException('잘못된 요청입니다');
    const entity = this.repo.create({
      content: dto.content,
      reporter,
      product,
    });
    return this.repo.save(entity);
  }
}
