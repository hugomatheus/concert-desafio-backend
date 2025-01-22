import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MachineInterface } from './interfaces/machine.interface';

@Injectable()
export class MachinesEventEmitterService {
  private logger: Logger = new Logger(MachinesEventEmitterService.name);
    constructor(private eventEmitter: EventEmitter2) { }

    updatedMachine(machine: MachineInterface): void {
        this.eventEmitter.emit('machine.updated', machine);
    }

    @OnEvent('machine.updated')
    loggerUpdatedMachine(machine: MachineInterface): void {
      this.logger.log(`Máquina: ${machine.name}-${machine.id} atualizada.`, machine);
    }
}