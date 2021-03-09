import { Machine, Product_Machine } from '@prisma/client';
export interface ProductAndQuantity {
  productId: number;
  quantity?: number;
}

export interface DecreaseQuantity extends ProductAndQuantity {
  machineId: number;
}

export interface MachineWithProductMachine extends Machine {
  Product_Machine: Product_Machine[];
}

export interface MachineWithNoti {
  machineId: number;
  noti: number;
}
