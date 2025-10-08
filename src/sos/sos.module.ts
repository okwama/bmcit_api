import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SosController } from './sos.controller';
import { SosService } from './sos.service';
import { Sos } from '../entities/sos.entity';
import { User } from '../entities/user.entity';
import { Request } from '../entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sos, User, Request])],
  controllers: [SosController],
  providers: [SosService],
  exports: [SosService],
})
export class SosModule {}

