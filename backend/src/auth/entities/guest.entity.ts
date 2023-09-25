import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Order } from '../../payment/entities/orders.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('guests')
export class Guest {
  @PrimaryColumn('varchar')
  guest_id: string = this.generateCustomId();

  @Column('varchar')
  guest_fingerprint: string;

  @OneToMany(() => Order, (order) => order.guest)
  orders: Order[];

  generateCustomId(): string {
    const id = uuidv4();
    return `guest-id-${id}`;
  }
}
