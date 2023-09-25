import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('product_cover_images')
export class ProductCoverImage {
  @PrimaryColumn()
  cover_image_id: string = this.generateCustomId();

  @ManyToOne(() => Product, (product) => product.coverImages)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  image_url: string;

  generateCustomId(): string {
    const id = uuidv4();
    return `cover-image-${id}`;
  }
}
