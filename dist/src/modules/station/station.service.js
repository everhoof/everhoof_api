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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationService = void 0;
const common_1 = require("@nestjs/common");
const got_1 = __importDefault(require("got"));
const schedule_1 = require("@nestjs/schedule");
const station_1 = require("./types/station");
const azuracast_station_1 = require("./types/azuracast-station");
let StationService = class StationService {
    constructor() {
        this.azuracastClient = got_1.default.extend({
            responseType: 'json',
            prefixUrl: `${process.env.AZURACAST_URL}/api/`,
        });
    }
    async getStation() {
        if (!this.station)
            await this.updateStation();
        return this.station;
    }
    async updateStation() {
        try {
            const response = await this.azuracastClient(`station/${process.env.AZURACAST_STATION_ID}`).json();
            this.station = {
                id: (response === null || response === void 0 ? void 0 : response.id) || 0,
                name: (response === null || response === void 0 ? void 0 : response.name) || '',
                shortcode: (response === null || response === void 0 ? void 0 : response.shortcode) || '',
                description: (response === null || response === void 0 ? void 0 : response.description) || '',
                frontend: (response === null || response === void 0 ? void 0 : response.frontend) || '',
                backend: (response === null || response === void 0 ? void 0 : response.backend) || '',
                listenUrl: (response === null || response === void 0 ? void 0 : response.listen_url) || '',
                public: (response === null || response === void 0 ? void 0 : response.is_public) || true,
                playlists: {
                    m3u: `https://everhoof.ru/m3u`,
                    pls: `https://everhoof.ru/pls`,
                },
                mounts: ((response === null || response === void 0 ? void 0 : response.mounts) || []).map((mount) => ({
                    id: mount.id,
                    default: mount.is_default,
                    path: mount.path,
                    name: mount.name,
                    url: mount.url,
                    bitrate: mount.bitrate,
                    format: mount.format,
                    listeners: {
                        current: mount.listeners.current,
                        unique: mount.listeners.unique,
                        total: mount.listeners.total,
                    },
                })),
            };
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
};
__decorate([
    schedule_1.Interval(60000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StationService.prototype, "updateStation", null);
StationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map