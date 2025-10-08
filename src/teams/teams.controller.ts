import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTeamDto, UpdateTeamDto, CreateStaffDto } from './dto/team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTeamDto: CreateTeamDto, @Request() req) {
    return this.teamsService.create(createTeamDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.teamsService.findAll(req.user);
  }

  @Get('my-team')
  @UseGuards(JwtAuthGuard)
  getMyTeam(@Request() req) {
    return this.teamsService.getMyTeam(req.user);
  }

  @Get('members/:teamId')
  @UseGuards(JwtAuthGuard)
  getTeamMembers(@Param('teamId', ParseIntPipe) teamId: number, @Request() req) {
    return this.teamsService.getTeamMembers(teamId, req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.teamsService.findOne(id, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
    @Request() req,
  ) {
    return this.teamsService.update(id, updateTeamDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.teamsService.remove(id, req.user);
  }

  @Post('add-staff')
  @UseInterceptors(FileInterceptor('photo'))
  addStaffToTeam(
    @Body() body: any,
    @UploadedFile() photo: any,
  ) {
    return this.teamsService.addStaffToTeam(body, photo);
  }
}

