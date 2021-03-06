import { PrismaService } from './../config/prisma.service';
import { MachinesController } from './machines.controller';
import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';

@Module({
  controllers: [MachinesController],
  providers: [MachinesService, PrismaService],
})
export class MachineModule {}
