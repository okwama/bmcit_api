import { Request } from './request.entity';
import { User } from './user.entity';
import { Seal } from './seal.entity';
export declare class DeliveryCompletion {
    id: number;
    requestId: number;
    completedById: number;
    completedByName: string;
    completedAt: Date;
    notes: string;
    photoUrl: string;
    latitude: number;
    longitude: number;
    status: string;
    isVaultOfficer: boolean;
    receivingOfficerId: number;
    receivingOfficerName: string;
    sealNumberId: number;
    bankDetails: any;
    request: Request;
    completedBy: User;
    seal: Seal;
}
