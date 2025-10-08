import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    create(createTeamDto: CreateTeamDto, req: any): Promise<import("../entities/team.entity").Team>;
    findAll(req: any): Promise<import("../entities/team.entity").Team[] | import("../entities/team.entity").Team[][]>;
    getMyTeam(req: any): Promise<import("../entities/team.entity").Team[]>;
    getTeamMembers(teamId: number, req: any): Promise<import("../entities/user.entity").User[]>;
    findOne(id: number, req: any): Promise<import("../entities/team.entity").Team>;
    update(id: number, updateTeamDto: UpdateTeamDto, req: any): Promise<import("../entities/team.entity").Team>;
    remove(id: number, req: any): Promise<{
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
}
