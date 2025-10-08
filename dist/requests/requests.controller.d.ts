import { RequestsService } from './requests.service';
import type { CreateRequestDto, UpdateRequestStatusDto } from './requests.service';
import { RequestStatus } from '../entities/request.entity';
export declare class RequestsController {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    create(createRequestDto: CreateRequestDto, req: any): Promise<import("../entities/request.entity").Request>;
    findAll(req: any): Promise<import("../entities/request.entity").Request[]>;
    getTodayRequests(req: any): Promise<import("../entities/request.entity").Request[]>;
    getPendingRequests(req: any): Promise<import("../entities/request.entity").Request[]>;
    getInProgressRequests(req: any): Promise<import("../entities/request.entity").Request[]>;
    getCompletedRequests(req: any): Promise<import("../entities/request.entity").Request[]>;
    getRequestsByStatus(status: RequestStatus, req: any): Promise<import("../entities/request.entity").Request[]>;
    findOne(id: number, req: any): Promise<import("../entities/request.entity").Request>;
    updateStatus(id: number, updateStatusDto: UpdateRequestStatusDto, req: any): Promise<import("../entities/request.entity").Request>;
    saveCashCount(id: number, cashCountDto: any, req: any): Promise<import("../entities/cash-count.entity").CashCount>;
    completeDelivery(id: number, deliveryDto: {
        requestId: number;
        latitude: number;
        longitude: number;
        notes?: string;
        recipientName?: string;
        isVaultOfficer?: boolean;
        photoUrl?: string;
        bankingSlipUrl?: string;
    }, req: any): Promise<import("../entities/request.entity").Request>;
}
