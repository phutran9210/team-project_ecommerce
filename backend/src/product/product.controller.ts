import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
  Param,
  Get,
  ValidationPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { JwtAuthGuardCheck } from '../guard/JwtAuthGuardCheck.guard';
import { FilterEmptyFieldsPipe } from './pipes/FilterEmptyFieldsPipe.pipe';
import {
  CategoryDto,
  ProductIdDto,
  PropertiesValueDTO,
  PayloadSearch,
  PayloadEditProduct,
  EditProductIdDto,
} from './dto/payloadProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuardCheck)
  @UsePipes(new FilterEmptyFieldsPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image_description', maxCount: 5 },
      { name: 'primary_img', maxCount: 1 },
      { name: 'cover_img', maxCount: 1 },
    ]),
  )
  async uploadForm(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      image_description?: Express.Multer.File[];
      primary_img?: Express.Multer.File[];
      cover_img?: Express.Multer.File[];
    },
    @Body() body: any,
  ) {
    const imageDescriptionFiles = files.image_description || [];
    const primaryImgFiles = files.primary_img || [];
    const coverImgFiles = files.cover_img || [];

    return await this.productService.uploadImagesToFirebase(
      req,
      imageDescriptionFiles,
      primaryImgFiles,
      coverImgFiles,
      body,
    );
  }

  @Get('/:category')
  async getProductByCategory(@Param() category: CategoryDto) {
    return await this.productService.getByCategory(category);
  }

  @Get('/details/:productId')
  async getProduct(@Param() productId: ProductIdDto) {
    return await this.productService.getProductService(productId);
  }

  @Get('/details/values/:properties/:valueOfProperties')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getValue(@Param() params: PropertiesValueDTO) {
    const properties = params.properties;
    const valueOfProperties = params.valueOfProperties;
    return await this.productService.getProperties(
      properties,
      valueOfProperties,
    );
  }

  //SEARCH
  @Get('/db/search')
  async getSearch(@Query() query: PayloadSearch) {
    return await this.productService.searchService(query.payload);
  }
  //SEARCH for voucher
  @Get('/db/voucher/search')
  async getSearchForVoucher(@Query() query: any) {
    return await this.productService.findForProduct(query.payload);
  }

  //lấy tất cả product
  @Get()
  @UseGuards(JwtAuthGuardCheck)
  async getAllProduct(@Query() page: PayloadEditProduct) {
    return await this.productService.getAllProductByPage(page.page);
  }
  // search admin
  @Get('/db/voucher/admin/search')
  async searchAdmin(@Query() query: any) {
    return await this.productService.searchAdminProduct(query.payload);
  }

  @Get('admin/:productId')
  @UseGuards(JwtAuthGuardCheck)
  async findForEdit(@Param('productId') productId: string) {
    return await this.productService.findProductEdit(productId);
  }

  @Patch('admin/edit/:productId')
  @UseGuards(JwtAuthGuardCheck)
  async editProduct(
    @Param('productId') productId: string,
    @Body() payload: any,
  ) {
    return await this.productService.updateProduct(productId, payload);
  }

  @Get('dashboard/analyst')
  @UseGuards(JwtAuthGuardCheck)
  async dataAnalyst() {
    return await this.productService.getAnalyst();
  }
}
