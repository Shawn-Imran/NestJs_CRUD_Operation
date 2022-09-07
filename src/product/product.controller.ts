import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/product.dto';
import { Product } from 'src/interfaces/product.interface';
// import { ResponsePayload } from 'src/interfaces/response-payload.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('add-product')
  async addProduct(
    @Body()
    CreateProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productService.create(CreateProductDto);
  }
}
