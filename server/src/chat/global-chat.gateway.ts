import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: number;
  username: string;
}

@WebSocketGateway({
  namespace: '/global',
  cors: { origin: 'http://localhost:51730', credentials: true },
})
export class GlobalChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private clients = new Map<string, string>();

  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    const token = this.extractToken(client);
    if (!token) return client.disconnect();
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      this.clients.set(client.id, payload.username);
      client.emit('chat init');
    } catch {
      client.disconnect();
    }
  }

  @SubscribeMessage('chat message')
  handleMessage(client: Socket, message: string) {
    const username = this.clients.get(client.id);
    if (!username) return;
    const chat = { username, message };
    this.server.emit('chat message', chat);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
  }

  private extractToken(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    return cookie?.match(/access_token=([^;]+)/)?.[1];
  }
}
