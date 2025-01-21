import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MachineInterface } from './interfaces/machine.interface';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'api' })
export class MachinesGateway {
  private logger: Logger = new Logger(MachinesGateway.name);
  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('Initialized MachinesGateway');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client MachinesGateway Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client MachinesGateway - API Connected: ${client.id}`);
  }
  @SubscribeMessage('updateMachine')
  handleUpdateMachine(payload: MachineInterface): any {
    this.server.emit('updateMachine', payload);
  }
}
