import { Request } from './request.entity';
import { CrewLocation } from './crew-location.entity';
import { Sos } from './sos.entity';
import { CashCount } from './cash-count.entity';
import { Role } from './role.entity';
export declare enum UserRole {
    ADMIN = "admin",
    SUPERVISOR = "supervisor",
    CREW_COMMANDER = "crew_commander",
    SECURITY_GUARD = "security_guard",
    VAULT_OFFICER = "vault_officer"
}
export declare class User {
    id: number;
    name: string;
    phone: string;
    password: string;
    roleId: number;
    employeeNumber: string;
    idNumber: number;
    photoUrl: string;
    status: number;
    createdAt: Date;
    assignedRequests: Request[];
    locations: CrewLocation[];
    sosAlerts: Sos[];
    cashCounts: CashCount[];
    role: string;
    roleEntity: Role;
}
