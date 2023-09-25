import { DataSource } from 'typeorm';
import { DiscountCode } from '../../discount/entities/discount_code.entity';
import { DiscountCodeMapping } from '../../discount/entities/discount_maping.entity';

export const discountProvider = [
  {
    provide: 'DISCOUNTCODE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DiscountCode),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DISCOUNTCODE_MAPPING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DiscountCodeMapping),
    inject: ['DATA_SOURCE'],
  },
];
