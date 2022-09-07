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

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    console.log(id);

    const product = await this.productModel.findById(id).exec();
    console.log(product);

    const test_session = await Shopify.Utils.loadCurrentSession(
      request,
      response,
    );
    const shop = test_session.shop;

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
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
