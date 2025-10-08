"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = void 0;
const getJwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET', 'bm-security-secret-key-2024'),
    signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN', '24h'),
    },
});
exports.getJwtConfig = getJwtConfig;
//# sourceMappingURL=jwt.config.js.map