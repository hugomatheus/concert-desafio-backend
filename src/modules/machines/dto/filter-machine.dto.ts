import { IsEnum, IsOptional } from 'class-validator';
import { MachineStatusEnum } from '../enums/machine-status.enum';

export class FilterMachineDto {
  @IsOptional()
  @IsEnum(MachineStatusEnum, {
    message: `O campo de "status" deve ser válido (${Object.values(
      MachineStatusEnum,
    ).join(', ')})`,
  })
  status?: string;
}
