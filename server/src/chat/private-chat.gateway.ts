import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from '../user-chat/user-chat.service';

interface JwtPayload {
  sub: number;
  username: string;
}

@WebSocketGateway({
  namespace: '/private',
  cors: { origin: 'http://localhost:5173', credentials: true },
})
export class PrivateChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private clients = new Map<string, { userId: number; username: string }>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    const token = this.extractToken(client);
    if (!token) return client.disconnect();
    try {
      const { sub, username } =
        await this.jwtService.verifyAsync<JwtPayload>(token);
      this.clients.set(client.id, { userId: sub, username });
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('join_private')
  handleJoinRoom(client: Socket, { roomId }: { roomId: string }) {
    client.join(roomId);
  }

  @SubscribeMessage('private_message')
  async handlePrivateMessage(
    client: Socket,
    payload: {
      roomId: string;
      message: string;
      receiverId: number;
      productId: number;
    },
  ) {
    const user = this.clients.get(client.id);
    if (!user) return;

    await this.chatService.create(user.userId, {
      receiverId: payload.receiverId,
      productId: payload.productId,
      message: payload.message,
    });

    this.server.to(payload.roomId).emit('private_message', {
      username: user.username,
      message: payload.message,
      roomId: payload.roomId,
    });
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  private extractToken(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    return cookie?.match(/access_token=([^;]+)/)?.[1];
  }
}
