import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'bm-security-secret-key-2024'),
    });
  }

  async validate(payload: any) {
    // For better performance, we can trust the JWT payload for most cases
    // Only validate user status from token payload to avoid DB calls
    if (!payload.sub || !payload.employeeNumber || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // Return user data from JWT payload instead of DB query
    // This eliminates the database hit on every request
    return {
      id: payload.sub,
      employeeNumber: payload.employeeNumber,
      role: payload.role,
      teamId: payload.teamId,
      status: 1 // Assume active if token is valid
    };
  }
}
