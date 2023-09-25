import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('product_images')
export class ProductImage {
  @PrimaryColumn()
  image_id: string = this.generateCustomId();

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  image_url: string;

  generateCustomId(): string {
    const id = uuidv4();
    return `image-id-${id}`;
  }
}
