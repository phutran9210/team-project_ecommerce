import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { Data } from './dto/create-payment.dto';
import { GetOrderQuery } from './dto/update-payment.dto';
import { JwtGuardCheck } from '../guard/JwtGuardCheck.guard';
import { TokenName } from '../guard/decorator/token-name.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('voucher/:code')
  async checkVoucher(@Param('code') code: string, @Body() voucherCode: any) {
    return this.paymentService.check(code, voucherCode);
  }

  @UseGuards(JwtGuardCheck)
  @TokenName('LOGIN_INFO')
  @Post('checkout/:cartId')
  async paymentOrder(
    @Req() req: Request,
    @Param('cartId') cardId: number,
    @Body() payloadCheckout: Data,
  ) {
    return await this.paymentService.checkout(req, cardId, payloadCheckout);
  }

  @Get(':order_id')
  async findOne(@Param('order_id') order_id: string) {
    return await this.paymentService.findOne(+order_id);
  }

  @Get()
  async findAllOrder(@Query() payload: GetOrderQuery) {
    if (payload.order_id) {
      console.log('1');

      return await this.paymentService.findAll(payload.order_id);
    }

    if (payload.page && payload.tagValue) {
      console.log('2');

      return await this.paymentService.findAll(
        undefined,
        payload.page,
        payload.tagValue,
      );
    }

    if (payload.page) {
      console.log('3');

      return await this.paymentService.findAll(undefined, payload.page);
    }

    return new HttpException('Invalid parameter', HttpStatus.NO_CONTENT);
  }

  @Patch(':order_id')
  update(@Param('order_id') order_id: number, @Body() updatePaymentDto: any) {
    return this.paymentService.update(+order_id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }

  @Get('dash-board/analyst')
  async getDashboardAnalyst() {
    console.log('analyst');

    return await this.paymentService.getOrderAnalyst();
  }
}
