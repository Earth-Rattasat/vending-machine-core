import { PrismaService } from './../config/prisma.service';
import { MachinesController } from './machines.controller';
import { Module } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { NotificationService } from 'src/mailer/mailer.service';

@Module({
  controllers: [MachinesController],
  providers: [MachinesService, PrismaService, NotificationService],
})
export class MachineModule {}
