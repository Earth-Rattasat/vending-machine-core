import {
  DecreaseQuantity,
  MachineWithProductMachine,
  MachineWithNoti,
  ProductAndQuantity,
} from './type/machines';
import { PrismaService } from '../config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Machine, Prisma } from '@prisma/client';

@Injectable()
export class MachinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Machine[]> {
    return await this.prisma.machine.findMany();
  }

  async findOne(id: number): Promise<Machine> {
    await this.getMachineWithNoti();
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

  async findProductInMachine(id: number): Promise<MachineWithProductMachine> {
    return await this.prisma.machine.findUnique({
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
    payload: ProductAndQuantity,
  ): Promise<Machine> {
    const product = this.generateProduct(payload.productId, payload.quantity);

    return this.prisma.product_Machine
      .findUnique({
        where: {
          machineId_productId: {
            machineId: id,
            productId: payload.productId,
          },
        },
      })
      .then(async (found) => {
        if (found) {
          return await this.prisma.machine.update({
            where: {
              id,
            },
            data: {
              Product_Machine: {
                update: {
                  where: {
                    machineId_productId: {
                      machineId: id,
                      productId: payload.productId,
                    },
                  },
                  data: {
                    quantity: found.quantity + payload.quantity,
                  },
                },
              },
            },
          });
        } else {
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
      });
  }

  async buyProduct(payload: DecreaseQuantity): Promise<Machine> {
    const machine = await this.prisma.machine.findUnique({
      where: {
        id: payload.machineId,
      },
      include: {
        Product_Machine: {
          include: {
            product: true,
          },
        },
      },
    });

    const quantity = machine.Product_Machine.find(
      (product) => product.productId === payload.productId,
    ).quantity;

    return this.prisma.machine.update({
      where: {
        id: payload.machineId,
      },
      data: {
        Product_Machine: {
          update: {
            where: {
              machineId_productId: {
                machineId: payload.machineId,
                productId: payload.productId,
              },
            },
            data: {
              quantity: quantity - 1,
            },
          },
        },
      },
    });
  }

  async getMachineWithNoti(): Promise<MachineWithNoti[]> {
    const machines = await this.findAll();

    let resultSoldout: MachineWithNoti[] = [];

    await Promise.all(
      machines.map(async (machine) => {
        const result = await this.findProductInMachine(machine.id);
        let notiCount = 0;

        await Promise.all(
          result.Product_Machine.map((product_machine) => {
            if (product_machine.quantity < 10) notiCount += 1;
          }),
        );

        resultSoldout.push({
          machineId: machine.id,
          noti: notiCount,
        } as MachineWithNoti);
      }),
    );

    return resultSoldout;
  }
}
