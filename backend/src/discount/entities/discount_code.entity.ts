import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { DiscountCodeMapping } from './discount_maping.entity';

@Entity('discount_code')
@Unique(['code_discount'])
export class DiscountCode {
  @PrimaryGeneratedColumn()
  discount_code_id: number;

  @Column({ type: 'varchar', length: 50 })
  code_discount: string;

  @Column({ type: 'text', nullable: true })
  discount_description: string;

  @Column({ type: 'int' })
  discount_amount: number;

  @Column({ type: 'timestamp', nullable: true, default: null })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  end_date: Date;

  @Column({ type: 'int', nullable: true })
  use_limit: number;

  @Column({
    type: 'enum',
    enum: ['product', 'order'],
    default: 'product',
  })
  discount_scope: 'product' | 'order';

  @OneToMany(
    () => DiscountCodeMapping,
    (discountCodeMapping) => discountCodeMapping.discountCode,
  )
  discountCodeMappings: DiscountCodeMapping[];
}
