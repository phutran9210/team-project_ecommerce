// cart.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Guest } from '../../auth/entities/guest.entity';
import { CartDetail } from './cart-detail.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @OneToOne(() => Guest)
  @JoinColumn({ name: 'guest_id' })
  guest: Guest;

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.cart)
  cartDetails: CartDetail[];
}
