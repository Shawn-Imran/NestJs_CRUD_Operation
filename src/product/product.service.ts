import { HttpService } from '@nestjs/axios';
import {
  //   BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  //   InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Shopify from '@shopify/shopify-api';
import { request, response } from 'express';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/dto/product.dto';
import { Product } from 'src/interfaces/product.interface';
// import express, { Request, Response } from 'express';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    private readonly httpService: HttpService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    console.log(id);

    const tempproduct = await this.productModel.findById(id).exec();
    console.log(tempproduct);

    const shopifyProduct = {
      product: {},
    };

    if (tempproduct) {
      shopifyProduct.product = tempproduct;
      console.log(shopifyProduct);
      const url =
        'https://08869b5b39dfe5ab6fa2f08f2fbd9c10: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@web-app-2941.myshopify.com//admin/api/2022-07/products.json';

      // const options = {
      //   method: 'POST',
      //   uri: url,
      //   json: true,
      //   resolveWithFullResponse: true, //added this to view status code
      //   body: shopifyProduct, //pass new product object - NEW - request-promise problably updated
      // };

      // const result = new Request(options);

      this.httpService.post(url, shopifyProduct).subscribe((res) => {
        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        console.log(res.headers);
        console.log(res.config);
      });

      // const result = new Request(options, (err: any, _res: any, body: any) => {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(body);
      // });
    }

    if (!tempproduct) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return tempproduct;
  }

  //   async update(
  //     id: string,
  //     updateProductDto: UpdateProductDto,
  //   ): Promise<Product> {
  //     const updatedProduct = await this.productModel
  //       .findByIdAndUpdate(id, updateProductDto, { new: true })
  //       .exec();
  //     if (!updatedProduct) {
  //       throw new NotFoundException(`Product #${id} not found`);
  //     }
  //     return updatedProduct;
  //   }

  //   async remove(id: string): Promise<Product> {
  //     const deletedProduct = await this.productModel.findByIdAndRemove(id).exec();
  //     if (!deletedProduct) {
  //       throw new NotFoundException(`Product #${id} not found`);
  //     }
  //     return deletedProduct;
  //   }

  //   async addTag(id: string, addTagDto: AddTagDto): Promise<Product> {
  //     const product = await this.findOne(id);
  //     product.tags.push(addTagDto);
  //     return product.save();
  //   }

  //   async recommendProduct(id: string): Promise<Product> {
  //     const product = await this.findOne(id);
  //     product.recommended = true;
  //     return product.save();
  //   }

  //   async cacheProduct(id: string): Promise<Product> {
  //     const product = await this.findOne(id);
  //     await this.cacheManager.set(`product_${id}`, product);
  //     return product;
  //   }

  //   async getCachedProduct(id: string): Promise<Product> {
  //     const cachedProduct = await this.cacheManager.get(`product_${id}`);
  //     if (!cachedProduct) {
  //       throw new NotFoundException(`Product #${id} not found`);
  //     }
  //     return cachedProduct;
  //   }

  //   async deleteCachedProduct(id: string): Promise<Product> {
  //     const cachedProduct = await this.cacheManager.get(`product_${id}`);
  //     if (!cachedProduct) {
  //     }
  //   }
}
