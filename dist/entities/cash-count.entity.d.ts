import { User } from './user.entity';
import { Request } from './request.entity';
export declare class CashCount {
    id: number;
    requestId: number;
    staffId: number;
    ones: number;
    fives: number;
    tens: number;
    twenties: number;
    fifties: number;
    hundreds: number;
    twoHundreds: number;
    fiveHundreds: number;
    thousands: number;
    totalAmount: number;
    imageUrl: string;
    sealNumber: string;
    imagePath: string;
    status: string;
    createdAt: Date;
    request: Request;
    staff: User;
}
