import { Repository } from 'typeorm';
import { Request, RequestStatus, JobType } from '../entities/request.entity';
import { User } from '../entities/user.entity';
import { Team } from '../entities/team.entity';
import { ServiceType } from '../entities/service-type.entity';
import { CashCount } from '../entities/cash-count.entity';
import { DeliveryCompletion } from '../entities/delivery-completion.entity';
export interface CreateRequestDto {
    serviceTypeId: number;
    pickupLocation: string;
    deliveryLocation: string;
    description?: string;
    expectedPickupTime?: Date;
    expectedDeliveryTime?: Date;
    assignedStaffId?: number;
    assignedTeamId?: number;
    clientId?: number;
    branchId?: number;
    jobType?: JobType;
}
export interface UpdateRequestStatusDto {
    status: RequestStatus;
    notes?: string;
    actualPickupTime?: Date;
    actualDeliveryTime?: Date;
}
export declare class RequestsService {
    private requestRepository;
    private userRepository;
    private teamRepository;
    private serviceTypeRepository;
    private cashCountRepository;
    private deliveryCompletionRepository;
    constructor(requestRepository: Repository<Request>, userRepository: Repository<User>, teamRepository: Repository<Team>, serviceTypeRepository: Repository<ServiceType>, cashCountRepository: Repository<CashCount>, deliveryCompletionRepository: Repository<DeliveryCompletion>);
    create(createRequestDto: CreateRequestDto, createdBy: User): Promise<Request>;
    findAll(user: User): Promise<Request[]>;
    getPendingRequests(user: User): Promise<Request[]>;
    getInProgressRequests(user: User): Promise<Request[]>;
    getCompletedRequests(user: User): Promise<Request[]>;
    findOne(id: number, user: User): Promise<Request>;
    updateStatus(id: number, updateStatusDto: UpdateRequestStatusDto, user: User): Promise<Request>;
    getRequestsByStatus(status: RequestStatus, user: User): Promise<Request[]>;
    getTodayRequests(user: User): Promise<Request[]>;
    private checkRequestAccess;
    private validateStatusTransition;
    private applyRoleFilter;
    saveCashCount(requestId: number, cashCountDto: any, user: User): Promise<CashCount>;
    completeDelivery(requestId: number, deliveryDto: any, user: User): Promise<Request>;
}
