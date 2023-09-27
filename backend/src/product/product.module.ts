import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { productProvider } from '../providers/product/product.provider';
import { DatabaseModule } from '../../database/database.module';
import { LoggingInterceptor } from '../activity_log/interceptor/LoggingIntercepter.interceptor';
import {ActivityLogModule} from "../activity_log/activity_log.module"

@Module({
  imports: [DatabaseModule, FirebaseModule,ActivityLogModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProvider,LoggingInterceptor],
})
export class ProductModule {}
