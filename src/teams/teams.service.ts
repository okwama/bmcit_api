import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { TeamMember } from '../entities/team-member.entity';
import { CreateTeamDto, UpdateTeamDto, CreateStaffDto } from './dto/team.dto';
import { CloudinaryService } from '../services/cloudinary.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createTeamDto: CreateTeamDto, user: any) {
    // Only supervisors and admins can create teams
    if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only supervisors and admins can create teams');
    }

    const team = this.teamRepository.create(createTeamDto);
    return await this.teamRepository.save(team);
  }

  async findAll(user: any) {
    // Role-based filtering
    if (user.role === 'ADMIN') {
      return await this.teamRepository.find({
        relations: ['crewCommander'],
      });
    } else if (user.role === 'SUPERVISOR') {
      return await this.teamRepository.find({
        relations: ['crewCommander'],
      });
    } else {
      // For crew commanders and security guards, return only their team
      const myTeam = await this.getMyTeam(user);
      return myTeam ? [myTeam] : [];
    }
  }

  async getMyTeam(user: any) {
    // Find all teams where the user is a member
    const teamMemberships = await this.teamMemberRepository.find({
      where: { staffId: user.id },
      relations: ['team', 'team.crewCommander'],
    });

    // Return all teams the user is part of
    return teamMemberships.map(membership => membership.team);
  }

  async getTeamMembers(teamId: number, user: any) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['crewCommander'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Check if user has access to this team
    if (!this.canAccessTeam(team, user)) {
      throw new ForbiddenException('Access denied to this team');
    }

    // Fetch all team members
    const teamMembers = await this.teamMemberRepository.find({
      where: { teamId: teamId },
      relations: ['staff'],
    });

    return teamMembers.map(member => member.staff);
  }

  async findOne(id: number, user: any) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['crewCommander'],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // Check if user has access to this team
    if (!this.canAccessTeam(team, user)) {
      throw new ForbiddenException('Access denied to this team');
    }

    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto, user: any) {
    const team = await this.findOne(id, user);

    // Only supervisors and admins can update teams
    if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Only supervisors and admins can update teams');
    }

    Object.assign(team, updateTeamDto);
    return await this.teamRepository.save(team);
  }

  async remove(id: number, user: any) {
    const team = await this.findOne(id, user);

    // Only admins can delete teams
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete teams');
    }

    await this.teamRepository.remove(team);
    return { message: 'Team deleted successfully' };
  }

  async addStaffToTeam(body: any, photo: any) {
    // Handle photo upload to Cloudinary
    let photoUrl: string | undefined = undefined;
    
    if (photo) {
      try {
        const uploadResult = await this.cloudinaryService.uploadImage(photo, 'bm_security/staff');
        photoUrl = uploadResult.url;
        // Store public_id in a comment or separate field if needed later
        console.log('Photo uploaded to Cloudinary:', uploadResult.public_id);
      } catch (error) {
        console.error('Photo upload failed:', error);
        // Continue without photo if upload fails
        photoUrl = undefined;
      }
    }

    // Create new staff member with status 0 (pending approval)
    const newStaff = this.userRepository.create({
      name: body.name || 'Unknown',
      phone: body.phone || null,
      role: body.role || 'Security Guard',
      employeeNumber: body.employeeNumber || `EMP${Date.now()}`,
      idNumber: body.idNumber ? parseInt(body.idNumber.toString()) : undefined,
      status: 0, // Pending approval
      roleId: 0, // Default role ID
      photoUrl: photoUrl,
    });

    const savedStaff = await this.userRepository.save(newStaff);

    // Return staff data without password
    return {
      id: savedStaff.id,
      name: savedStaff.name,
      phone: savedStaff.phone,
      role: savedStaff.role,
      employeeNumber: savedStaff.employeeNumber,
      idNumber: savedStaff.idNumber,
      photoUrl: savedStaff.photoUrl,
      status: savedStaff.status,
      createdAt: savedStaff.createdAt,
      message: 'Staff member added successfully. Pending admin approval.',
    };
  }

  private canAccessTeam(team: Team, user: any): boolean {
    // Admins and supervisors can access all teams
    if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
      return true;
    }

    // Crew commanders can access their own team
    return team.crewCommander?.id === user.id;
  }
}
