import { DataSource } from 'typeorm';
import { CartDetail } from '../../carts/entities/cart-detail.entity';
import { Cart } from '../../carts/entities/cart.entity';

export const cartProvider = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'CART_DETAILS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CartDetail),
    inject: ['DATA_SOURCE'],
  },
];
