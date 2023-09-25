import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Cart } from './cart.entity';
import { v4 as uuidv4 } from 'uuid';
import { Transform } from 'class-transformer';

@Entity('carts_detail')
export class CartDetail {
  @PrimaryColumn({ type: 'varchar', length: 75 })
  cart_detail_id: string = this.generateCustomId();

  @ManyToOne(() => Product, (product) => product.cartDetails)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartDetails)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ type: 'int' })
  cart_id: number;

  @Column({ type: 'tinyint', width: 1 })
  @Transform((engraving_checked) => !!engraving_checked, { toClassOnly: true })
  engraving_checked: boolean;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'varchar', length: 15 })
  engraving_content: string;

  generateCustomId(): string {
    const id = uuidv4();
    return id;
  }
}
