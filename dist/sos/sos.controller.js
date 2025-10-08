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
exports.SosController = void 0;
const common_1 = require("@nestjs/common");
const sos_service_1 = require("./sos.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const sos_dto_1 = require("./dto/sos.dto");
let SosController = class SosController {
    sosService;
    constructor(sosService) {
        this.sosService = sosService;
    }
    create(createSosDto, req) {
        return this.sosService.create(createSosDto, req.user);
    }
    findAll(req) {
        return this.sosService.findAll(req.user);
    }
    getActiveSos(req) {
        return this.sosService.getActiveSos(req.user);
    }
    getMySos(req) {
        return this.sosService.getMySos(req.user);
    }
    findOne(id, req) {
        return this.sosService.findOne(id, req.user);
    }
    update(id, updateSosDto, req) {
        return this.sosService.update(id, updateSosDto, req.user);
    }
    resolveSos(id, req) {
        return this.sosService.resolveSos(id, req.user);
    }
};
exports.SosController = SosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sos_dto_1.CreateSosDto, Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "getActiveSos", null);
__decorate([
    (0, common_1.Get)('my-sos'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "getMySos", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, sos_dto_1.UpdateSosDto, Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/resolve'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SosController.prototype, "resolveSos", null);
exports.SosController = SosController = __decorate([
    (0, common_1.Controller)('sos'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sos_service_1.SosService])
], SosController);
//# sourceMappingURL=sos.controller.js.map