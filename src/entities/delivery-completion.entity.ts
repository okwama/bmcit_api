import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from './request.entity';
import { User } from './user.entity';
import { Seal } from './seal.entity';

@Entity('delivery_completion')
export class DeliveryCompletion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'requestId' })
  requestId: number;

  @Column({ name: 'completedById' })
  completedById: number;

  @Column({ name: 'completedByName', length: 191 })
  completedByName: string;

  @Column({ name: 'completedAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(3)' })
  completedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  photoUrl: string;

  @Column({ type: 'double', nullable: true })
  latitude: number;

  @Column({ type: 'double', nullable: true })
  longitude: number;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ name: 'isVaultOfficer', type: 'boolean', default: false })
  isVaultOfficer: boolean;

  @Column({ name: 'receivingOfficerId', nullable: true })
  receivingOfficerId: number;

  @Column({ name: 'receivingOfficerName', length: 191, nullable: true })
  receivingOfficerName: string;

  @Column({ name: 'sealNumberId', nullable: true })
  sealNumberId: number;

  @Column({ name: 'bankDetails', type: 'json', nullable: true })
  bankDetails: any;

  // Relations
  @ManyToOne(() => Request, (request) => request.completions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'requestId' })
  request: Request;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'completedById' })
  completedBy: User;

  @ManyToOne(() => Seal, { nullable: true })
  @JoinColumn({ name: 'sealNumberId' })
  seal: Seal;
}

