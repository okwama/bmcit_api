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
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_entity_1 = require("../entities/team.entity");
const user_entity_1 = require("../entities/user.entity");
const team_member_entity_1 = require("../entities/team-member.entity");
const cloudinary_service_1 = require("../services/cloudinary.service");
let TeamsService = class TeamsService {
    teamRepository;
    userRepository;
    teamMemberRepository;
    cloudinaryService;
    constructor(teamRepository, userRepository, teamMemberRepository, cloudinaryService) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createTeamDto, user) {
        if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
            throw new common_1.ForbiddenException('Only supervisors and admins can create teams');
        }
        const team = this.teamRepository.create(createTeamDto);
        return await this.teamRepository.save(team);
    }
    async findAll(user) {
        if (user.role === 'ADMIN') {
            return await this.teamRepository.find({
                relations: ['crewCommander'],
            });
        }
        else if (user.role === 'SUPERVISOR') {
            return await this.teamRepository.find({
                relations: ['crewCommander'],
            });
        }
        else {
            const myTeam = await this.getMyTeam(user);
            return myTeam ? [myTeam] : [];
        }
    }
    async getMyTeam(user) {
        const teamMemberships = await this.teamMemberRepository.find({
            where: { staffId: user.id },
            relations: ['team', 'team.crewCommander'],
        });
        return teamMemberships.map(membership => membership.team);
    }
    async getTeamMembers(teamId, user) {
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
            relations: ['crewCommander'],
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        if (!this.canAccessTeam(team, user)) {
            throw new common_1.ForbiddenException('Access denied to this team');
        }
        const teamMembers = await this.teamMemberRepository.find({
            where: { teamId: teamId },
            relations: ['staff'],
        });
        return teamMembers.map(member => member.staff);
    }
    async findOne(id, user) {
        const team = await this.teamRepository.findOne({
            where: { id },
            relations: ['crewCommander'],
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        if (!this.canAccessTeam(team, user)) {
            throw new common_1.ForbiddenException('Access denied to this team');
        }
        return team;
    }
    async update(id, updateTeamDto, user) {
        const team = await this.findOne(id, user);
        if (!['SUPERVISOR', 'ADMIN'].includes(user.role)) {
            throw new common_1.ForbiddenException('Only supervisors and admins can update teams');
        }
        Object.assign(team, updateTeamDto);
        return await this.teamRepository.save(team);
    }
    async remove(id, user) {
        const team = await this.findOne(id, user);
        if (user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only admins can delete teams');
        }
        await this.teamRepository.remove(team);
        return { message: 'Team deleted successfully' };
    }
    async addStaffToTeam(body, photo) {
        let photoUrl = undefined;
        if (photo) {
            try {
                const uploadResult = await this.cloudinaryService.uploadImage(photo, 'bm_security/staff');
                photoUrl = uploadResult.url;
                console.log('Photo uploaded to Cloudinary:', uploadResult.public_id);
            }
            catch (error) {
                console.error('Photo upload failed:', error);
                photoUrl = undefined;
            }
        }
        const newStaff = this.userRepository.create({
            name: body.name || 'Unknown',
            phone: body.phone || null,
            role: body.role || 'Security Guard',
            employeeNumber: body.employeeNumber || `EMP${Date.now()}`,
            idNumber: body.idNumber ? parseInt(body.idNumber.toString()) : undefined,
            status: 0,
            roleId: 0,
            photoUrl: photoUrl,
        });
        const savedStaff = await this.userRepository.save(newStaff);
        return {
            id: savedStaff.id,
            name: savedStaff.name,
            phone: savedStaff.phone,
            role: savedStaff.role,
            employeeNumber: savedStaff.employeeNumber,
            idNumber: savedStaff.idNumber,
            photoUrl: savedStaff.photoUrl,
            status: savedStaff.status,
            createdAt: savedStaff.createdAt,
            message: 'Staff member added successfully. Pending admin approval.',
        };
    }
    canAccessTeam(team, user) {
        if (['ADMIN', 'SUPERVISOR'].includes(user.role)) {
            return true;
        }
        return team.crewCommander?.id === user.id;
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(team_member_entity_1.TeamMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], TeamsService);
//# sourceMappingURL=teams.service.js.map