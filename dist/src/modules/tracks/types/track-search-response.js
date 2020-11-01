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
exports.TrackSearchResponse = exports.TrackSearchItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const track_1 = require("./track");
let TrackSearchItem = class TrackSearchItem {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], TrackSearchItem.prototype, "requestId", void 0);
__decorate([
    graphql_1.Field(() => track_1.Track),
    __metadata("design:type", track_1.Track)
], TrackSearchItem.prototype, "track", void 0);
TrackSearchItem = __decorate([
    graphql_1.ObjectType()
], TrackSearchItem);
exports.TrackSearchItem = TrackSearchItem;
let TrackSearchResponse = class TrackSearchResponse {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], TrackSearchResponse.prototype, "page", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], TrackSearchResponse.prototype, "count", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], TrackSearchResponse.prototype, "total", void 0);
__decorate([
    graphql_1.Field(() => [TrackSearchItem]),
    __metadata("design:type", Array)
], TrackSearchResponse.prototype, "items", void 0);
TrackSearchResponse = __decorate([
    graphql_1.ObjectType()
], TrackSearchResponse);
exports.TrackSearchResponse = TrackSearchResponse;
//# sourceMappingURL=track-search-response.js.map