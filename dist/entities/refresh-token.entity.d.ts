import { User } from './user.entity';
export declare class RefreshToken {
    id: number;
    token: string;
    userId: number;
    user: User;
    expiresAt: Date;
    isActive: boolean;
    deviceInfo: string;
    ipAddress: string;
    createdAt: Date;
    updatedAt: Date;
    isExpired(): boolean;
    isValid(): boolean;
}
