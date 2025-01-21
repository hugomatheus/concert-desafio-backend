import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MachineStatusEnum } from '../enums/machine-status.enum';

@Entity({ name: 'machines' })
export class MachineEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'location' })
  location: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: MachineStatusEnum,
    default: MachineStatusEnum.OFF,
  })
  status: MachineStatusEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
