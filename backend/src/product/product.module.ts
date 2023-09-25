import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { productProvider } from '../providers/product/product.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProvider],
})
export class ProductModule {}
