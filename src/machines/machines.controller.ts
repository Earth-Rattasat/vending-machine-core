import { Machine, Prisma } from '@prisma/client';
import { MachinesService } from './machines.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  DecreaseQuantity,
  MachineWithProductMachine,
  MachineWithNoti,
  ProductAndQuantity,
} from './type';

@Controller('machines')
export class MachinesController {
  constructor(
    private machinesService: MachinesService,
  ) {}

  @Get()
  async findAll(): Promise<Machine[]> {
    return await this.machinesService.findAll();
  }

  @Post()
  async addMachine(
    @Body() payload: Prisma.MachineCreateInput,
  ): Promise<Machine> {
    return await this.machinesService.addMachine(payload);
  }

  @Get('/notification')
  async getSoldOutSummary(): Promise<MachineWithNoti[]> {
    return await this.machinesService.getMachineWithNoti();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return await this.machinesService.findOne(id);
  }

  @Delete('/:id')
  async deleteMachine(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return await this.machinesService.deleteMachine(id);
  }

  @Get('/:id/products')
  async findProductAll(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MachineWithProductMachine> {
    return await this.machinesService.findProductInMachine(id);
  }

  @Post('/:id/products')
  async addProductToMachine(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ProductAndQuantity,
  ): Promise<Machine> {
    return await this.machinesService.addProductToMachine(id, payload);
  }

  @Put('/:id/products')
  async buyProduct(@Body() payload: DecreaseQuantity): Promise<Machine> {
    return await this.machinesService.buyProduct(payload);
  }
}
