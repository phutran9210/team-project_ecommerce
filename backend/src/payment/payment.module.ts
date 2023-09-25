import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseModule } from '../../database/database.module';
import { discountProvider } from '../providers/discount/discount.provider';
import { productProvider } from '../providers/product/product.provider';
import { paymentProvider } from '../providers/payment/payment.provider';
import { userProvider } from '../providers/user/user.provider';
import { cartProvider } from '../providers/carts/cart.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    ...discountProvider,
    ...productProvider,
    ...paymentProvider,
    ...userProvider,
    ...cartProvider,
  ],
})
export class PaymentModule {}
