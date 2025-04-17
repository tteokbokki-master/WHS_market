import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReport } from './entities/product_report';
import { User } from '../auth/entities/user/user';
import { Product } from '../product/entities/product.entity';
import { CreateProductReportDto } from './dto/create-product-report.dto';
import { Chat } from '../user-chat/entities/chat.entity';

@Injectable()
export class ProductReportService {
  constructor(
    @InjectRepository(ProductReport)
    private readonly repo: Repository<ProductReport>,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Product)
    private readonly products: Repository<Product>,

    @InjectRepository(Chat)
    private readonly chats: Repository<Chat>,
  ) {}

  async create(
    userId: number,
    dto: CreateProductReportDto,
  ): Promise<'ALREADY_REPORTED' | 'REPORTED'> {
    const reporter = await this.users.findOneBy({ id: userId });
    const product = await this.products.findOneBy({ id: dto.productId });

    if (!reporter || !product) {
      throw new BadRequestException('잘못된 요청입니다');
    }

    const exists = await this.repo.findOne({
      where: {
        reporter: { id: userId },
        product: { id: dto.productId },
      },
    });

    if (exists) throw new ConflictException('ALREADY_REPORTED');

    const entity = this.repo.create({
      content: dto.content,
      reporter,
      product,
    });
    await this.repo.save(entity);

    const reportCount = await this.repo.count({
      where: { product: { id: dto.productId } },
    });

    if (reportCount >= 5) {
      await this.chats.delete({ product: { id: dto.productId } });

      await this.repo.delete({ product: { id: dto.productId } });

      await this.products.delete({ id: dto.productId });
    }

    return 'REPORTED';
  }
}
