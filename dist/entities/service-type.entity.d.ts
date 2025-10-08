import { Request } from './request.entity';
export declare class ServiceType {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    requests: Request[];
}
