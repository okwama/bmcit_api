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
exports.CrewLocation = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const request_entity_1 = require("./request.entity");
let CrewLocation = class CrewLocation {
    id;
    requestId;
    staffId;
    latitude;
    longitude;
    capturedAt;
    request;
    staff;
};
exports.CrewLocation = CrewLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CrewLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'request_id' }),
    __metadata("design:type", Number)
], CrewLocation.prototype, "requestId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'staff_id' }),
    __metadata("design:type", Number)
], CrewLocation.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], CrewLocation.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], CrewLocation.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'captured_at' }),
    __metadata("design:type", Date)
], CrewLocation.prototype, "capturedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.Request, (request) => request.locations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'request_id' }),
    __metadata("design:type", request_entity_1.Request)
], CrewLocation.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.locations, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", user_entity_1.User)
], CrewLocation.prototype, "staff", void 0);
exports.CrewLocation = CrewLocation = __decorate([
    (0, typeorm_1.Entity)('crew_locations')
], CrewLocation);
//# sourceMappingURL=crew-location.entity.js.map