import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachinedExistsPipe } from './validates/machine-id-exists.pipe';
import { MachineInterface } from './interfaces/machine.interface';
import { FilterMachineDto } from './dto/filter-machine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('machines')
@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  create(
    @Body() createMachineDto: CreateMachineDto,
  ): Promise<{ machine: MachineInterface; message: string }> {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  async findAll(
    @Query() filter?: FilterMachineDto,
  ): Promise<MachineInterface[]> {
    return this.machinesService.findAll(filter);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe, MachinedExistsPipe) id: number,
  ): Promise<MachineInterface> {
    return this.machinesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe, MachinedExistsPipe) id: number,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<{ machine: MachineInterface; message: string }> {
    return this.machinesService.update(id, updateMachineDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe, MachinedExistsPipe) id: number,
  ): Promise<{ message: string }> {
    return this.machinesService.remove(+id);
  }
}
