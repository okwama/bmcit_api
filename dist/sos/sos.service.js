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
exports.SosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sos_entity_1 = require("../entities/sos.entity");
const user_entity_1 = require("../entities/user.entity");
const request_entity_1 = require("../entities/request.entity");
let SosService = class SosService {
    sosRepository;
    userRepository;
    requestRepository;
    constructor(sosRepository, userRepository, requestRepository) {
        this.sosRepository = sosRepository;
        this.userRepository = userRepository;
        this.requestRepository = requestRepository;
    }
    async create(createSosDto, user) {
        const sos = this.sosRepository.create({
            ...createSosDto,
            guardId: user.id,
            guardName: user.name,
            status: 'active',
        });
        return await this.sosRepository.save(sos);
    }
    async findAll(user) {
        if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
            return await this.sosRepository.find({
                relations: ['staff'],
                order: { createdAt: 'DESC' },
            });
        }
        else if (user.role === 'CREW_COMMANDER') {
            return await this.sosRepository.find({
                relations: ['staff'],
                order: { createdAt: 'DESC' },
            });
        }
        else {
            return await this.getMySos(user);
        }
    }
    async getActiveSos(user) {
        const allSos = await this.findAll(user);
        return allSos.filter(sos => sos.status === 'active');
    }
    async getMySos(user) {
        return await this.sosRepository.find({
            where: { guardId: user.id },
            relations: ['staff'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, user) {
        const sos = await this.sosRepository.findOne({
            where: { id },
            relations: ['staff'],
        });
        if (!sos) {
            throw new common_1.NotFoundException('SOS not found');
        }
        if (!this.canAccessSos(sos, user)) {
            throw new common_1.ForbiddenException('Access denied to this SOS');
        }
        return sos;
    }
    async update(id, updateSosDto, user) {
        const sos = await this.findOne(id, user);
        if (sos.guardId !== user.id && !['SUPERVISOR', 'ADMIN'].includes(user.role)) {
            throw new common_1.ForbiddenException('Only the creator or supervisors can update SOS');
        }
        Object.assign(sos, updateSosDto);
        return await this.sosRepository.save(sos);
    }
    async resolveSos(id, user) {
        const sos = await this.findOne(id, user);
        if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
            throw new common_1.ForbiddenException('Only supervisors and admins can resolve SOS');
        }
        sos.status = 'resolved';
        sos.updatedAt = new Date();
        return await this.sosRepository.save(sos);
    }
    canAccessSos(sos, user) {
        if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
            return true;
        }
        if (sos.guardId === user.id) {
            return true;
        }
        if (user.role === 'CREW_COMMANDER') {
            return true;
        }
        return false;
    }
};
exports.SosService = SosService;
exports.SosService = SosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sos_entity_1.Sos)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(request_entity_1.Request)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SosService);
//# sourceMappingURL=sos.service.js.map