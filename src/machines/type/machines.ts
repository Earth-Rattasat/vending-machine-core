import { Machine, Product_Machine } from '@prisma/client';
export interface ProductAndMachine {
  productId: number;
  quantity: number;
}

export interface MachineWithProductMachine extends Machine {
  Product_Machine: Product_Machine[];
}
