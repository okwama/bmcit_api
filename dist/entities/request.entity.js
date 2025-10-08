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
exports.Request = exports.JobType = exports.Priority = exports.RequestStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const team_entity_1 = require("./team.entity");
const service_type_entity_1 = require("./service-type.entity");
const crew_location_entity_1 = require("./crew-location.entity");
const cash_count_entity_1 = require("./cash-count.entity");
const delivery_completion_entity_1 = require("./delivery-completion.entity");
const seal_entity_1 = require("./seal.entity");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["PENDING"] = 1] = "PENDING";
    RequestStatus[RequestStatus["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    RequestStatus[RequestStatus["COMPLETED"] = 3] = "COMPLETED";
    RequestStatus[RequestStatus["CANCELLED"] = 0] = "CANCELLED";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "low";
    Priority["MEDIUM"] = "medium";
    Priority["HIGH"] = "high";
})(Priority || (exports.Priority = Priority = {}));
var JobType;
(function (JobType) {
    JobType["PICK_AND_DROP"] = "pick_and_drop";
    JobType["BSS"] = "bss";
    JobType["CDM_COLLECTION"] = "cdm_collection";
    JobType["ATM_LOADING"] = "atm_loading";
    JobType["AIRLIFT"] = "airlift";
})(JobType || (exports.JobType = JobType = {}));
let Request = class Request {
    id;
    userId;
    userName;
    serviceTypeId;
    price;
    pickupLocation;
    deliveryLocation;
    pickupDate;
    description;
    priority;
    myStatus;
    staffId;
    atmId;
    staffName;
    teamId;
    latitude;
    longitude;
    branchId;
    sealNumberId;
    clientName;
    status;
    destinationType;
    createdAt;
    updatedAt;
    assignedStaff;
    assignedTeam;
    serviceType;
    locations;
    cashCounts;
    completions;
    seal;
};
exports.Request = Request;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Request.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_name', length: 255 }),
    __metadata("design:type", String)
], Request.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'service_type_id' }),
    __metadata("design:type", Number)
], Request.prototype, "serviceTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 11, scale: 2 }),
    __metadata("design:type", Number)
], Request.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_location', length: 255 }),
    __metadata("design:type", String)
], Request.prototype, "pickupLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_location', length: 255 }),
    __metadata("design:type", String)
], Request.prototype, "deliveryLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pickup_date', type: 'datetime' }),
    __metadata("design:type", Date)
], Request.prototype, "pickupDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Priority, default: Priority.MEDIUM }),
    __metadata("design:type", String)
], Request.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'my_status', type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], Request.prototype, "myStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_id', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'atm_id', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "atmId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_name', length: 191, nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "staffName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'team_id', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "teamId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'branch_id', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sealNumberId', nullable: true }),
    __metadata("design:type", Number)
], Request.prototype, "sealNumberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Request.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'destination_type', type: 'enum', enum: ['vault', 'bank'], default: 'vault' }),
    __metadata("design:type", String)
], Request.prototype, "destinationType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Request.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Request.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.assignedRequests, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", user_entity_1.User)
], Request.prototype, "assignedStaff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team.assignedRequests, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'team_id' }),
    __metadata("design:type", team_entity_1.Team)
], Request.prototype, "assignedTeam", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_type_entity_1.ServiceType, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'service_type_id' }),
    __metadata("design:type", service_type_entity_1.ServiceType)
], Request.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => crew_location_entity_1.CrewLocation, (location) => location.request),
    __metadata("design:type", Array)
], Request.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cash_count_entity_1.CashCount, (cashCount) => cashCount.request),
    __metadata("design:type", Array)
], Request.prototype, "cashCounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => delivery_completion_entity_1.DeliveryCompletion, (completion) => completion.request),
    __metadata("design:type", Array)
], Request.prototype, "completions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => seal_entity_1.Seal, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'sealNumberId' }),
    __metadata("design:type", seal_entity_1.Seal)
], Request.prototype, "seal", void 0);
exports.Request = Request = __decorate([
    (0, typeorm_1.Entity)('requests')
], Request);
//# sourceMappingURL=request.entity.js.map