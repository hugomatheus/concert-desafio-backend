import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachineEntity } from './entities/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineInterface } from './interfaces/machine.interface';
import { FilterMachineDto } from './dto/filter-machine.dto';
import { MachinesGateway } from './machines.gateway';
import { MachineStatusEnum } from './enums/machine-status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MachinesEventEmitterService } from './machines-event-emitter.service';

@Injectable()
export class MachinesService {
  private logger: Logger = new Logger(MachinesService.name);
  constructor(
    @InjectRepository(MachineEntity)
    private readonly repository: Repository<MachineEntity>,
    private readonly gateway: MachinesGateway,
    private readonly event: MachinesEventEmitterService,
  ) {}
  async create(
    dto: CreateMachineDto,
  ): Promise<{ machine: MachineInterface; message: string }> {
    try {
      let machine = Object.assign(new MachineEntity(), dto);
      machine = await this.repository.save(machine);
      return { machine, message: 'Máquina cadastrada com suecesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível criar a máquina.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filter?: FilterMachineDto): Promise<MachineInterface[]> {
    try {
      let where = {};
      if (filter?.status) {
        where = { status: filter.status };
      }
      return await this.repository.find({ where, order: {id: 'desc'} });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar as máquinas.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<MachineInterface> {
    try {
      return await this.repository.findOneOrFail({ where: { id } });
    } catch {
      throw new HttpException(
        { message: 'Não foi possível encontrar a máquina.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    dto: UpdateMachineDto,
  ): Promise<{ machine: MachineInterface; message: string }> {
    try {
      let machine = Object.assign(new MachineEntity(), { id, ...dto });
      machine = await this.repository.save(machine);
      this.gateway.handleUpdateMachine(machine);
      this.logger.log(`Máquina: ${machine.name}-${machine.id} atualizada.`, machine);
      this.event.updatedMachine(machine);
      return { machine, message: 'Máquina atualizada com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível atualizar a máquina.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.repository.softDelete(id);
      return { message: 'Máquina removida com sucesso.' };
    } catch {
      throw new HttpException(
        { message: 'Não foi possível excluir a máquina.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    try {
      const testMachine = await this.repository.find({
        order: {id: 'desc'},
        take: 1,
      });
      if (testMachine.length) {
        const enumValues = Object.values(MachineStatusEnum);
        const randomStatus =
          enumValues[Math.floor(Math.random() * enumValues.length)];
        testMachine[0].status = randomStatus;
        await this.update(testMachine[0].id, testMachine[0]);
      }
      
    } catch {
      throw new HttpException(
        { message: 'Não foi possível realizar o procedimento.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
