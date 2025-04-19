import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user/user';
import { Product } from 'src/product/entities/product.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserReport } from '../report/entities/user_report';
import { ProductReport } from '../report/entities/product_report';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, UserReport, ProductReport]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
