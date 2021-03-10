import { PrismaService } from './config/prisma.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { MachinesService } from './machines/machines.service';
import { MachinesController } from './machines/machines.controller';
import { MachineModule } from './machines/machines.module';
import { NotificationService } from './mailer/mailer.service';
import { NotificationModule } from './mailer/mailer.module';

@Module({
  imports: [ProductModule, MachineModule, NotificationModule],
  controllers: [AppController, MachinesController],
  providers: [AppService, MachinesService, PrismaService, NotificationService],
})
export class AppModule {}
