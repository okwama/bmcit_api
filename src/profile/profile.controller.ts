import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/profile.dto';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  getProfile(@Request() req) {
    return this.profileService.getProfile(req.user);
  }

  @Patch()
  updateProfile(@Body() updateProfileDto: UpdateProfileDto, @Request() req) {
    return this.profileService.updateProfile(updateProfileDto, req.user);
  }

  @Patch('password')
  updatePassword(@Body() passwordData: { currentPassword: string; newPassword: string }, @Request() req) {
    return this.profileService.updatePassword(passwordData, req.user);
  }
}

