"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_config_1 = require("./config/database.config");
const jwt_config_1 = require("./config/jwt.config");
const auth_module_1 = require("./auth/auth.module");
const requests_module_1 = require("./requests/requests.module");
const location_module_1 = require("./location/location.module");
const teams_module_1 = require("./teams/teams.module");
const profile_module_1 = require("./profile/profile.module");
const sos_module_1 = require("./sos/sos.module");
const user_entity_1 = require("./entities/user.entity");
const team_entity_1 = require("./entities/team.entity");
const request_entity_1 = require("./entities/request.entity");
const service_type_entity_1 = require("./entities/service-type.entity");
const crew_location_entity_1 = require("./entities/crew-location.entity");
const cash_count_entity_1 = require("./entities/cash-count.entity");
const sos_entity_1 = require("./entities/sos.entity");
const delivery_completion_entity_1 = require("./entities/delivery-completion.entity");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const notice_entity_1 = require("./entities/notice.entity");
const seal_entity_1 = require("./entities/seal.entity");
const role_entity_1 = require("./entities/role.entity");
const client_entity_1 = require("./entities/client.entity");
const cash_count_bm_entity_1 = require("./entities/cash-count-bm.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.getDatabaseConfig,
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                team_entity_1.Team,
                request_entity_1.Request,
                service_type_entity_1.ServiceType,
                crew_location_entity_1.CrewLocation,
                cash_count_entity_1.CashCount,
                sos_entity_1.Sos,
                delivery_completion_entity_1.DeliveryCompletion,
                refresh_token_entity_1.RefreshToken,
                notice_entity_1.Notice,
                seal_entity_1.Seal,
                role_entity_1.Role,
                client_entity_1.Client,
                cash_count_bm_entity_1.CashCountBm,
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: jwt_config_1.getJwtConfig,
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            requests_module_1.RequestsModule,
            location_module_1.LocationModule,
            teams_module_1.TeamsModule,
            profile_module_1.ProfileModule,
            sos_module_1.SosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map