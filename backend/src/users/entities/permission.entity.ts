import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Role } from './role.entity';
@Entity('permissions')
@Unique(['permission_name'])
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({ type: 'varchar', length: 50 })
  permission_name: string;

  @Column({ type: 'text', nullable: true })
  permission_description: string | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  update_at: Date;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
