import { Machine, Prisma, Product_Machine } from '@prisma/client';
import { MachinesService } from './machines.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductAndMachine } from './type';

@Controller('machines')
export class MachinesController {
  constructor(private MachinesService: MachinesService) {}

  @Get()
  async findAll(): Promise<Machine[]> {
    return await this.MachinesService.findAll();
  }

  @Post()
  async addMachine(
    @Body() payload: Prisma.MachineCreateInput,
  ): Promise<Machine> {
    return await this.MachinesService.addMachine(payload);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return await this.MachinesService.findOne(id);
  }

  @Delete('/:id')
  async deleteMachine(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return await this.MachinesService.deleteMachine(id);
  }

  @Get('/:id/products')
  async findProductAll(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return await this.MachinesService.findProductInMachine(id);
  }

  @Post('/:id/products')
  async addProductToMachine(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ProductAndMachine,
  ): Promise<Machine> {
    return await this.MachinesService.addProductToMachine(id, payload);
  }
}
