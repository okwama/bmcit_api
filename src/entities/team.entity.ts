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
import { User } from './user.entity';
import { Request } from './request.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'crew_commander_id', nullable: true })
  crewCommanderId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // updatedAt column removed - not in database schema

  // Relations
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'crew_commander_id' })
  crewCommander: User;

  // Note: team members relationship is handled via team_members table
  // @OneToMany(() => User, (user) => user.team)
  // members: User[];

  @OneToMany(() => Request, (request) => request.assignedTeam)
  assignedRequests: Request[];
}
