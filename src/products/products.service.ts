import { PrismaService } from '../config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,) {}

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async addProduct(payload: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({
      data: payload,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
