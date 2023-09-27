import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CartsModule } from './carts/carts.module';
import { DiscountModule } from './discount/discount.module';
import { PaymentModule } from './payment/payment.module';
import { ActivityLogModule } from './activity_log/activity_log.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductModule,
    CartsModule,
    DiscountModule,
    PaymentModule,
    ActivityLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
