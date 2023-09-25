import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductDetail } from './product-detail.entity';
import { ProductImage } from './product-image.entity';
import { ProductCoverImage } from './product-cover-image.entity';
import { Category } from './category.entity';
import { v4 as uuidv4 } from 'uuid';
import { Exclude } from 'class-transformer';
import { CartDetail } from '../../carts/entities/cart-detail.entity';
import { DiscountCodeMapping } from '../../discount/entities/discount_maping.entity';
import { OrderDetail } from '../../payment/entities/order_details.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  product_id: string = this.generateCustomId();

  @Column()
  product_name: string;

  @Column('text', { nullable: true })
  product_description: string;

  @Column('varchar')
  product_type: string;

  @Column('int')
  price: number;

  @Column('int')
  onSale: number;

  @Column('timestamp', { nullable: true })
  sale_start: Date;

  @Column('timestamp', { nullable: true })
  sale_end: Date;

  @Column({ type: 'boolean', default: false })
  @Exclude()
  disable_status: boolean;

  @Column('boolean', { nullable: true })
  engraving: boolean;

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  primary_img: string;

  // Relationships
  @OneToMany(() => ProductDetail, (detail) => detail.product, { cascade: true })
  details: ProductDetail[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => ProductCoverImage, (coverImage) => coverImage.product, {
    cascade: true,
  })
  coverImages: ProductCoverImage[];

  @OneToMany(() => Category, (category) => category.product, { cascade: true })
  categories: Category[];

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.product)
  cartDetails: CartDetail[];

  @OneToMany(
    () => DiscountCodeMapping,
    (discountCodeMapping) => discountCodeMapping.product,
  )
  discountCodeMappings: DiscountCodeMapping[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
  cart_id: number;

  generateCustomId(): string {
    const id = uuidv4();
    return `product-id-${id}`;
  }
}
