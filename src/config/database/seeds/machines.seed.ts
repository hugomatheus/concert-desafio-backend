import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MachineEntity } from '../../../modules/machines/entities/machine.entity';
import { MachineStatusEnum } from '../../../modules/machines/enums/machine-status.enum';

export class MachinesSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(MachineEntity);
    await repository.insert([
      {
        name: 'Máquina de teste',
        location: '-9.664220, -35.741600',
        status: MachineStatusEnum.OFF,
      },
    ]);
  }
}
