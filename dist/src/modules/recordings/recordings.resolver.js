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
exports.RecordingsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const recordings_service_1 = require("./recordings.service");
const recording_1 = require("./types/recording");
let RecordingsResolver = class RecordingsResolver {
    constructor(recordingsService) {
        this.recordingsService = recordingsService;
    }
    getRecordings() {
        return this.recordingsService.getRecordings();
    }
};
__decorate([
    graphql_1.Query(() => [recording_1.Recording]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecordingsResolver.prototype, "getRecordings", null);
RecordingsResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    graphql_1.Resolver('Recordings'),
    __metadata("design:paramtypes", [recordings_service_1.RecordingsService])
], RecordingsResolver);
exports.RecordingsResolver = RecordingsResolver;
//# sourceMappingURL=recordings.resolver.js.map