import { PrismaService } from '../config/prisma.service';
import { ProductController } from './products.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
