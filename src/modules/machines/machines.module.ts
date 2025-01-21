import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';
import { MachinedExistsPipe } from './validates/machine-id-exists.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineEntity } from './entities/machine.entity';
import { MachinesGateway } from './machines.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MachineEntity])],
  controllers: [MachinesController],
  providers: [MachinesService, MachinedExistsPipe, MachinesGateway],
})
export class MachinesModule {}
