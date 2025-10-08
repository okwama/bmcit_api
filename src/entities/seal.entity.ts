import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Request } from './request.entity';
import { DeliveryCompletion } from './delivery-completion.entity';

export enum SealStatus {
  BROKEN = 'broken',
  ASSIGNED = 'assigned',
  RE_ASSIGNED = 're_assigned',
}

@Entity('seals')
export class Seal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seal_number', length: 255, unique: true })
  sealNumber: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ name: 'confirmed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  confirmedAt: Date;

  @Column({ name: 'confirmed_by_id' })
  confirmedById: number;

  @Column({ type: 'enum', enum: SealStatus, default: SealStatus.ASSIGNED })
  status: SealStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Request, (request) => request.seal)
  requests: Request[];

  @OneToMany(() => DeliveryCompletion, (completion) => completion.seal)
  completions: DeliveryCompletion[];
}
