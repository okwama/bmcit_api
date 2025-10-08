import { Repository } from 'typeorm';
import { Request } from '../entities/request.entity';
import { CrewLocation } from '../entities/crew-location.entity';
export interface UpdateLocationDto {
    requestId: number;
    latitude: number;
    longitude: number;
}
export declare class LocationService {
    private requestRepository;
    private crewLocationRepository;
    constructor(requestRepository: Repository<Request>, crewLocationRepository: Repository<CrewLocation>);
    updateLocation(requestId: number, staffId: number, latitude: number, longitude: number): Promise<{
        success: boolean;
        message: string;
        currentLocation: {
            latitude: number;
            longitude: number;
        };
    }>;
    getLocationHistory(requestId: number): Promise<CrewLocation[]>;
}
