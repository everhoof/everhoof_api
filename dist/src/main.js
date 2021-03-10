"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const platform_ws_1 = require("@nestjs/platform-ws");
async function bootstrap() {
    const PORT = parseInt(process.env.PORT || '7700', 10);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useWebSocketAdapter(new platform_ws_1.WsAdapter());
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map