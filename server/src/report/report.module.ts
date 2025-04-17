import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReport } from './entities/product_report';
import { UserReport } from './entities/user_report';
import { ProductReportService } from './product-report.service';
import { UserReportService } from './user-report.service';
import { ProductReportController } from './product-report.controller';
import { UserReportController } from './user-report.controller';
import { User } from '../auth/entities/user/user';
import { Product } from '../product/entities/product.entity';
import { Chat } from 'src/user-chat/entities/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductReport, User, Product, Chat]),
    TypeOrmModule.forFeature([UserReport, User]),
  ],
  controllers: [ProductReportController, UserReportController],
  providers: [ProductReportService, UserReportService],
})
export class ReportModule {}
