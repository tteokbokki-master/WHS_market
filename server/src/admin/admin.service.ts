import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from 'src/auth/entities/user/user';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAllUsersExcept(adminId: number) {
    return this.userRepo.find({
      where: {
        id: Not(adminId),
      },
      select: ['id', 'username', 'introduce', 'banUntil'],
    });
  }

  async updateUser(
    id: number,
    update: { introduce?: string; banUntil?: string; username?: string },
  ) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    if (update.username !== undefined) {
      user.username = update.username;
    }

    if (update.introduce !== undefined) user.introduce = update.introduce;
    if (update.banUntil !== undefined)
      user.banUntil = new Date(update.banUntil);

    return this.userRepo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return this.userRepo.remove(user);
  }

  async findAllProducts() {
    return this.productRepo.find({
      relations: ['user'],
    });
  }

  async removeProduct(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('상품을 찾을 수 없습니다.');
    return this.productRepo.remove(product);
  }
}
