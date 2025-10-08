import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
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
  
  // Connection pool settings (MySQL2 driver specific)
  extra: {
    // Connection pool configuration
    connectionLimit: 10, // Reduced from 20 - optimal for most apps
    waitForConnections: true,
    queueLimit: 0, // Unlimited queue
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    
    // Timeouts (in milliseconds)
    connectTimeout: 60000, // 60 seconds for initial connection
    
    // Character set
    charset: 'utf8mb4_unicode_ci',
    timezone: '+00:00',
    
    // Connection validation
    dateStrings: true,
  },
  
  // Retry connection on failure
  retryAttempts: 10,
  retryDelay: 3000, // 3 seconds between retries
  
  // Auto-load entities
  autoLoadEntities: true,
  
  // Logging for debugging (only in development)
  ...(configService.get('NODE_ENV') === 'development' && {
    maxQueryExecutionTime: 1000, // Log slow queries (>1s)
  }),
});

