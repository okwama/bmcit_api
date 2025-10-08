import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum SosStatus {
  ACTIVE = 'active',
  RESOLVED = 'resolved',
  CANCELLED = 'cancelled',
}

@Entity('sos')
export class Sos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sos_type', type: 'varchar', length: 191, default: 'sos' })
  sosType: string;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ type: 'varchar', length: 191, default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'guard_name', type: 'varchar', length: 255 })
  guardName: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ name: 'guard_id', type: 'int' })
  guardId: number;

  // Relations
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'guard_id' })
  staff: User;
}

