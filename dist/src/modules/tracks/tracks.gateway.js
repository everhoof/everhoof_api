"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const tracks_service_1 = require("./tracks.service");
const WS_PORT = Number(process.env.WS_PORT) || undefined;
let TracksGateway = class TracksGateway {
    constructor(tracksService) {
        this.tracksService = tracksService;
    }
    async handleConnection(client) {
        this.sendCurrentTrack(client);
    }
    sendCurrentTrack(client) {
        const track = this.tracksService.getGatewayTrack();
        if (!track)
            return;
        (client !== null && client !== void 0 ? client : this.server).emit('current-track', this.tracksService.getGatewayTrack());
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], TracksGateway.prototype, "server", void 0);
TracksGateway = __decorate([
    websockets_1.WebSocketGateway(WS_PORT),
    __param(0, common_1.Inject(common_1.forwardRef(() => tracks_service_1.TracksService))),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksGateway);
exports.TracksGateway = TracksGateway;
//# sourceMappingURL=tracks.gateway.js.map