import { Repository } from 'typeorm';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { TeamMember } from '../entities/team-member.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { CloudinaryService } from '../services/cloudinary.service';
export declare class TeamsService {
    private teamRepository;
    private userRepository;
    private teamMemberRepository;
    private cloudinaryService;
    constructor(teamRepository: Repository<Team>, userRepository: Repository<User>, teamMemberRepository: Repository<TeamMember>, cloudinaryService: CloudinaryService);
    create(createTeamDto: CreateTeamDto, user: any): Promise<Team>;
    findAll(user: any): Promise<Team[] | Team[][]>;
    getMyTeam(user: any): Promise<Team[]>;
    getTeamMembers(teamId: number, user: any): Promise<User[]>;
    findOne(id: number, user: any): Promise<Team>;
    update(id: number, updateTeamDto: UpdateTeamDto, user: any): Promise<Team>;
    remove(id: number, user: any): Promise<{
        message: string;
    }>;
    addStaffToTeam(body: any, photo: any): Promise<{
        id: number;
        name: string;
        phone: string;
        role: string;
        employeeNumber: string;
        idNumber: number;
        photoUrl: string;
        status: number;
        createdAt: Date;
        message: string;
    }>;
    private canAccessTeam;
}
