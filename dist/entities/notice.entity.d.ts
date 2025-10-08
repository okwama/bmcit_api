import { User } from './user.entity';
export declare class Notice {
    id: number;
    title: string;
    content: string;
    createdBy: number;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    creator: User;
}
