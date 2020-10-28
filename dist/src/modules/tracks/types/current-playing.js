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
exports.CurrentPlaying = exports.CurrentPlayingTrack = exports.Live = void 0;
const graphql_1 = require("@nestjs/graphql");
let Live = class Live {
};
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Live.prototype, "isLive", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Live.prototype, "streamerName", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Live.prototype, "broadcastStart", void 0);
Live = __decorate([
    graphql_1.ObjectType()
], Live);
exports.Live = Live;
let CurrentPlayingTrack = class CurrentPlayingTrack {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CurrentPlayingTrack.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CurrentPlayingTrack.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CurrentPlayingTrack.prototype, "title", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CurrentPlayingTrack.prototype, "artist", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CurrentPlayingTrack.prototype, "startsAt", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CurrentPlayingTrack.prototype, "endsAt", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CurrentPlayingTrack.prototype, "duration", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CurrentPlayingTrack.prototype, "art", void 0);
CurrentPlayingTrack = __decorate([
    graphql_1.ObjectType()
], CurrentPlayingTrack);
exports.CurrentPlayingTrack = CurrentPlayingTrack;
let CurrentPlaying = class CurrentPlaying {
};
__decorate([
    graphql_1.Field(() => CurrentPlayingTrack),
    __metadata("design:type", CurrentPlayingTrack)
], CurrentPlaying.prototype, "previous", void 0);
__decorate([
    graphql_1.Field(() => CurrentPlayingTrack),
    __metadata("design:type", CurrentPlayingTrack)
], CurrentPlaying.prototype, "current", void 0);
__decorate([
    graphql_1.Field(() => CurrentPlayingTrack),
    __metadata("design:type", CurrentPlayingTrack)
], CurrentPlaying.prototype, "next", void 0);
__decorate([
    graphql_1.Field(() => Live),
    __metadata("design:type", Live)
], CurrentPlaying.prototype, "live", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Float),
    __metadata("design:type", Number)
], CurrentPlaying.prototype, "timestamp", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CurrentPlaying.prototype, "listenersCount", void 0);
CurrentPlaying = __decorate([
    graphql_1.ObjectType()
], CurrentPlaying);
exports.CurrentPlaying = CurrentPlaying;
//# sourceMappingURL=current-playing.js.map