import { User } from './user.entity';
import { Request } from './request.entity';
export declare class Team {
    id: number;
    name: string;
    crewCommanderId: number;
    createdAt: Date;
    crewCommander: User;
    assignedRequests: Request[];
}
