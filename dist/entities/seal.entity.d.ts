import { Request } from './request.entity';
import { DeliveryCompletion } from './delivery-completion.entity';
export declare enum SealStatus {
    BROKEN = "broken",
    ASSIGNED = "assigned",
    RE_ASSIGNED = "re_assigned"
}
export declare class Seal {
    id: number;
    sealNumber: string;
    confirmed: boolean;
    confirmedAt: Date;
    confirmedById: number;
    status: SealStatus;
    createdAt: Date;
    updatedAt: Date;
    requests: Request[];
    completions: DeliveryCompletion[];
}
