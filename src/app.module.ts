import { PrismaService } from './config/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { MachinesService } from './machines/machines.service';
import { MachinesController } from './machines/machines.controller';
import { MachineModule } from './machines/machines.module';

@Module({
  imports: [ProductModule, MachineModule],
  controllers: [AppController, MachinesController],
  providers: [AppService, MachinesService, PrismaService],
})
export class AppModule {}
