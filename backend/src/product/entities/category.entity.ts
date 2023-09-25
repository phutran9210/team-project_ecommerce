import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  category_id: string = this.generateCustomId();

  @Column()
  category_name: string;

  @ManyToOne(() => Product, (product) => product.categories)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column('text', { nullable: true })
  category_description: string;

  generateCustomId(): string {
    const id = uuidv4();
    return `categoty-id-${id}`;
  }
}
