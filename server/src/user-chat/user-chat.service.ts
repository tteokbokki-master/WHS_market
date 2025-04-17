import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user/user';
import { Product } from '../product/entities/product.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepo: Repository<Chat>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(senderId: number, dto: CreateChatDto) {
    const sender = await this.userRepo.findOneBy({ id: senderId });
    const receiver = await this.userRepo.findOneBy({ id: dto.receiverId });
    const product = await this.productRepo.findOneBy({ id: dto.productId });

    if (!sender || !receiver || !product)
      throw new Error('필요한 정보가 없습니다');

    const chat = this.chatRepo.create({
      sender,
      receiver,
      product,
      message: dto.message,
    });

    return this.chatRepo.save(chat);
  }

  async findChatHistory(userAId: number, userBId: number, productId: number) {
    return this.chatRepo.find({
      where: [
        {
          sender: { id: userAId },
          receiver: { id: userBId },
          product: { id: productId },
        },
        {
          sender: { id: userBId },
          receiver: { id: userAId },
          product: { id: productId },
        },
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
  }
}
