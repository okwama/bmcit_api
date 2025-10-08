import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateProfileDto } from './dto/profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(user: any) {
    const userProfile = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    // Remove sensitive information
    const { password, ...profile } = userProfile;
    return profile;
  }

  async updateProfile(updateProfileDto: UpdateProfileDto, user: any) {
    const userProfile = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    // Update only provided fields
    Object.assign(userProfile, updateProfileDto);
    
    return await this.userRepository.save(userProfile);
  }

  async updatePassword(passwordData: { currentPassword: string; newPassword: string }, user: any) {
    const userProfile = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userProfile) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(passwordData.currentPassword, userProfile.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, 10);
    userProfile.password = hashedNewPassword;

    await this.userRepository.save(userProfile);
    return { message: 'Password updated successfully' };
  }
}

