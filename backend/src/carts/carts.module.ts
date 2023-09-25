import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { DatabaseModule } from '../../database/database.module';
import { cartProvider } from '../providers/carts/cart.provider';
import { userProvider } from '../providers/user/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CartsController],
  providers: [CartsService, ...cartProvider, ...userProvider],
})
export class CartsModule {}
