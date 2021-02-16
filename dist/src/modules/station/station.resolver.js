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
exports.StationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const station_service_1 = require("./station.service");
const station_1 = require("./types/station");
let StationResolver = class StationResolver {
    constructor(mountsService) {
        this.mountsService = mountsService;
    }
    getStation() {
        return this.mountsService.getStation();
    }
};
__decorate([
    graphql_1.Query(() => station_1.Station),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StationResolver.prototype, "getStation", null);
StationResolver = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    graphql_1.Resolver('Station'),
    __metadata("design:paramtypes", [station_service_1.StationService])
], StationResolver);
exports.StationResolver = StationResolver;
//# sourceMappingURL=station.resolver.js.map