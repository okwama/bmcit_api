import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';
import { ServiceType } from './service-type.entity';
import { CrewLocation } from './crew-location.entity';
import { CashCount } from './cash-count.entity';
import { DeliveryCompletion } from './delivery-completion.entity';
import { Client } from './client.entity';
import { Seal } from './seal.entity';

export enum RequestStatus {
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  CANCELLED = 0,
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum JobType {
  PICK_AND_DROP = 'pick_and_drop',
  BSS = 'bss',
  CDM_COLLECTION = 'cdm_collection',
  ATM_LOADING = 'atm_loading',
  AIRLIFT = 'airlift',
}

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'user_name', length: 255 })
  userName: string;

  @Column({ name: 'service_type_id' })
  serviceTypeId: number;

  @Column({ type: 'decimal', precision: 11, scale: 2 })
  price: number;

  @Column({ name: 'pickup_location', length: 255 })
  pickupLocation: string;

  @Column({ name: 'delivery_location', length: 255 })
  deliveryLocation: string;

  @Column({ name: 'pickup_date', type: 'datetime' })
  pickupDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Priority, default: Priority.MEDIUM })
  priority: Priority;

  @Column({ name: 'my_status', type: 'tinyint', default: 0 })
  myStatus: number;

  @Column({ name: 'staff_id', nullable: true })
  staffId: number;

  @Column({ name: 'atm_id', nullable: true })
  atmId: number;

  @Column({ name: 'staff_name', length: 191, nullable: true })
  staffName: string;

  @Column({ name: 'team_id', nullable: true })
  teamId: number;

  @Column({ type: 'double', nullable: true })
  latitude: number;

  @Column({ type: 'double', nullable: true })
  longitude: number;

  @Column({ name: 'branch_id', nullable: true })
  branchId: number;

  @Column({ name: 'sealNumberId', nullable: true })
  sealNumberId: number;

  @Column({ name: 'client_name', length: 100, nullable: true })
  clientName: string;

  @Column({ length: 20, nullable: true })
  status: string;

  @Column({ name: 'destination_type', type: 'enum', enum: ['vault', 'bank'], default: 'vault' })
  destinationType: 'vault' | 'bank';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.assignedRequests, { nullable: true })
  @JoinColumn({ name: 'staff_id' })
  assignedStaff: User;

  @ManyToOne(() => Team, (team) => team.assignedRequests, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  assignedTeam: Team;

  @ManyToOne(() => ServiceType, { nullable: false })
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceType;

  @OneToMany(() => CrewLocation, (location) => location.request)
  locations: CrewLocation[];

  @OneToMany(() => CashCount, (cashCount) => cashCount.request)
  cashCounts: CashCount[];

  @OneToMany(() => DeliveryCompletion, (completion) => completion.request)
  completions: DeliveryCompletion[];

  // Client relation removed - client_id column doesn't exist in database

  @ManyToOne(() => Seal, { nullable: true })
  @JoinColumn({ name: 'sealNumberId' })
  seal: Seal;
}
