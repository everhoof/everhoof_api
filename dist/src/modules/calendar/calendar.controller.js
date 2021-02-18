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
exports.CalendarController = void 0;
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../common/filters/http-exception.filter");
const calendar_service_1 = require("./calendar.service");
const calendar_event_1 = require("./types/calendar-event");
const luxon_1 = require("luxon");
let CalendarController = class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    async getEvents() {
        const events = await this.calendarService.getCalendarEvents();
        return events.reduce((acc, event) => {
            if (event.notify) {
                acc.push({
                    summary: event.summary,
                    starts_at: luxon_1.DateTime.fromMillis(event.startsAt).toISO(),
                    ends_at: luxon_1.DateTime.fromMillis(event.endsAt).toISO(),
                    preview: event.preview,
                });
            }
            return acc;
        }, []);
    }
};
__decorate([
    common_1.Get('/nogard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CalendarController.prototype, "getEvents", null);
CalendarController = __decorate([
    common_1.UseFilters(http_exception_filter_1.GraphqlExceptionFilter),
    common_1.Controller('calendar'),
    __metadata("design:paramtypes", [calendar_service_1.CalendarService])
], CalendarController);
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map