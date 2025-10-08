import { User } from './user.entity';
export declare enum SosStatus {
    ACTIVE = "active",
    RESOLVED = "resolved",
    CANCELLED = "cancelled"
}
export declare class Sos {
    id: number;
    sosType: string;
    latitude: number;
    longitude: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    guardName: string;
    comment: string;
    guardId: number;
    staff: User;
}
