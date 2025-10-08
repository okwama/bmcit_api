import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { CrewLocation } from '../entities/crew-location.entity';
import { User } from '../entities/user.entity';
import { RequestStatus } from '../entities/request.entity';

export interface UpdateLocationDto {
  requestId: number;
  latitude: number;
  longitude: number;
}

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    @InjectRepository(CrewLocation)
    private crewLocationRepository: Repository<CrewLocation>,
  ) {}

  async updateLocation(
    requestId: number,
    staffId: number,
    latitude: number,
    longitude: number,
  ) {
    // 1. Verify the staff is assigned to this request and it's IN_PROGRESS
    const request = await this.requestRepository.findOne({
      where: { id: requestId, staffId: staffId },
    });

    if (!request) {
      throw new BadRequestException('Staff not assigned to this request');
    }

    if (request.myStatus !== RequestStatus.IN_PROGRESS) {
      throw new BadRequestException('Can only track location for in-progress requests');
    }

    // 2. Update CURRENT location in requests table
    await this.requestRepository.update(requestId, {
      latitude,
      longitude,
      updatedAt: new Date(),
    });

    // 3. Log HISTORICAL location in crew_locations table
    const locationRecord = this.crewLocationRepository.create({
      requestId,
      staffId,
      latitude,
      longitude,
    });

    await this.crewLocationRepository.save(locationRecord);

    return {
      success: true,
      message: 'Location updated successfully',
      currentLocation: { latitude, longitude },
    };
  }

  async getLocationHistory(requestId: number) {
    return this.crewLocationRepository.find({
      where: { requestId },
      order: { capturedAt: 'DESC' },
    });
  }
}
