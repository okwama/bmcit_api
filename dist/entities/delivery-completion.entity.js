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
exports.DeliveryCompletion = void 0;
const typeorm_1 = require("typeorm");
const request_entity_1 = require("./request.entity");
const user_entity_1 = require("./user.entity");
const seal_entity_1 = require("./seal.entity");
let DeliveryCompletion = class DeliveryCompletion {
    id;
    requestId;
    completedById;
    completedByName;
    completedAt;
    notes;
    photoUrl;
    latitude;
    longitude;
    status;
    isVaultOfficer;
    receivingOfficerId;
    receivingOfficerName;
    sealNumberId;
    bankDetails;
    request;
    completedBy;
    seal;
};
exports.DeliveryCompletion = DeliveryCompletion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requestId' }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completedById' }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "completedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completedByName', length: 191 }),
    __metadata("design:type", String)
], DeliveryCompletion.prototype, "completedByName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completedAt', type: 'datetime', default: () => 'CURRENT_TIMESTAMP(3)' }),
    __metadata("design:type", Date)
], DeliveryCompletion.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DeliveryCompletion.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DeliveryCompletion.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'cancelled'], default: 'pending' }),
    __metadata("design:type", String)
], DeliveryCompletion.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isVaultOfficer', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], DeliveryCompletion.prototype, "isVaultOfficer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receivingOfficerId', nullable: true }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "receivingOfficerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receivingOfficerName', length: 191, nullable: true }),
    __metadata("design:type", String)
], DeliveryCompletion.prototype, "receivingOfficerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sealNumberId', nullable: true }),
    __metadata("design:type", Number)
], DeliveryCompletion.prototype, "sealNumberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bankDetails', type: 'json', nullable: true }),
    __metadata("design:type", Object)
], DeliveryCompletion.prototype, "bankDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.Request, (request) => request.completions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'requestId' }),
    __metadata("design:type", request_entity_1.Request)
], DeliveryCompletion.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'completedById' }),
    __metadata("design:type", user_entity_1.User)
], DeliveryCompletion.prototype, "completedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => seal_entity_1.Seal, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sealNumberId' }),
    __metadata("design:type", seal_entity_1.Seal)
], DeliveryCompletion.prototype, "seal", void 0);
exports.DeliveryCompletion = DeliveryCompletion = __decorate([
    (0, typeorm_1.Entity)('delivery_completion')
], DeliveryCompletion);
//# sourceMappingURL=delivery-completion.entity.js.map