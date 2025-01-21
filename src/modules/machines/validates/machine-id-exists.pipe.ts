import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineEntity } from '../entities/machine.entity';

@Injectable()
export class MachinedExistsPipe implements PipeTransform<any> {
  constructor(
    @InjectRepository(MachineEntity)
    private readonly repository: Repository<MachineEntity>,
  ) {}

  async transform(id: number) {
    const machine = await this.repository.findOne({ where: { id } });

    if (!machine) {
      throw new NotFoundException(
        'Máquina não encontrada',
        `Não foi possível encontrar uma máquina com ID: ${id}`,
      );
    }

    return id;
  }
}
