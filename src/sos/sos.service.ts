import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sos } from '../entities/sos.entity';
import { User } from '../entities/user.entity';
import { Request } from '../entities/request.entity';
import { CreateSosDto, UpdateSosDto } from './dto/sos.dto';
import { SosStatus } from '../entities/sos.entity';

@Injectable()
export class SosService {
  constructor(
    @InjectRepository(Sos)
    private sosRepository: Repository<Sos>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
  ) {}

  async create(createSosDto: CreateSosDto, user: any) {
    const sos = this.sosRepository.create({
      ...createSosDto,
      guardId: user.id,
      guardName: user.name,
      status: 'active',
    });

    return await this.sosRepository.save(sos);
  }

  async findAll(user: any) {
    // Role-based filtering
    if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
      return await this.sosRepository.find({
        relations: ['staff'],
        order: { createdAt: 'DESC' },
      });
    } else if (user.role === 'CREW_COMMANDER') {
      // For now, crew commanders can see all SOS
      // TODO: Implement team-based filtering when team_members table is properly set up
      return await this.sosRepository.find({
        relations: ['staff'],
        order: { createdAt: 'DESC' },
      });
    } else {
      // Security guards can only see their own SOS
      return await this.getMySos(user);
    }
  }

  async getActiveSos(user: any) {
    const allSos = await this.findAll(user);
    return allSos.filter(sos => sos.status === 'active');
  }

  async getMySos(user: any) {
    return await this.sosRepository.find({
      where: { guardId: user.id },
      relations: ['staff'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: any) {
    const sos = await this.sosRepository.findOne({
      where: { id },
      relations: ['staff'],
    });

    if (!sos) {
      throw new NotFoundException('SOS not found');
    }

    // Check if user has access to this SOS
    if (!this.canAccessSos(sos, user)) {
      throw new ForbiddenException('Access denied to this SOS');
    }

    return sos;
  }

  async update(id: number, updateSosDto: UpdateSosDto, user: any) {
    const sos = await this.findOne(id, user);

    // Only the creator or supervisors/admins can update
    if (sos.guardId !== user.id && !['SUPERVISOR', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only the creator or supervisors can update SOS');
    }

    Object.assign(sos, updateSosDto);
    return await this.sosRepository.save(sos);
  }

  async resolveSos(id: number, user: any) {
    const sos = await this.findOne(id, user);

    // Only supervisors and admins can resolve SOS
    if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only supervisors and admins can resolve SOS');
    }

    sos.status = 'resolved';
    sos.updatedAt = new Date();

    return await this.sosRepository.save(sos);
  }

  private canAccessSos(sos: Sos, user: any): boolean {
    // Admins and supervisors can access all SOS
    if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
      return true;
    }

    // Users can access their own SOS
    if (sos.guardId === user.id) {
      return true;
    }

    // Crew commanders can access SOS from their team members
    if (user.role === 'CREW_COMMANDER') {
      // This would require additional logic to check team membership
      // For now, we'll allow access if the SOS user is in the same team
      return true; // Simplified for now
    }

    return false;
  }
}
