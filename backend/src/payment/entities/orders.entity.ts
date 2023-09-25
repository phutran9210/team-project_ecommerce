import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';
import { Guest } from '../../auth/entities/guest.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  guest_id: string;

  @Column()
  receiver_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text')
  address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  order_date: Date;

  @Column({ default: 'pending' })
  order_status: string;

  @Column({ type: 'enum', enum: ['prepaid', 'cod'] })
  payment_method: string;

  @Column({ type: 'enum', enum: ['unpaid', 'paid'] })
  payment_status: string;

  @Column({
    type: 'enum',
    enum: ['Confirming', 'In Transit', 'Delivered', 'Delivery Cancelled'],
    nullable: true,
  })
  delivery_status: string;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Guest, (guest) => guest.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'guest_id' })
  guest: Guest;
}
