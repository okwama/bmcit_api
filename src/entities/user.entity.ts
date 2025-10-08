import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Team } from './team.entity';
import { Request } from './request.entity';
import { CrewLocation } from './crew-location.entity';
import { Sos } from './sos.entity';
import { CashCount } from './cash-count.entity';
import { Role } from './role.entity';

export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  CREW_COMMANDER = 'crew_commander',
  SECURITY_GUARD = 'security_guard',
  VAULT_OFFICER = 'vault_officer',
}

@Entity('staff')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 255, nullable: true })
  @Exclude()
  password: string;

  @Column({ name: 'role_id', default: 0 })
  roleId: number;

  // roleName column removed - using role instead

  @Column({ name: 'empl_no', length: 100 })
  employeeNumber: string;

  @Column({ name: 'id_no', nullable: true })
  idNumber: number;

  @Column({ name: 'photo_url', length: 200, nullable: true })
  photoUrl: string;

  @Column({ default: 0 })
  status: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime', precision: 3, nullable: true })
  createdAt: Date;

  // updatedAt column removed - not in database schema

  // Note: team relationship is handled via team_members table, not direct foreign key

  @OneToMany(() => Request, (request) => request.assignedStaff)
  assignedRequests: Request[];

  @OneToMany(() => CrewLocation, (location) => location.staff)
  locations: CrewLocation[];

  @OneToMany(() => Sos, (sos) => sos.staff)
  sosAlerts: Sos[];

  @OneToMany(() => CashCount, (cashCount) => cashCount.staff)
  cashCounts: CashCount[];

  @Column({ name: 'role', length: 200 })
  role: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  roleEntity: Role;
}
