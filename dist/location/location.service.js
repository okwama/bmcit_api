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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const request_entity_1 = require("../entities/request.entity");
const crew_location_entity_1 = require("../entities/crew-location.entity");
const request_entity_2 = require("../entities/request.entity");
let LocationService = class LocationService {
    requestRepository;
    crewLocationRepository;
    constructor(requestRepository, crewLocationRepository) {
        this.requestRepository = requestRepository;
        this.crewLocationRepository = crewLocationRepository;
    }
    async updateLocation(requestId, staffId, latitude, longitude) {
        const request = await this.requestRepository.findOne({
            where: { id: requestId, staffId: staffId },
        });
        if (!request) {
            throw new common_1.BadRequestException('Staff not assigned to this request');
        }
        if (request.myStatus !== request_entity_2.RequestStatus.IN_PROGRESS) {
            throw new common_1.BadRequestException('Can only track location for in-progress requests');
        }
        await this.requestRepository.update(requestId, {
            latitude,
            longitude,
            updatedAt: new Date(),
        });
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
    async getLocationHistory(requestId) {
        return this.crewLocationRepository.find({
            where: { requestId },
            order: { capturedAt: 'DESC' },
        });
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __param(1, (0, typeorm_1.InjectRepository)(crew_location_entity_1.CrewLocation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LocationService);
//# sourceMappingURL=location.service.js.map