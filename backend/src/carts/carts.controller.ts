import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/:userId')
  async findCart(@Param('userId') userId: string) {
    return await this.cartsService.findCartUser(userId);
  }

  @Patch('/update/:cartId')
  async updateCartDetail(
    @Param('cartId') cartId: string,
    @Body() updateCartDto: any,
  ) {
    return await this.cartsService.update(cartId, updateCartDto);
  }

  @Patch('update/:cardId/:itemId')
  async updateItem(
    @Param('cardId') cardId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: any,
  ) {
    return await this.cartsService.updateItemCart(
      cardId,
      itemId,
      updateItemDto,
    );
  }
}
