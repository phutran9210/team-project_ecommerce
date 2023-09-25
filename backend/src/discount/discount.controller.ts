import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountForm } from './dto/create-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  async createCode(@Body() createDiscountDto: DiscountForm) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  async findAll() {
    return await this.discountService.findAll();
  }

  @Get('search')
  async findOne(@Query() query: any) {
    return await this.discountService.findOne(query.payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: any) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.discountService.remove(+id);
  }
}
