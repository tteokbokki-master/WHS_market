import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.userRepo.findOneBy({ username });
    return !!user;
  }

  async register(
    dto: RegisterDto,
  ): Promise<{ message: string; user: { username: string } }> {
    const hashedPw = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      username: dto.username,
      password: hashedPw,
    });

    await this.userRepo.save(user);

    return {
      message: '회원가입 성공',
      user: { username: user.username },
    };
  }
}
