"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
const getDatabaseConfig = (configService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT', 3306),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    synchronize: false,
    logging: configService.get('DB_LOGGING', 'false') === 'true',
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsRun: false,
    extra: {
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        connectTimeout: 60000,
        charset: 'utf8mb4_unicode_ci',
        timezone: '+00:00',
        dateStrings: true,
    },
    retryAttempts: 10,
    retryDelay: 3000,
    autoLoadEntities: true,
    ...(configService.get('NODE_ENV') === 'development' && {
        maxQueryExecutionTime: 1000,
    }),
});
exports.getDatabaseConfig = getDatabaseConfig;
//# sourceMappingURL=database.config.js.map