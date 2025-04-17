import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserReport } from './entities/user_report';
import { User } from '../auth/entities/user/user';
import { CreateUserReportDto } from './dto/create-user-report.dto';

@Injectable()
export class UserReportService {
  constructor(
    @InjectRepository(UserReport)
    private readonly repo: Repository<UserReport>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateUserReportDto): Promise<UserReport> {
    const reporter = await this.users.findOneBy({ id: userId });
    const reported = await this.users.findOneBy({ id: dto.reportedUserId });
    if (!reporter || !reported)
      throw new BadRequestException('잘못된 요청입니다');
    const entity = this.repo.create({
      content: dto.content,
      reporter,
      reported,
    });
    return this.repo.save(entity);
  }
}
