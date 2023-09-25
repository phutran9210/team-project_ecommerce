import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { DiscountCode } from './discount_code.entity';

@Entity('discount_code_mapping')
export class DiscountCodeMapping {
  @PrimaryGeneratedColumn()
  mapping_id: number;

  @ManyToOne(() => DiscountCode)
  @JoinColumn({ name: 'discount_code_id' })
  discountCode: DiscountCode;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
