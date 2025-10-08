import { AuthService } from './auth.service';
import type { LoginDto } from './auth.service';
import { User } from '../entities/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    register(userData: Partial<User>): Promise<import("./auth.service").AuthResponse>;
    getProfile(req: any): Promise<any>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<import("./auth.service").AuthResponse>;
    logout(req: any, body: {
        refreshToken?: string;
    }): Promise<{
        message: string;
    }>;
    verifyToken(req: any): Promise<{
        valid: boolean;
        user: any;
    }>;
}
