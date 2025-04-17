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

  async listRooms(
    userAId: number,
    productId: number,
  ): Promise<
    { userId: number; username: string; lastMessage: string; lastAt: Date }[]
  > {
    const userCase = `
      CASE
        WHEN chat.sender_id = :userA THEN chat.receiver_id
        ELSE chat.sender_id
      END
    `;

    const usernameCase = `
      CASE
        WHEN chat.sender_id = :userA THEN receiver.username
        ELSE sender.username
      END
    `;

    const qb = this.chatRepo
      .createQueryBuilder('chat')
      .select([
        `${userCase} AS "userId"`,
        `${usernameCase} AS "username"`,
        'chat.message AS "lastMessage"',
        'chat.created_at AS "lastAt"',
      ])
      .leftJoin('chat.sender', 'sender')
      .leftJoin('chat.receiver', 'receiver')
      .where('(chat.sender_id = :userA OR chat.receiver_id = :userA)', {
        userA: userAId,
      })
      .andWhere('chat.product_id = :productId', { productId });

    if (this.chatRepo.manager.connection.options.type === 'postgres') {
      qb.distinctOn([userCase.trim()])

        .orderBy(userCase.trim(), 'ASC')

        .addOrderBy('chat.created_at', 'DESC');
    } else {
      qb.orderBy('chat.created_at', 'DESC');
    }

    return qb.getRawMany();
  }
}
