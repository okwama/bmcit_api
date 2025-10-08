import { User } from './user.entity';
import { Team } from './team.entity';
import { ServiceType } from './service-type.entity';
import { CrewLocation } from './crew-location.entity';
import { CashCount } from './cash-count.entity';
import { DeliveryCompletion } from './delivery-completion.entity';
import { Seal } from './seal.entity';
export declare enum RequestStatus {
    PENDING = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3,
    CANCELLED = 0
}
export declare enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare enum JobType {
    PICK_AND_DROP = "pick_and_drop",
    BSS = "bss",
    CDM_COLLECTION = "cdm_collection",
    ATM_LOADING = "atm_loading",
    AIRLIFT = "airlift"
}
export declare class Request {
    id: number;
    userId: number;
    userName: string;
    serviceTypeId: number;
    price: number;
    pickupLocation: string;
    deliveryLocation: string;
    pickupDate: Date;
    description: string;
    priority: Priority;
    myStatus: number;
    staffId: number;
    atmId: number;
    staffName: string;
    teamId: number;
    latitude: number;
    longitude: number;
    branchId: number;
    sealNumberId: number;
    clientName: string;
    status: string;
    destinationType: 'vault' | 'bank';
    createdAt: Date;
    updatedAt: Date;
    assignedStaff: User;
    assignedTeam: Team;
    serviceType: ServiceType;
    locations: CrewLocation[];
    cashCounts: CashCount[];
    completions: DeliveryCompletion[];
    seal: Seal;
}
