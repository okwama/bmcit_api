import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { getJwtConfig } from './config/jwt.config';

// Modules
import { AuthModule } from './auth/auth.module';
import { RequestsModule } from './requests/requests.module';
import { LocationModule } from './location/location.module';
import { TeamsModule } from './teams/teams.module';
import { ProfileModule } from './profile/profile.module';
import { SosModule } from './sos/sos.module';

// Entities
import { User } from './entities/user.entity';
import { Team } from './entities/team.entity';
import { Request } from './entities/request.entity';
import { ServiceType } from './entities/service-type.entity';
import { CrewLocation } from './entities/crew-location.entity';
import { CashCount } from './entities/cash-count.entity';
import { Sos } from './entities/sos.entity';
import { DeliveryCompletion } from './entities/delivery-completion.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { Notice } from './entities/notice.entity';
import { Seal } from './entities/seal.entity';
import { Role } from './entities/role.entity';
import { Client } from './entities/client.entity';
import { CashCountBm } from './entities/cash-count-bm.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Team,
      Request,
      ServiceType,
      CrewLocation,
      CashCount,
      Sos,
      DeliveryCompletion,
      RefreshToken,
      Notice,
      Seal,
      Role,
      Client,
      CashCountBm,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    RequestsModule,
    LocationModule,
    TeamsModule,
    ProfileModule,
    SosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
