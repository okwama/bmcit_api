import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { User, UserRole } from '../entities/user.entity';
import { RefreshToken } from '../entities/refresh-token.entity';

export interface LoginDto {
  employeeNumber: string;
  password: string;
}

export interface UserResponse {
  id?: number;
  name?: string;
  phone?: string;
  role?: string; // String role for frontend compatibility
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async validateUser(employeeNumber: string, password: string): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { employeeNumber },
      select: ['id', 'name', 'phone', 'password', 'roleId', 'role', 'employeeNumber', 'idNumber', 'photoUrl', 'status', 'createdAt'],
    });

    if (user && user.password && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.validateUser(loginDto.employeeNumber, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 1) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const payload = { 
      employeeNumber: user.employeeNumber, 
      sub: user.id, 
      role: user.role, // Use role from database
      teamId: null // Will be handled separately via team_members table
    };

    // Generate refresh token
    const refreshToken = await this.generateRefreshToken(user.id!);

    const userResponse = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role || '', // Use role from database
      roleId: user.roleId,
      employeeNumber: user.employeeNumber,
      idNumber: user.idNumber,
      photoUrl: user.photoUrl,
      status: user.status,
      createdAt: user.createdAt,
    };

    return {
      user: userResponse,
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken.token,
    };
  }

  async register(userData: Partial<User>): Promise<AuthResponse> {
    if (!userData.employeeNumber || !userData.password) {
      throw new BadRequestException('Employee number and password are required');
    }

    const existingUser = await this.userRepository.findOne({
      where: { employeeNumber: userData.employeeNumber },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this employee number already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      status: 1, // Active by default
    });

    const savedUser = await this.userRepository.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;

    const payload = { 
      employeeNumber: savedUser.employeeNumber, 
      sub: savedUser.id, 
      role: savedUser.role,
      teamId: null // Will be handled separately via team_members table
    };

    // Generate refresh token
    const refreshToken = await this.generateRefreshToken(savedUser.id!);

    const userResponse = {
      id: savedUser.id,
      name: savedUser.name,
      phone: savedUser.phone,
      role: savedUser.role || '', // Use role from database
      roleId: savedUser.roleId,
      employeeNumber: savedUser.employeeNumber,
      idNumber: savedUser.idNumber,
      photoUrl: savedUser.photoUrl,
      status: savedUser.status,
      createdAt: savedUser.createdAt,
    };

    return {
      user: userResponse,
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken.token,
    };
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'phone', 'roleId', 'role', 'employeeNumber', 'idNumber', 'photoUrl', 'status', 'createdAt'],
    });
  }

  async updateLastLogin(id: number): Promise<void> {
    // No updated_at column in database, so we'll skip this for now
    return;
  }

  // Generate a new refresh token
  private async generateRefreshToken(userId: number): Promise<RefreshToken> {
    // Deactivate all existing refresh tokens for this user
    await this.refreshTokenRepository.update(
      { userId, isActive: true },
      { isActive: false }
    );

    // Generate a new random token
    const token = crypto.randomBytes(64).toString('hex');
    
    // Set expiration to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshToken = this.refreshTokenRepository.create({
      token,
      userId,
      expiresAt,
      isActive: true,
    });

    return this.refreshTokenRepository.save(refreshToken);
  }

  // Validate and refresh access token
  async refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
    const token = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken, isActive: true },
      relations: ['user'],
    });

    if (!token || !token.isValid()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Get user data
    const user = await this.userRepository.findOne({
      where: { id: token.userId },
      select: ['id', 'name', 'phone', 'roleId', 'role', 'employeeNumber', 'idNumber', 'photoUrl', 'status', 'createdAt'],
    });

    if (!user || user.status !== 1) {
      throw new UnauthorizedException('User not found or deactivated');
    }

    // Generate new access token
    const payload = { 
      employeeNumber: user.employeeNumber, 
      sub: user.id, 
      role: user.role, // Use role from database
      teamId: null // Will be handled separately via team_members table
    };

    const newAccessToken = this.jwtService.sign(payload);

    // Generate new refresh token (rotate refresh token for security)
    const newRefreshToken = await this.generateRefreshToken(user.id);

    const userResponse = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role || '', // Use role from database
      roleId: user.roleId,
      employeeNumber: user.employeeNumber,
      idNumber: user.idNumber,
      photoUrl: user.photoUrl,
      status: user.status,
      createdAt: user.createdAt,
    };

    return {
      user: userResponse,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken.token,
    };
  }

  // Revoke refresh token
  async revokeRefreshToken(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { token: refreshToken },
      { isActive: false }
    );
  }

  // Revoke all refresh tokens for a user
  async revokeAllRefreshTokens(userId: number): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, isActive: true },
      { isActive: false }
    );
  }

  // Clean up expired refresh tokens
  async cleanupExpiredTokens(): Promise<void> {
    await this.refreshTokenRepository.delete({
      expiresAt: new Date(),
    });
  }
}
