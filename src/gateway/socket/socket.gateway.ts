import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SocketService } from './socket.service';
import { User } from '@/core/database/models/user.model';

export type SocketWithUser = Socket & { user: User };

@WebSocketGateway({
  namespace: '/socket.io',
  transports: ['websocket', 'polling'],
  pingInterval: 5000,
  pingTimeout: 5000,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  allowEIO3: true,
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // constructor(private readonly socketService: SocketService) {}

  // onModuleInit() {
  //   this.server.use(async (socket: SocketWithUser, next) => {
  //     try {
  //       await this.socketService.handleConnection(socket);
  //       next();
  //     } catch (error) {
  //       next(error);
  //     }
  //   });
  // }

  handleConnection(): void {}

  handleDisconnect(socket: SocketWithUser): void {}
}
