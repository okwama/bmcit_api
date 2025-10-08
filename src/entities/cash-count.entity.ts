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
import { Request } from './request.entity';

@Entity('cash_counts')
export class CashCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_id', nullable: true })
  requestId: number;

  @Column({ name: 'staff_id', nullable: true })
  staffId: number;

  @Column({ default: 0 })
  ones: number;

  @Column({ default: 0 })
  fives: number;

  @Column({ default: 0 })
  tens: number;

  @Column({ default: 0 })
  twenties: number;

  @Column({ default: 0 })
  fifties: number;

  @Column({ default: 0 })
  hundreds: number;

  @Column({ default: 0 })
  twoHundreds: number;

  @Column({ default: 0 })
  fiveHundreds: number;

  @Column({ default: 0 })
  thousands: number;

  @Column({ name: 'totalAmount', type: 'int', default: 0 })
  totalAmount: number;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ name: 'sealNumber', type: 'varchar', length: 191, nullable: true })
  sealNumber: string;

  @Column({ name: 'imagePath', type: 'varchar', length: 191, nullable: true })
  imagePath: string;

  @Column({ name: 'status', type: 'enum', enum: ['pending', 'received'], default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Request, (request) => request.cashCounts, { nullable: true })
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @ManyToOne(() => User, (user) => user.cashCounts, { nullable: true })
  @JoinColumn({ name: 'staff_id' })
  staff: User;
}

