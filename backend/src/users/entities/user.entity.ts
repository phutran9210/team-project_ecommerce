// src/entities/user.entity.ts

import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import {ActivityLog } from "../../activity_log/entities/activity.entity"

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 255 })
  user_password: string;

  @Column({ type: 'varchar', default: 'active' })
  user_status;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({ type: 'varchar', nullable: true })
  verification_code: string;

  @Column({ type: 'timestamp', nullable: true })
  verification_expires: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    nullable: true,
  })
  update_at: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'role_id' },
  })
  roles: Role[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activities: ActivityLog[];
}
