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
exports.CashCount = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const request_entity_1 = require("./request.entity");
let CashCount = class CashCount {
    id;
    requestId;
    staffId;
    ones;
    fives;
    tens;
    twenties;
    fifties;
    hundreds;
    twoHundreds;
    fiveHundreds;
    thousands;
    totalAmount;
    imageUrl;
    sealNumber;
    imagePath;
    status;
    createdAt;
    request;
    staff;
};
exports.CashCount = CashCount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CashCount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_id', nullable: true }),
    __metadata("design:type", Number)
], CashCount.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_id', nullable: true }),
    __metadata("design:type", Number)
], CashCount.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "ones", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "fives", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "tens", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "twenties", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "fifties", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "hundreds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "twoHundreds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "fiveHundreds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "thousands", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'totalAmount', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], CashCount.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], CashCount.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sealNumber', type: 'varchar', length: 191, nullable: true }),
    __metadata("design:type", String)
], CashCount.prototype, "sealNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'imagePath', type: 'varchar', length: 191, nullable: true }),
    __metadata("design:type", String)
], CashCount.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', type: 'enum', enum: ['pending', 'received'], default: 'pending' }),
    __metadata("design:type", String)
], CashCount.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CashCount.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.Request, (request) => request.cashCounts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'request_id' }),
    __metadata("design:type", request_entity_1.Request)
], CashCount.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cashCounts, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", user_entity_1.User)
], CashCount.prototype, "staff", void 0);
exports.CashCount = CashCount = __decorate([
    (0, typeorm_1.Entity)('cash_counts')
], CashCount);
//# sourceMappingURL=cash-count.entity.js.map