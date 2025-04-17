import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
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

  async create(
    userId: number,
    dto: CreateUserReportDto,
  ): Promise<'ALREADY_REPORTED' | 'REPORTED'> {
    const reporter = await this.users.findOneBy({ id: userId });
    const reported = await this.users.findOneBy({ id: dto.reportedUserId });

    if (!reporter || !reported) {
      throw new BadRequestException('잘못된 요청입니다');
    }

    const exists = await this.repo.findOne({
      where: {
        reporter: { id: userId },
        reported: { id: dto.reportedUserId },
      },
    });

    if (exists) throw new ConflictException('ALREADY_REPORTED');

    const entity = this.repo.create({
      content: dto.content,
      reporter,
      reported,
    });

    const reportCount = await this.repo.count({
      where: {
        reported: { id: dto.reportedUserId },
      },
    });

    if (reportCount >= 10) {
      const user = await this.users.findOneBy({ id: dto.reportedUserId });
      if (user && !user.banUntil) {
        user.banUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.users.save(user);
        await this.repo.delete({
          reported: { id: dto.reportedUserId },
        });
      }
    }

    await this.repo.save(entity);
    return 'REPORTED';
  }
}
