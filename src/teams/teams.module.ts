import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from '../entities/team.entity';
import { User } from '../entities/user.entity';
import { TeamMember } from '../entities/team-member.entity';
import { CloudinaryService } from '../services/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, TeamMember])],
  controllers: [TeamsController],
  providers: [TeamsService, CloudinaryService],
  exports: [TeamsService],
})
export class TeamsModule {}

