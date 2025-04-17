import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from '../auth/entities/user/user';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateReportDto, reporter: User): Promise<Report> {
    const reported = await this.userRepo.findOneBy({ id: dto.reportedUserId });
    if (!reported)
      throw new NotFoundException('신고 대상 사용자를 찾을 수 없습니다.');

    const report = this.reportRepo.create({
      content: dto.content,
      reporter,
      reported,
      productId: dto.productId,
    });

    return this.reportRepo.save(report);
  }
}
