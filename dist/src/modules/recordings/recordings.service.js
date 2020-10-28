"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingsService = void 0;
const common_1 = require("@nestjs/common");
const got_1 = __importDefault(require("got"));
const recording_1 = require("./types/recording");
let RecordingsService = class RecordingsService {
    constructor() {
        this.recordings = [];
    }
    async getRecordings() {
        await this.updateRecordings();
        return this.recordings;
    }
    async updateRecordings() {
        try {
            const recordings = await got_1.default(`${process.env.RECORDINGS_URL}`).json();
            this.recordings = recordings.reverse();
        }
        catch (e) {
            console.error(e);
        }
    }
};
RecordingsService = __decorate([
    common_1.Injectable()
], RecordingsService);
exports.RecordingsService = RecordingsService;
//# sourceMappingURL=recordings.service.js.map