import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DatabaseModule } from '../../database/database.module';
import { discountProvider } from '../providers/discount/discount.provider';
import { productProvider } from '../providers/product/product.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DiscountController],
  providers: [DiscountService, ...discountProvider, ...productProvider],
})
export class DiscountModule {}
