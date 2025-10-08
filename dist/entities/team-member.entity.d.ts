import { Team } from './team.entity';
import { User } from './user.entity';
export declare class TeamMember {
    teamId: number;
    staffId: number;
    createdAt: Date;
    team: Team;
    staff: User;
}
