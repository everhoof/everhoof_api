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
exports.Station = exports.Mount = exports.Listeners = exports.Playlists = void 0;
const graphql_1 = require("@nestjs/graphql");
let Playlists = class Playlists {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Playlists.prototype, "m3u", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Playlists.prototype, "pls", void 0);
Playlists = __decorate([
    graphql_1.ObjectType()
], Playlists);
exports.Playlists = Playlists;
let Listeners = class Listeners {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Listeners.prototype, "current", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Listeners.prototype, "unique", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Listeners.prototype, "total", void 0);
Listeners = __decorate([
    graphql_1.ObjectType()
], Listeners);
exports.Listeners = Listeners;
let Mount = class Mount {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Mount.prototype, "path", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Mount.prototype, "default", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Mount.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Mount.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Mount.prototype, "url", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Mount.prototype, "bitrate", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Mount.prototype, "format", void 0);
__decorate([
    graphql_1.Field(() => Listeners),
    __metadata("design:type", Listeners)
], Mount.prototype, "listeners", void 0);
Mount = __decorate([
    graphql_1.ObjectType()
], Mount);
exports.Mount = Mount;
let Station = class Station {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Station.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "shortcode", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "description", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "frontend", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "backend", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Station.prototype, "listenUrl", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Station.prototype, "public", void 0);
__decorate([
    graphql_1.Field(() => Playlists),
    __metadata("design:type", Playlists)
], Station.prototype, "playlists", void 0);
__decorate([
    graphql_1.Field(() => [Mount]),
    __metadata("design:type", Array)
], Station.prototype, "mounts", void 0);
Station = __decorate([
    graphql_1.ObjectType()
], Station);
exports.Station = Station;
//# sourceMappingURL=station.js.map