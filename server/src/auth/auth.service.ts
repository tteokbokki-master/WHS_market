import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(dto: LoginDto): Promise<string> {
    const user = await this.userRepo.findOneBy({ username: dto.username });

    if (!user)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');

    const isPwCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPwCorrect)
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');

    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });

    return token;
  }
}
