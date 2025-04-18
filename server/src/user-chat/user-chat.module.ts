import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { ChatService } from './user-chat.service';
import { ChatController } from './user-chat.controller';
import { User } from '../auth/entities/user/user';
import { Product } from '../product/entities/product.entity';

import { GlobalChatGateway } from 'src/chat/global-chat.gateway';
import { PrivateChatGateway } from 'src/chat/private-chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Product])],
  controllers: [ChatController],
  providers: [ChatService, GlobalChatGateway, PrivateChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
