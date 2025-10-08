import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { SosService } from './sos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSosDto, UpdateSosDto } from './dto/sos.dto';

@Controller('sos')
@UseGuards(JwtAuthGuard)
export class SosController {
  constructor(private readonly sosService: SosService) {}

  @Post()
  create(@Body() createSosDto: CreateSosDto, @Request() req) {
    return this.sosService.create(createSosDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.sosService.findAll(req.user);
  }

  @Get('active')
  getActiveSos(@Request() req) {
    return this.sosService.getActiveSos(req.user);
  }

  @Get('my-sos')
  getMySos(@Request() req) {
    return this.sosService.getMySos(req.user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.sosService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSosDto: UpdateSosDto,
    @Request() req,
  ) {
    return this.sosService.update(id, updateSosDto, req.user);
  }

  @Patch(':id/resolve')
  resolveSos(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.sosService.resolveSos(id, req.user);
  }
}

