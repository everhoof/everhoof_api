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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const tracks_service_1 = require("./tracks.service");
const current_playing_1 = require("./types/current-playing");
const history_1 = require("./types/history");
let TracksResolver = class TracksResolver {
    constructor(tracksService) {
        this.tracksService = tracksService;
    }
    getCurrentPlaying() {
        return this.tracksService.getCurrentPlaying();
    }
    getTracksHistory() {
        return this.tracksService.getTracksHistory();
    }
};
__decorate([
    graphql_1.Query(() => current_playing_1.CurrentPlaying, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "getCurrentPlaying", null);
__decorate([
    graphql_1.Query(() => [history_1.HistoryItem]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "getTracksHistory", null);
TracksResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    graphql_1.Resolver('Tracks'),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksResolver);
exports.TracksResolver = TracksResolver;
//# sourceMappingURL=tracks.resolver.js.map