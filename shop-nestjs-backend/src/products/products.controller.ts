import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as productModel from 'src/models/product.model';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: multer.memoryStorage() }))
    async createNewProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() productFormData: productModel.ProductFormData
    ) {
        const created = await this.productsService.createNewProduct(productFormData, file);
        return created;
    }

    @Get()
    getProductList(@Query('sellerId') sellerId?: string) {
        const idNum = sellerId ? Number(sellerId) : null;
        return this.productsService.getProductList(idNum);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("my")
    async getMyProducts(@CurrentUser() user: { userId: number }) {
        return this.productsService.getProductList(user.userId);
    }

    @Get('categories')
    getCategories() {
        return this.productsService.getCategories();
    }
}
