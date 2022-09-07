import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  // @Get('get-all-product')
  // async allProducts(
  //   @Body()
  //   CreateProductDto: CreateProductDto,
  // ): Promise<Product> {
  //   return await this.productService.findAll(CreateProductDto);
  // }

  @Get('get-all-product')
  async allProducts(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('get-product/:id')
  async singleProduct(@Param() id): Promise<Product> {
    const productId: string = id.id;
    console.log('productId:-----------', productId);

    return await this.productService.findOne(productId);
  }
  @Get('get-product')
  async getProduct(@Body() id): Promise<Product> {
    const productId: string = id.id;
    console.log('productId:-----------', productId);

    return await this.productService.findOne(productId);
  }
}
