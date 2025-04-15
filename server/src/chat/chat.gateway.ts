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

  private messages: ChatMessage[] = [];
  private clients = new Map<string, string>();

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    const cookieHeader = client.handshake.headers.cookie;
    const token = this.extractTokenFromCookie(cookieHeader);

    if (!token) {
      return client.disconnect();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      this.clients.set(client.id, payload.username);

      client.emit('chat init', this.messages);
    } catch (err) {
      console.warn('[서버] JWT 인증 실패:', err.message);
      client.disconnect();
    }
  }

  @SubscribeMessage('chat message')
  handleMessage(...args: unknown[]) {
    const [client, message] = args as [Socket, string];

    if (!client || typeof message !== 'string') {
      console.warn('[서버] client 또는 message 데이터 없음');
      return;
    }

    const username = this.clients.get(client.id);

    if (!username) {
      return;
    }

    const chat: ChatMessage = { username, message };
    this.messages.push(chat);
    this.server.emit('chat message', chat);
  }

  handleDisconnect(client: Socket) {
    const username = this.clients.get(client.id);
    if (username) {
      console.log(` ${username} (${client.id}) 연결 종료`);
    }
    this.clients.delete(client.id);
  }

  private extractTokenFromCookie(cookieHeader?: string): string | undefined {
    if (!cookieHeader) return;
    const match = cookieHeader.match(/access_token=([^;]+)/);
    return match?.[1];
  }
}
