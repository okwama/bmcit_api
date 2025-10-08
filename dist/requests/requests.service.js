"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_entity_1 = require("../entities/request.entity");
const user_entity_1 = require("../entities/user.entity");
const team_entity_1 = require("../entities/team.entity");
const service_type_entity_1 = require("../entities/service-type.entity");
const cash_count_entity_1 = require("../entities/cash-count.entity");
const delivery_completion_entity_1 = require("../entities/delivery-completion.entity");
let RequestsService = class RequestsService {
    requestRepository;
    userRepository;
    teamRepository;
    serviceTypeRepository;
    cashCountRepository;
    deliveryCompletionRepository;
    constructor(requestRepository, userRepository, teamRepository, serviceTypeRepository, cashCountRepository, deliveryCompletionRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.serviceTypeRepository = serviceTypeRepository;
        this.cashCountRepository = cashCountRepository;
        this.deliveryCompletionRepository = deliveryCompletionRepository;
    }
    async create(createRequestDto, createdBy) {
        const serviceType = await this.serviceTypeRepository.findOne({
            where: { id: createRequestDto.serviceTypeId },
        });
        if (!serviceType) {
            throw new common_1.NotFoundException('Service type not found');
        }
        if (createRequestDto.assignedStaffId) {
            const staff = await this.userRepository.findOne({
                where: { id: createRequestDto.assignedStaffId },
            });
            if (!staff) {
                throw new common_1.NotFoundException('Assigned staff not found');
            }
        }
        if (createRequestDto.assignedTeamId) {
            const team = await this.teamRepository.findOne({
                where: { id: createRequestDto.assignedTeamId },
            });
            if (!team) {
                throw new common_1.NotFoundException('Assigned team not found');
            }
        }
        const request = this.requestRepository.create({
            ...createRequestDto,
            userId: createdBy.id,
            userName: createdBy.name,
            price: 0,
        });
        return this.requestRepository.save(request);
    }
    async findAll(user) {
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .leftJoinAndSelect('request.serviceType', 'serviceType')
            .leftJoinAndSelect('request.assignedStaff', 'assignedStaff')
            .leftJoinAndSelect('request.assignedTeam', 'assignedTeam')
            .where('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC');
        return queryBuilder.getMany();
    }
    async getPendingRequests(user) {
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .select([
            'request.id',
            'request.userId',
            'request.userName',
            'request.serviceTypeId',
            'request.price',
            'request.pickupLocation',
            'request.deliveryLocation',
            'request.pickupDate',
            'request.description',
            'request.priority',
            'request.myStatus',
            'request.staffId',
            'request.staffName',
            'request.teamId',
            'request.latitude',
            'request.longitude',
            'request.destinationType',
            'request.createdAt',
        ])
            .leftJoin('request.serviceType', 'serviceType')
            .addSelect(['serviceType.id', 'serviceType.name', 'serviceType.description'])
            .leftJoin('request.assignedStaff', 'assignedStaff')
            .addSelect(['assignedStaff.id', 'assignedStaff.name', 'assignedStaff.phone', 'assignedStaff.role'])
            .leftJoin('request.assignedTeam', 'assignedTeam')
            .addSelect(['assignedTeam.id', 'assignedTeam.name'])
            .where('request.myStatus = :status', { status: 1 })
            .andWhere('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC')
            .cache(60000);
        return queryBuilder.getMany();
    }
    async getInProgressRequests(user) {
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .select([
            'request.id',
            'request.userId',
            'request.userName',
            'request.serviceTypeId',
            'request.price',
            'request.pickupLocation',
            'request.deliveryLocation',
            'request.pickupDate',
            'request.description',
            'request.priority',
            'request.myStatus',
            'request.staffId',
            'request.staffName',
            'request.teamId',
            'request.latitude',
            'request.longitude',
            'request.destinationType',
            'request.createdAt',
        ])
            .leftJoin('request.serviceType', 'serviceType')
            .addSelect(['serviceType.id', 'serviceType.name', 'serviceType.description'])
            .leftJoin('request.assignedStaff', 'assignedStaff')
            .addSelect(['assignedStaff.id', 'assignedStaff.name', 'assignedStaff.phone', 'assignedStaff.role'])
            .leftJoin('request.assignedTeam', 'assignedTeam')
            .addSelect(['assignedTeam.id', 'assignedTeam.name'])
            .where('request.myStatus = :status', { status: 2 })
            .andWhere('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC')
            .cache(30000);
        return queryBuilder.getMany();
    }
    async getCompletedRequests(user) {
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .select([
            'request.id',
            'request.userId',
            'request.userName',
            'request.serviceTypeId',
            'request.price',
            'request.pickupLocation',
            'request.deliveryLocation',
            'request.pickupDate',
            'request.description',
            'request.priority',
            'request.myStatus',
            'request.staffId',
            'request.staffName',
            'request.teamId',
            'request.destinationType',
            'request.createdAt',
            'request.updatedAt',
        ])
            .leftJoin('request.serviceType', 'serviceType')
            .addSelect(['serviceType.id', 'serviceType.name'])
            .leftJoin('request.assignedStaff', 'assignedStaff')
            .addSelect(['assignedStaff.id', 'assignedStaff.name'])
            .leftJoin('request.assignedTeam', 'assignedTeam')
            .addSelect(['assignedTeam.id', 'assignedTeam.name'])
            .where('request.myStatus = :status', { status: 3 })
            .andWhere('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC')
            .limit(100)
            .cache(120000);
        return queryBuilder.getMany();
    }
    async findOne(id, user) {
        const request = await this.requestRepository.findOne({
            where: { id },
            relations: [
                'serviceType',
                'assignedStaff',
                'assignedTeam',
            ],
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found');
        }
        this.checkRequestAccess(request, user);
        return request;
    }
    async updateStatus(id, updateStatusDto, user) {
        const request = await this.findOne(id, user);
        this.validateStatusTransition(request.myStatus, updateStatusDto.status);
        request.myStatus = updateStatusDto.status;
        if (updateStatusDto.notes) {
            request.description = updateStatusDto.notes;
        }
        const updatedRequest = await this.requestRepository.save(request);
        if (updateStatusDto.status === request_entity_1.RequestStatus.COMPLETED) {
            const completion = this.deliveryCompletionRepository.create({
                requestId: request.id,
                completedById: user.id,
                completedByName: user.name,
                notes: updateStatusDto.notes,
            });
            await this.deliveryCompletionRepository.save(completion);
        }
        return updatedRequest;
    }
    async getRequestsByStatus(status, user) {
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .leftJoinAndSelect('request.serviceType', 'serviceType')
            .leftJoinAndSelect('request.assignedStaff', 'assignedStaff')
            .leftJoinAndSelect('request.assignedTeam', 'assignedTeam')
            .where('request.myStatus = :status', { status })
            .andWhere('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC');
        return queryBuilder.getMany();
    }
    async getTodayRequests(user) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const queryBuilder = this.requestRepository
            .createQueryBuilder('request')
            .leftJoinAndSelect('request.serviceType', 'serviceType')
            .leftJoinAndSelect('request.assignedStaff', 'assignedStaff')
            .leftJoinAndSelect('request.assignedTeam', 'assignedTeam')
            .where('request.createdAt BETWEEN :start AND :end', {
            start: today,
            end: tomorrow,
        })
            .andWhere('request.staffId = :staffId', { staffId: user.id })
            .orderBy('request.createdAt', 'DESC');
        return queryBuilder.getMany();
    }
    checkRequestAccess(request, user) {
        switch (user.role) {
            case 'Admin':
            case 'Supervisor':
                return;
            case 'Team Leader':
                break;
            case 'Police':
            case 'Driver':
                if (request.staffId !== user.id) {
                    throw new common_1.BadRequestException('Access denied');
                }
                break;
        }
    }
    validateStatusTransition(currentStatus, newStatus) {
        const validTransitions = {
            [request_entity_1.RequestStatus.PENDING]: [request_entity_1.RequestStatus.IN_PROGRESS, request_entity_1.RequestStatus.CANCELLED],
            [request_entity_1.RequestStatus.IN_PROGRESS]: [request_entity_1.RequestStatus.COMPLETED, request_entity_1.RequestStatus.CANCELLED],
            [request_entity_1.RequestStatus.COMPLETED]: [],
            [request_entity_1.RequestStatus.CANCELLED]: [],
        };
        if (!validTransitions[currentStatus].includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition from ${currentStatus} to ${newStatus}`);
        }
    }
    applyRoleFilter(queryBuilder, user) {
        switch (user.role) {
            case 'Admin':
            case 'Supervisor':
                break;
            case 'Team Leader':
                break;
            case 'Police':
            case 'Driver':
                queryBuilder.andWhere('request.staffId = :staffId', { staffId: user.id });
                break;
        }
    }
    async saveCashCount(requestId, cashCountDto, user) {
        try {
            console.log('💾 Saving cash count for request:', requestId);
            console.log('💾 Cash count data:', cashCountDto);
            console.log('💾 User ID:', user.id);
            const request = await this.requestRepository.findOne({
                where: { id: requestId },
            });
            if (!request) {
                throw new Error('Request not found');
            }
            const cashCount = this.cashCountRepository.create({
                requestId: requestId,
                staffId: user.id,
                ones: cashCountDto.ones || 0,
                fives: cashCountDto.fives || 0,
                tens: cashCountDto.tens || 0,
                twenties: cashCountDto.twenties || 0,
                fifties: cashCountDto.fifties || 0,
                hundreds: cashCountDto.hundreds || 0,
                twoHundreds: cashCountDto.twoHundreds || 0,
                fiveHundreds: cashCountDto.fiveHundreds || 0,
                thousands: cashCountDto.thousands || 0,
                totalAmount: cashCountDto.totalAmount || 0,
                imageUrl: cashCountDto.photoUrl || null,
                status: 'pending',
            });
            const savedCashCount = await this.cashCountRepository.save(cashCount);
            console.log('✅ Cash count saved successfully:', savedCashCount.id);
            return savedCashCount;
        }
        catch (error) {
            console.error('❌ Error saving cash count:', error);
            throw error;
        }
    }
    async completeDelivery(requestId, deliveryDto, user) {
        try {
            console.log('🚚 Completing delivery for request:', requestId);
            console.log('🚚 Delivery data:', deliveryDto);
            console.log('🚚 User ID:', user.id);
            const request = await this.requestRepository.findOne({
                where: { id: requestId, staffId: user.id },
            });
            if (!request) {
                throw new Error('Request not found or not assigned to user');
            }
            if (request.myStatus !== request_entity_1.RequestStatus.IN_PROGRESS) {
                throw new Error('Request is not in progress');
            }
            const existingCompletion = await this.deliveryCompletionRepository.findOne({
                where: { requestId: requestId },
            });
            if (existingCompletion) {
                console.log('ℹ️ Delivery completion already exists for request:', requestId);
                existingCompletion.latitude = deliveryDto.latitude;
                existingCompletion.longitude = deliveryDto.longitude;
                existingCompletion.notes = deliveryDto.notes || existingCompletion.notes;
                existingCompletion.photoUrl = deliveryDto.photoUrl || existingCompletion.photoUrl;
                existingCompletion.isVaultOfficer = deliveryDto.isVaultOfficer || existingCompletion.isVaultOfficer;
                existingCompletion.receivingOfficerName = deliveryDto.recipientName || existingCompletion.receivingOfficerName;
                existingCompletion.status = 'completed';
                await this.deliveryCompletionRepository.save(existingCompletion);
            }
            else {
                const deliveryCompletion = this.deliveryCompletionRepository.create({
                    requestId: requestId,
                    completedById: user.id,
                    completedByName: user.name,
                    latitude: deliveryDto.latitude,
                    longitude: deliveryDto.longitude,
                    notes: deliveryDto.notes || null,
                    photoUrl: deliveryDto.photoUrl || null,
                    isVaultOfficer: deliveryDto.isVaultOfficer || false,
                    receivingOfficerName: deliveryDto.recipientName || null,
                    status: 'completed',
                });
                await this.deliveryCompletionRepository.save(deliveryCompletion);
            }
            request.myStatus = request_entity_1.RequestStatus.COMPLETED;
            request.latitude = deliveryDto.latitude;
            request.longitude = deliveryDto.longitude;
            const updatedRequest = await this.requestRepository.save(request);
            console.log('✅ Delivery completed successfully');
            return updatedRequest;
        }
        catch (error) {
            console.error('❌ Error completing delivery:', error);
            throw error;
        }
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(3, (0, typeorm_1.InjectRepository)(service_type_entity_1.ServiceType)),
    __param(4, (0, typeorm_1.InjectRepository)(cash_count_entity_1.CashCount)),
    __param(5, (0, typeorm_1.InjectRepository)(delivery_completion_entity_1.DeliveryCompletion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RequestsService);
//# sourceMappingURL=requests.service.js.map