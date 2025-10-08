import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Request } from './request.entity';

@Entity('crew_locations')
export class CrewLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_id' })
  requestId: number;

  @Column({ name: 'staff_id' })
  staffId: number;

  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @CreateDateColumn({ name: 'captured_at' })
  capturedAt: Date;

  // Relations
  @ManyToOne(() => Request, (request) => request.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @ManyToOne(() => User, (user) => user.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'staff_id' })
  staff: User;
}

