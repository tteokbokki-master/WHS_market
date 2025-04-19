import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user/user';
import { Product } from 'src/product/entities/product.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
