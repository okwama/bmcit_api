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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seal = exports.SealStatus = void 0;
const typeorm_1 = require("typeorm");
const request_entity_1 = require("./request.entity");
const delivery_completion_entity_1 = require("./delivery-completion.entity");
var SealStatus;
(function (SealStatus) {
    SealStatus["BROKEN"] = "broken";
    SealStatus["ASSIGNED"] = "assigned";
    SealStatus["RE_ASSIGNED"] = "re_assigned";
})(SealStatus || (exports.SealStatus = SealStatus = {}));
let Seal = class Seal {
    id;
    sealNumber;
    confirmed;
    confirmedAt;
    confirmedById;
    status;
    createdAt;
    updatedAt;
    requests;
    completions;
};
exports.Seal = Seal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Seal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seal_number', length: 255, unique: true }),
    __metadata("design:type", String)
], Seal.prototype, "sealNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Seal.prototype, "confirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'confirmed_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Seal.prototype, "confirmedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'confirmed_by_id' }),
    __metadata("design:type", Number)
], Seal.prototype, "confirmedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: SealStatus, default: SealStatus.ASSIGNED }),
    __metadata("design:type", String)
], Seal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Seal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Seal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.seal),
    __metadata("design:type", Array)
], Seal.prototype, "requests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_completion_entity_1.DeliveryCompletion, (completion) => completion.seal),
    __metadata("design:type", Array)
], Seal.prototype, "completions", void 0);
exports.Seal = Seal = __decorate([
    (0, typeorm_1.Entity)('seals')
], Seal);
//# sourceMappingURL=seal.entity.js.map