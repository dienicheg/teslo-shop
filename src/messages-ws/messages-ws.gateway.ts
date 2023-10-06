import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server;
  
  constructor(private readonly messagesWsService: MessagesWsService) {}
  
  handleConnection(client: Socket) {
    console.log('Cliente conectado', client.id)
  }
  
  
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado', client.id)
  }
  

}
