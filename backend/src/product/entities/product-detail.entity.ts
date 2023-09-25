import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity'; // Đảm bảo đường dẫn này đúng với vị trí của file product.entity.ts
import { v4 as uuidv4 } from 'uuid';

@Entity('product_details')
export class ProductDetail {
  @PrimaryColumn()
  detail_id: string = this.generateCustomId();

  @Column()
  product_id: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_categories: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  price: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  quantity: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sale: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_status: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  image_description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  model: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dimensions: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  drivers: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  weight: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  engraving: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  impedance: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  battery_life: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  analog_headphone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_connection: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  wired_digital_headphone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cables: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ear_coupling: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  talk_microphones: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  anc_microphones: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  atena: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ear_pads: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bluetooth_profile: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  voice_assistant: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sale_time: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  active_noise_cancelling: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ambient_listening_modes: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  audio_format: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  charging_case_battery_life: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  charging_case_time_cable: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  charging_case_time_wireless: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  connectivity_between: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  connectivity_distance: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  earphone_battery_life: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  earphone_charge_time: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  material: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  microphone_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sport_earphones: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  waterproof_level: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  max_output: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  input: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  in_the_box: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  compatibility: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  power_supply: string;

  @ManyToOne(() => Product, (product) => product.details)
  @JoinColumn({ name: 'product_id' }) // Đặt tên cột khóa ngoại
  product: Product;

  generateCustomId(): string {
    const id = uuidv4();
    return `product-detail-id-${id}`;
  }
}
