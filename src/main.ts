import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'], // Reduce logging overhead in production
  });
  const configService = app.get(ConfigService);

  // Security headers
  app.use(helmet());

  // Response compression
  app.use(compression());

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = configService.get('PORT'); // Default to 3000, but allow override
  const host = configService.get('HOST', '0.0.0.0'); // Listen on all interfaces
  const server = await app.listen(port, host);
  const actualPort = server.address()?.port || port;
  
  console.log(`🚀 BM Security Backend running on ${host}:${actualPort}`);
  console.log(`📱 API available at http://localhost:${actualPort}/api/v1`);
  console.log(`📱 Mobile API available at http://[YOUR_IP]:${actualPort}/api/v1`);
}
bootstrap();
