import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../auth/entities/user/user';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getWallet(userId: number) {
    const wallet = await this.walletRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!wallet) throw new NotFoundException('지갑이 없습니다.');
    return wallet;
  }

  async transfer(fromUserId: number, toUserId: number, amount: number) {
    if (fromUserId === toUserId)
      throw new BadRequestException('자기 자신에게 송금할 수 없습니다.');

    const fromWallet = await this.walletRepo.findOne({
      where: { user: { id: fromUserId } },
      relations: ['user'],
    });
    const toWallet = await this.walletRepo.findOne({
      where: { user: { id: toUserId } },
      relations: ['user'],
    });

    if (!fromWallet || !toWallet)
      throw new NotFoundException('지갑을 찾을 수 없습니다.');
    if (fromWallet.balance < amount)
      throw new BadRequestException('잔액이 부족합니다.');

    fromWallet.balance -= amount;
    toWallet.balance += amount;

    await this.walletRepo.save([fromWallet, toWallet]);

    return { message: '송금이 완료되었습니다.' };
  }
}
