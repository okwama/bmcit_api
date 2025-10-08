import { Controller, Post, Get, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('location')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('update')
  async updateLocation(
    @Body() updateLocationDto: {
      requestId: number;
      latitude: number;
      longitude: number;
    },
    @Request() req,
  ) {
    return this.locationService.updateLocation(
      updateLocationDto.requestId,
      req.user.id, // Get staff ID from JWT token
      updateLocationDto.latitude,
      updateLocationDto.longitude,
    );
  }

  @Get('history/:requestId')
  async getLocationHistory(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Request() req,
  ) {
    // TODO: Add permission check to ensure user can view this request's history
    return this.locationService.getLocationHistory(requestId);
  }
}

