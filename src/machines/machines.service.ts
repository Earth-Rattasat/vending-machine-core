import { MachineWithProductMachine, ProductAndMachine } from './type/machines';
import { PrismaService } from '../config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Machine, Prisma, Product, Product_Machine } from '@prisma/client';

@Injectable()
export class MachinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Machine[]> {
    return await this.prisma.machine.findMany();
  }

  async findOne(id: number): Promise<Machine> {
    return await this.prisma.machine.findUnique({
      where: {
        id,
      },
    });
  }

  async addMachine(payload: Prisma.MachineCreateInput): Promise<Machine> {
    return await this.prisma.machine.create({
      data: payload,
    });
  }

  async deleteMachine(id: number): Promise<Machine> {
    return await this.prisma.machine.delete({
      where: {
        id,
      },
    });
  }

  async findProductInMachine(id: number): Promise<MachineWithProductMachine[]> {
    return await this.prisma.machine.findMany({
      where: {
        id,
      },
      include: {
        Product_Machine: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  generateProduct(
    productId: number,
    quantity: number,
  ): Prisma.Product_MachineCreateWithoutMachineInput {
    return {
      product: {
        connect: {
          id: productId,
        },
      },
      quantity,
    };
  }

  async addProductToMachine(
    id: number,
    payload: ProductAndMachine,
  ): Promise<Machine> {
    const product = this.generateProduct(payload.productId, payload.quantity);

    return await this.prisma.machine.update({
      where: {
        id,
      },
      data: {
        Product_Machine: {
          create: product,
        },
      },
    });
  }
}
