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
exports.Sos = exports.SosStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
var SosStatus;
(function (SosStatus) {
    SosStatus["ACTIVE"] = "active";
    SosStatus["RESOLVED"] = "resolved";
    SosStatus["CANCELLED"] = "cancelled";
})(SosStatus || (exports.SosStatus = SosStatus = {}));
let Sos = class Sos {
    id;
    sosType;
    latitude;
    longitude;
    status;
    createdAt;
    updatedAt;
    guardName;
    comment;
    guardId;
    staff;
};
exports.Sos = Sos;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sos_type', type: 'varchar', length: 191, default: 'sos' }),
    __metadata("design:type", String)
], Sos.prototype, "sosType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Sos.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], Sos.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 191, default: 'active' }),
    __metadata("design:type", String)
], Sos.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Sos.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Sos.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guard_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Sos.prototype, "guardName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Sos.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'guard_id', type: 'int' }),
    __metadata("design:type", Number)
], Sos.prototype, "guardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'guard_id' }),
    __metadata("design:type", user_entity_1.User)
], Sos.prototype, "staff", void 0);
exports.Sos = Sos = __decorate([
    (0, typeorm_1.Entity)('sos')
], Sos);
//# sourceMappingURL=sos.entity.js.map