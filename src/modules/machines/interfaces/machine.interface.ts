import { MachineStatusEnum } from '../enums/machine-status.enum';

export interface MachineInterface {
  id?: number;
  name: string;
  location: string;
  status: MachineStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
