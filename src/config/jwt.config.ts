import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get('JWT_SECRET', 'bm-security-secret-key-2024'),
  signOptions: {
    expiresIn: configService.get('JWT_EXPIRES_IN', '24h'),
  },
});

