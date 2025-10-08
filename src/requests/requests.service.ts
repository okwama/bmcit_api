import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Request, RequestStatus, JobType } from '../entities/request.entity';
import { User, UserRole } from '../entities/user.entity';
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

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(ServiceType)
    private serviceTypeRepository: Repository<ServiceType>,
    @InjectRepository(CashCount)
    private cashCountRepository: Repository<CashCount>,
    @InjectRepository(DeliveryCompletion)
    private deliveryCompletionRepository: Repository<DeliveryCompletion>,
  ) {}

  async create(createRequestDto: CreateRequestDto, createdBy: User): Promise<Request> {
    const serviceType = await this.serviceTypeRepository.findOne({
      where: { id: createRequestDto.serviceTypeId },
    });

    if (!serviceType) {
      throw new NotFoundException('Service type not found');
    }

    // Validate assigned staff or team
    if (createRequestDto.assignedStaffId) {
      const staff = await this.userRepository.findOne({
        where: { id: createRequestDto.assignedStaffId },
      });
      if (!staff) {
        throw new NotFoundException('Assigned staff not found');
      }
    }

    if (createRequestDto.assignedTeamId) {
      const team = await this.teamRepository.findOne({
        where: { id: createRequestDto.assignedTeamId },
      });
      if (!team) {
        throw new NotFoundException('Assigned team not found');
      }
    }

    const request = this.requestRepository.create({
      ...createRequestDto,
      userId: createdBy.id,
      userName: createdBy.name,
      price: 0, // Will be calculated based on service type
    });

    return this.requestRepository.save(request);
  }

  async findAll(user: User): Promise<Request[]> {
    const queryBuilder = this.requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.serviceType', 'serviceType')
      .leftJoinAndSelect('request.assignedStaff', 'assignedStaff')
      .leftJoinAndSelect('request.assignedTeam', 'assignedTeam')
      .where('request.staffId = :staffId', { staffId: user.id })
      .orderBy('request.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  async getPendingRequests(user: User): Promise<Request[]> {
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
      .where('request.myStatus = :status', { status: 1 }) // 1 = pending
      .andWhere('request.staffId = :staffId', { staffId: user.id })
      .orderBy('request.createdAt', 'DESC')
      .cache(60000); // Cache for 60 seconds

    return queryBuilder.getMany();
  }

  async getInProgressRequests(user: User): Promise<Request[]> {
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
      .where('request.myStatus = :status', { status: 2 }) // 2 = in progress
      .andWhere('request.staffId = :staffId', { staffId: user.id })
      .orderBy('request.createdAt', 'DESC')
      .cache(30000); // Cache for 30 seconds

    return queryBuilder.getMany();
  }

  async getCompletedRequests(user: User): Promise<Request[]> {
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
      .where('request.myStatus = :status', { status: 3 }) // 3 = completed
      .andWhere('request.staffId = :staffId', { staffId: user.id })
      .orderBy('request.createdAt', 'DESC')
      .limit(100) // Limit completed requests to last 100
      .cache(120000); // Cache for 2 minutes

    return queryBuilder.getMany();
  }

  async findOne(id: number, user: User): Promise<Request> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: [
        'serviceType',
        'assignedStaff',
        'assignedTeam',
      ],
    });

    if (!request) {
      throw new NotFoundException('Request not found');
    }

    // Check permissions
    this.checkRequestAccess(request, user);

    return request;
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateRequestStatusDto,
    user: User,
  ): Promise<Request> {
    const request = await this.findOne(id, user);

    // Validate status transition
    this.validateStatusTransition(request.myStatus, updateStatusDto.status);

    // Update request - map status to myStatus
    request.myStatus = updateStatusDto.status;
    if (updateStatusDto.notes) {
      request.description = updateStatusDto.notes;
    }
    const updatedRequest = await this.requestRepository.save(request);

    // Create delivery completion record if completed
    if (updateStatusDto.status === RequestStatus.COMPLETED) {
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

  async getRequestsByStatus(status: RequestStatus, user: User): Promise<Request[]> {
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

  async getTodayRequests(user: User): Promise<Request[]> {
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

  private checkRequestAccess(request: Request, user: User): void {
    switch (user.role) {
      case 'Admin':
      case 'Supervisor':
        return; // Can access all requests
      case 'Team Leader':
        // TODO: Implement team access check using team_members table
        // For now, allow access to all requests
        break;
      case 'Police':
      case 'Driver':
        if (request.staffId !== user.id) {
          throw new BadRequestException('Access denied');
        }
        break;
    }
  }

  private validateStatusTransition(currentStatus: RequestStatus, newStatus: RequestStatus): void {
    const validTransitions: Record<RequestStatus, RequestStatus[]> = {
      [RequestStatus.PENDING]: [RequestStatus.IN_PROGRESS, RequestStatus.CANCELLED],
      [RequestStatus.IN_PROGRESS]: [RequestStatus.COMPLETED, RequestStatus.CANCELLED],
      [RequestStatus.COMPLETED]: [],
      [RequestStatus.CANCELLED]: [],
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }

  private applyRoleFilter(queryBuilder: any, user: User): void {
    switch (user.role) {
      case 'Admin':
      case 'Supervisor':
        // No additional filtering
        break;
      case 'Team Leader':
        // TODO: Implement team filtering using team_members table
        // For now, no additional filtering
        break;
      case 'Police':
      case 'Driver':
        queryBuilder.andWhere('request.staffId = :staffId', { staffId: user.id });
        break;
    }
  }

  async saveCashCount(requestId: number, cashCountDto: any, user: User): Promise<CashCount> {
    try {
      console.log('💾 Saving cash count for request:', requestId);
      console.log('💾 Cash count data:', cashCountDto);
      console.log('💾 User ID:', user.id);

      // Find the request
      const request = await this.requestRepository.findOne({
        where: { id: requestId },
      });

      if (!request) {
        throw new Error('Request not found');
      }

      // Create cash count record
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
    } catch (error) {
      console.error('❌ Error saving cash count:', error);
      throw error;
    }
  }

  async completeDelivery(requestId: number, deliveryDto: any, user: User): Promise<Request> {
    try {
      console.log('🚚 Completing delivery for request:', requestId);
      console.log('🚚 Delivery data:', deliveryDto);
      console.log('🚚 User ID:', user.id);

      // Find the request
      const request = await this.requestRepository.findOne({
        where: { id: requestId, staffId: user.id },
      });

      if (!request) {
        throw new Error('Request not found or not assigned to user');
      }

      // Verify request is in progress
      if (request.myStatus !== RequestStatus.IN_PROGRESS) {
        throw new Error('Request is not in progress');
      }

      // Check if delivery completion already exists
      const existingCompletion = await this.deliveryCompletionRepository.findOne({
        where: { requestId: requestId },
      });

      if (existingCompletion) {
        console.log('ℹ️ Delivery completion already exists for request:', requestId);
        // Update existing record
        existingCompletion.latitude = deliveryDto.latitude;
        existingCompletion.longitude = deliveryDto.longitude;
        existingCompletion.notes = deliveryDto.notes || existingCompletion.notes;
        existingCompletion.photoUrl = deliveryDto.photoUrl || existingCompletion.photoUrl;
        existingCompletion.isVaultOfficer = deliveryDto.isVaultOfficer || existingCompletion.isVaultOfficer;
        existingCompletion.receivingOfficerName = deliveryDto.recipientName || existingCompletion.receivingOfficerName;
        existingCompletion.status = 'completed';
        
        await this.deliveryCompletionRepository.save(existingCompletion);
      } else {
        // Create new delivery completion record
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

      // Update request status to completed
      request.myStatus = RequestStatus.COMPLETED;
      request.latitude = deliveryDto.latitude;
      request.longitude = deliveryDto.longitude;
      const updatedRequest = await this.requestRepository.save(request);

      console.log('✅ Delivery completed successfully');
      return updatedRequest;
    } catch (error) {
      console.error('❌ Error completing delivery:', error);
      throw error;
    }
  }
}
