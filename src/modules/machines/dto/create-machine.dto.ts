import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { MachineStatusEnum } from '../enums/machine-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty()
  @IsString({
    message: 'O campo "name" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'O campo "name" é obrigatório.' })
  @MaxLength(255, {
    message: 'O campo "name" pode ter no máximo 255 caracteres.',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'O campo "location" precisa ser uma string.',
  })
  @IsNotEmpty({ message: 'O campo "location" é obrigatório.' })
  @MaxLength(255, {
    message: 'O campo "location" pode ter no máximo 255 caracteres.',
  })
  @Matches(/^-?\d{1,2}\.\d+,\s?-?\d{1,3}\.\d+$/, {
    message:
      'Coordenada precisa apresentar o formato de "latitude, longitude".',
  })
  location: string;

  @ApiProperty({ enum: MachineStatusEnum })
  @IsNotEmpty({ message: 'O campo "status" é obrigatório.' })
  @IsEnum(MachineStatusEnum, {
    message: `O campo de "status" deve ser válido (${Object.values(
      MachineStatusEnum,
    ).join(', ')})`,
  })
  status: string;
}
