import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    @UseInterceptors(FileInterceptor("image", { storage: multer.memoryStorage() }))
    async createNewProduct(
        @UploadedFile() file: Express.Multer.File,
        @Body() productFormData
    ) {
        const created = await this.productsService.createNewProduct(productFormData, file);
        return created;
    }

    @Get('categories')
    getCategories() {
        return this.productsService.getCategories();
    }
}
