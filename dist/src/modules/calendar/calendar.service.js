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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
const luxon_1 = require("luxon");
const schedule_1 = require("@nestjs/schedule");
const calendar_event_1 = require("./types/calendar-event");
let CalendarService = class CalendarService {
    constructor() {
        this.calendarEvents = [];
        this.calendar = googleapis_1.google.calendar({
            version: 'v3',
            auth: process.env.GOOGLE_API_KEY,
        });
        this.updateCalendarEvents().catch(console.error);
    }
    async updateCalendarEvents() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        try {
            const events = await this.calendar.events.list({
                calendarId: process.env.GOOGLE_CALENDAR_ID,
                singleEvents: true,
                orderBy: 'startTime',
                timeMin: date.toISOString(),
            });
            if (!events.data.items)
                return;
            this.calendarEvents = events.data.items.reduce((acc, event) => {
                var _a, _b, _c, _d;
                if (event.summary && ((_a = event.start) === null || _a === void 0 ? void 0 : _a.dateTime) && ((_b = event.end) === null || _b === void 0 ? void 0 : _b.dateTime)) {
                    const startsAt = luxon_1.DateTime.fromISO((_c = event.start) === null || _c === void 0 ? void 0 : _c.dateTime).toMillis();
                    const endsAt = luxon_1.DateTime.fromISO((_d = event.end) === null || _d === void 0 ? void 0 : _d.dateTime).toMillis();
                    acc.push({
                        summary: event.summary,
                        startsAt: startsAt,
                        endsAt: endsAt,
                    });
                }
                return acc;
            }, []);
        }
        catch (e) {
            console.error(e);
        }
    }
    async getCalendarEvents() {
        return this.calendarEvents;
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_10_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CalendarService.prototype, "updateCalendarEvents", null);
CalendarService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CalendarService);
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map