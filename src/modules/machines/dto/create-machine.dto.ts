import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MachineStatusEnum } from '../enums/machine-status.enum';

export class CreateMachineDto {
  @IsString({
    message: 'O campo "name" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'O campo "name" é obrigatório.' })
  @MaxLength(255, {
    message: 'O campo "name" pode ter no máximo 255 caracteres.',
  })
  name: string;

  @IsString({
    message: 'O campo "location" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'O campo "location" é obrigatório.' })
  @MaxLength(255, {
    message: 'O campo "location" pode ter no máximo 255 caracteres.',
  })
  location: string;

  @IsNotEmpty({ message: 'O campo "status" é obrigatório.' })
  @IsEnum(MachineStatusEnum, {
    message: `O campo de "status" deve ser válido (${Object.values(
      MachineStatusEnum,
    ).join(', ')})`,
  })
  status: string;
}
