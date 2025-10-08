import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
export interface LoginDto {
    employeeNumber: string;
    password: string;
}
export interface UserResponse {
    id?: number;
    name?: string;
    phone?: string;
    role?: string;
    roleId?: number;
    employeeNumber?: string;
    idNumber?: number;
    photoUrl?: string;
    status?: number;
    createdAt?: Date;
}
export interface AuthResponse {
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
}
export declare class AuthService {
    private userRepository;
    private refreshTokenRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>, jwtService: JwtService);
    validateUser(employeeNumber: string, password: string): Promise<Partial<User> | null>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    register(userData: Partial<User>): Promise<AuthResponse>;
    findById(id: number): Promise<User | null>;
    updateLastLogin(id: number): Promise<void>;
    private generateRefreshToken;
    refreshAccessToken(refreshToken: string): Promise<AuthResponse>;
    revokeRefreshToken(refreshToken: string): Promise<void>;
    revokeAllRefreshTokens(userId: number): Promise<void>;
    cleanupExpiredTokens(): Promise<void>;
}
