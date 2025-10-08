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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const request_entity_1 = require("./request.entity");
const crew_location_entity_1 = require("./crew-location.entity");
const sos_entity_1 = require("./sos.entity");
const cash_count_entity_1 = require("./cash-count.entity");
const role_entity_1 = require("./role.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["SUPERVISOR"] = "supervisor";
    UserRole["CREW_COMMANDER"] = "crew_commander";
    UserRole["SECURITY_GUARD"] = "security_guard";
    UserRole["VAULT_OFFICER"] = "vault_officer";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    id;
    name;
    phone;
    password;
    roleId;
    employeeNumber;
    idNumber;
    photoUrl;
    status;
    createdAt;
    assignedRequests;
    locations;
    sosAlerts;
    cashCounts;
    role;
    roleEntity;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empl_no', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "employeeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_no', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "idNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_url', length: 200, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'datetime', precision: 3, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.Request, (request) => request.assignedStaff),
    __metadata("design:type", Array)
], User.prototype, "assignedRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => crew_location_entity_1.CrewLocation, (location) => location.staff),
    __metadata("design:type", Array)
], User.prototype, "locations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sos_entity_1.Sos, (sos) => sos.staff),
    __metadata("design:type", Array)
], User.prototype, "sosAlerts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cash_count_entity_1.CashCount, (cashCount) => cashCount.staff),
    __metadata("design:type", Array)
], User.prototype, "cashCounts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', length: 200 }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "roleEntity", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('staff')
], User);
//# sourceMappingURL=user.entity.js.map