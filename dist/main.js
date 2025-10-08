"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn'],
    });
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api/v1');
    const port = configService.get('PORT');
    const host = configService.get('HOST', '0.0.0.0');
    const server = await app.listen(port, host);
    const actualPort = server.address()?.port || port;
    console.log(`🚀 BM Security Backend running on ${host}:${actualPort}`);
    console.log(`📱 API available at http://localhost:${actualPort}/api/v1`);
    console.log(`📱 Mobile API available at http://[YOUR_IP]:${actualPort}/api/v1`);
}
bootstrap();
//# sourceMappingURL=main.js.map