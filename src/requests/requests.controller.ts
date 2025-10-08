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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import type { CreateRequestDto, UpdateRequestStatusDto } from './requests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestStatus } from '../entities/request.entity';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @Request() req) {
    return this.requestsService.create(createRequestDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.requestsService.findAll(req.user);
  }

  @Get('today')
  getTodayRequests(@Request() req) {
    return this.requestsService.getTodayRequests(req.user);
  }

  @Get('pending')
  getPendingRequests(@Request() req) {
    return this.requestsService.getPendingRequests(req.user);
  }

  @Get('in-progress')
  getInProgressRequests(@Request() req) {
    return this.requestsService.getInProgressRequests(req.user);
  }

  @Get('completed')
  getCompletedRequests(@Request() req) {
    return this.requestsService.getCompletedRequests(req.user);
  }

  @Get('status/:status')
  getRequestsByStatus(
    @Param('status') status: RequestStatus,
    @Request() req,
  ) {
    return this.requestsService.getRequestsByStatus(status, req.user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.requestsService.findOne(id, req.user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateRequestStatusDto,
    @Request() req,
  ) {
    return this.requestsService.updateStatus(id, updateStatusDto, req.user);
  }

  @Post(':id/cash-count')
  saveCashCount(
    @Param('id', ParseIntPipe) id: number,
    @Body() cashCountDto: any,
    @Request() req,
  ) {
    return this.requestsService.saveCashCount(id, cashCountDto, req.user);
  }

  @Post(':id/delivery')
  completeDelivery(
    @Param('id', ParseIntPipe) id: number,
    @Body() deliveryDto: {
      requestId: number;
      latitude: number;
      longitude: number;
      notes?: string;
      recipientName?: string;
      isVaultOfficer?: boolean;
      photoUrl?: string;
      bankingSlipUrl?: string;
    },
    @Request() req,
  ) {
    return this.requestsService.completeDelivery(id, deliveryDto, req.user);
  }
}
