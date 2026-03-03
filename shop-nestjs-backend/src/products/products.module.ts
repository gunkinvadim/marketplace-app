import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { User } from '../auth/user.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, User])],
  exports: [],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
