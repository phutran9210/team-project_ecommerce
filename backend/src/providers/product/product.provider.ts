import { DataSource } from 'typeorm';
import { Category } from '../../product/entities/category.entity';
import { ProductCoverImage } from '../../product/entities/product-cover-image.entity';
import { ProductDetail } from '../../product/entities/product-detail.entity';
import { ProductImage } from '../../product/entities/product-image.entity';
import { Product } from '../../product/entities/product.entity';

export const productProvider = [
  {
    provide: 'CATEGORY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_COVER_IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductCoverImage),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductDetail),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductImage),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
