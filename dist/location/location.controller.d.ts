import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    updateLocation(updateLocationDto: {
        requestId: number;
        latitude: number;
        longitude: number;
    }, req: any): Promise<{
        success: boolean;
        message: string;
        currentLocation: {
            latitude: number;
            longitude: number;
        };
    }>;
    getLocationHistory(requestId: number, req: any): Promise<import("../entities/crew-location.entity").CrewLocation[]>;
}
