import { MachineStatusEnum } from '../../../modules/machines/enums/machine-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMachines1737401330831 implements MigrationInterface {
  private readonly table = new Table({
    name: 'machines',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'location',
        type: 'varchar',
        length: '255',
      },
      {
        name: 'status',
        type: 'enum',
        enum: [
          MachineStatusEnum.OPERATING,
          MachineStatusEnum.MAINTENANCE,
          MachineStatusEnum.OFF,
        ],
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
