import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

interface ChatMessage {
  username: string;
  message: string;
  roomId: string;
}

interface JwtPayload {
  sub: number;
  username: string;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private clients = new Map<string, { username: string; userId: number }>();

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    const cookieHeader = client.handshake.headers.cookie;
    const token = this.extractTokenFromCookie(cookieHeader);

    if (!token) {
      return client.disconnect();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      this.clients.set(client.id, {
        username: payload.username,
        userId: payload.sub,
      });

      console.log(`[서버] ${payload.username} 접속 (${client.id})`);
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('join_private')
  handleJoinRoom(client: Socket, payload: { roomId: string }) {
    client.join(payload.roomId);
    console.log(`[JOIN] ${client.id} joined ${payload.roomId}`);
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(
    client: Socket,
    payload: { roomId: string; message: string },
  ) {
    const user = this.clients.get(client.id);
    if (!user) return;

    const chat: ChatMessage = {
      username: user.username,
      message: payload.message,
      roomId: payload.roomId,
    };

    this.server.to(payload.roomId).emit('private_message', chat);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  private extractTokenFromCookie(cookieHeader?: string): string | undefined {
    if (!cookieHeader) return;
    const match = cookieHeader.match(/access_token=([^;]+)/);
    return match?.[1];
  }
}
