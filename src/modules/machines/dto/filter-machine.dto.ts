import { IsEnum, IsOptional } from 'class-validator';
import { MachineStatusEnum } from '../enums/machine-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class FilterMachineDto {
  @ApiProperty({ enum: MachineStatusEnum, required: false })
  @IsOptional()
  @IsEnum(MachineStatusEnum, {
    message: `O campo de "status" deve ser válido (${Object.values(
      MachineStatusEnum,
    ).join(', ')})`,
  })
  status?: string;
}
