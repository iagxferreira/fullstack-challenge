import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<Product>) {}
  
  async create(createProductDto: CreateProductDto): Promise<Product>  {
    const createdProduct = new this.model(createProductDto);
    return createdProduct.save();  }

  async findAll(): Promise<Product[]> {
      return this.model.find().exec();
    }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
