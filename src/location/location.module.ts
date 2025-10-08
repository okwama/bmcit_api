import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Request } from '../entities/request.entity';
import { CrewLocation } from '../entities/crew-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, CrewLocation])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}

