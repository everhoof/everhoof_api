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
exports.HistoryItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const track_1 = require("./track");
let HistoryItem = class HistoryItem {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], HistoryItem.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], HistoryItem.prototype, "playedAt", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], HistoryItem.prototype, "duration", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], HistoryItem.prototype, "playlist", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], HistoryItem.prototype, "streamer", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], HistoryItem.prototype, "isRequest", void 0);
__decorate([
    graphql_1.Field(() => track_1.Track),
    __metadata("design:type", track_1.Track)
], HistoryItem.prototype, "track", void 0);
HistoryItem = __decorate([
    graphql_1.ObjectType()
], HistoryItem);
exports.HistoryItem = HistoryItem;
//# sourceMappingURL=history.js.map