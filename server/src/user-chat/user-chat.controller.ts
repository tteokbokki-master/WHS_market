import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ChatService } from './user-chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateChatDto) {
    console.log('받은 요청 본문:', dto);
    console.log('인증된 유저:', req.user);
    return this.chatService.create(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getChatHistory(
    @Req() req: AuthenticatedRequest,
    @Query('with') withUserId: number,
    @Query('product') productId: number,
  ) {
    return this.chatService.findChatHistory(
      req.user.sub,
      withUserId,
      productId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('rooms')
  async getChatRooms(
    @Req() req: AuthenticatedRequest,
    @Query('product', new ParseIntPipe()) productId: number,
  ) {
    return this.chatService.listRooms(req.user.sub, productId);
  }
}
