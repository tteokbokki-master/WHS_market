import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../auth/entities/user/user';

export interface ProductDetailResponse {
  id: number;
  title: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  userId: number;
  username: string;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(
    dto: CreateProductDto,
    payload: { sub: number },
  ): Promise<Product> {
    const user = await this.userRepo.findOneBy({ id: payload.sub });

    if (!user) throw new Error('유저가 존재하지 않습니다');

    const product = this.productRepo.create({
      ...dto,
      user,
    });

    return this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(id: number): Promise<ProductDetailResponse | null> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!product) return null;

    return {
      id: product.id,
      title: product.title,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      userId: product.user.id,
      username: product.user.username,
    };
  }

  async findMyProducts(userId: number): Promise<Product[]> {
    return this.productRepo.find({
      where: { user: { id: userId } },
    });
  }

  async deleteProduct(id: number, userId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');
    if (product.user.id !== userId)
      throw new ForbiddenException('삭제 권한이 없습니다.');

    await this.productRepo.delete(id);
    return { message: '상품이 삭제되었습니다.' };
  }

  async searchProducts(query: string) {
    return this.productRepo.find({
      where: {
        title: ILike(`%${query}%`),
      },
    });
  }
}
