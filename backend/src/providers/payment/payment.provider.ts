import { DataSource } from 'typeorm';
import { Order } from '../../payment/entities/orders.entity';
import { OrderDetail } from '../../payment/entities/order_details.entity';

export const paymentProvider = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ORDER_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderDetail),
    inject: ['DATA_SOURCE'],
  },
];
