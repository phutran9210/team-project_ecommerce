import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './orders.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  order_detail_id: number;

  @Column({ nullable: true })
  order_id: number;

  @Column({ nullable: true })
  product_id: string;

  @Column()
  quantity: number;

  @Column()
  total_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  discounted_price: number;

  @Column({ nullable: true })
  engraving_content: string;

  @Column({ nullable: true, type: 'tinyint' })
  engraving_checked: boolean;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
