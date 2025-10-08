import { User } from './user.entity';
import { Request } from './request.entity';
export declare class CrewLocation {
    id: number;
    requestId: number;
    staffId: number;
    latitude: number;
    longitude: number;
    capturedAt: Date;
    request: Request;
    staff: User;
}
