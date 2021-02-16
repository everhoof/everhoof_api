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
exports.TracksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const tracks_service_1 = require("./tracks.service");
const current_playing_1 = require("./types/current-playing");
const history_1 = require("./types/history");
const track_search_response_1 = require("./types/track-search-response");
const track_search_args_1 = require("./args/track-search.args");
const track_request_args_1 = require("./args/track-request.args");
const track_request_response_1 = require("./types/track-request-response");
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
    searchTracks(trackSearchArgs) {
        return this.tracksService.searchTracks(trackSearchArgs);
    }
    requestTrack(args) {
        return this.tracksService.requestTrack(args);
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
__decorate([
    graphql_1.Query(() => track_search_response_1.TrackSearchResponse),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_search_args_1.TrackSearchArgs]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "searchTracks", null);
__decorate([
    graphql_1.Query(() => track_request_response_1.TrackRequestResponse),
    __param(0, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [track_request_args_1.TrackRequestArgs]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "requestTrack", null);
TracksResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    graphql_1.Resolver('Tracks'),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksResolver);
exports.TracksResolver = TracksResolver;
//# sourceMappingURL=tracks.resolver.js.map