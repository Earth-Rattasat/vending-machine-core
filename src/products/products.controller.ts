import { ProductService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  async addProduct(
    @Body() payload: Prisma.ProductCreateInput,
  ): Promise<Product> {
    return await this.productService.addProduct(payload);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
