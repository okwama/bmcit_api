import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<{
        id: number;
        name: string;
        phone: string;
        roleId: number;
        employeeNumber: string;
        idNumber: number;
        photoUrl: string;
        status: number;
        createdAt: Date;
        assignedRequests: import("../entities/request.entity").Request[];
        locations: import("../entities/crew-location.entity").CrewLocation[];
        sosAlerts: import("../entities/sos.entity").Sos[];
        cashCounts: import("../entities/cash-count.entity").CashCount[];
        role: string;
        roleEntity: import("../entities/role.entity").Role;
    }>;
    updateProfile(updateProfileDto: UpdateProfileDto, req: any): Promise<import("../entities/user.entity").User>;
    updatePassword(passwordData: {
        currentPassword: string;
        newPassword: string;
    }, req: any): Promise<{
        message: string;
    }>;
}
