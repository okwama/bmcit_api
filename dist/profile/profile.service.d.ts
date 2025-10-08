import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from './dto/profile.dto';
export declare class ProfileService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getProfile(user: any): Promise<{
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
    updateProfile(updateProfileDto: UpdateProfileDto, user: any): Promise<User>;
    updatePassword(passwordData: {
        currentPassword: string;
        newPassword: string;
    }, user: any): Promise<{
        message: string;
    }>;
}
