import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '../entities/request.entity';
import { ServiceType } from '../entities/service-type.entity';
import { User } from '../entities/user.entity';
import { Team } from '../entities/team.entity';
import { CashCount } from '../entities/cash-count.entity';
import { DeliveryCompletion } from '../entities/delivery-completion.entity';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Request,
      ServiceType,
      User,
      Team,
      CashCount,
      DeliveryCompletion,
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService],
})
export class RequestsModule {}

