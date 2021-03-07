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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const got_1 = __importDefault(require("got"));
const current_playing_1 = require("./types/current-playing");
const schedule_1 = require("@nestjs/schedule");
const azuracast_nowplaying_1 = require("./types/azuracast-nowplaying");
const history_1 = require("./types/history");
const azuracast_requests_1 = require("./types/azuracast-requests");
const track_search_response_1 = require("./types/track-search-response");
const track_search_args_1 = require("./args/track-search.args");
const track_request_args_1 = require("./args/track-request.args");
const track_request_response_1 = require("./types/track-request-response");
const tracks_gateway_1 = require("./tracks.gateway");
const gateway_1 = require("./types/gateway");
const luxon_1 = require("luxon");
let TracksService = class TracksService {
    constructor(tracksGateway) {
        this.tracksGateway = tracksGateway;
        this.tracksHistory = [];
        this.azuracastClient = got_1.default.extend({
            responseType: 'json',
            prefixUrl: `${process.env.AZURACAST_URL}/api/`,
        });
    }
    async getCurrentPlaying() {
        if (!this.currentPlaying)
            await this.updateCurrentPlaying();
        return this.currentPlaying;
    }
    async getTracksHistory() {
        if (this.tracksHistory.length === 0)
            await this.updateCurrentPlaying();
        return this.tracksHistory;
    }
    async searchTracks(trackSearchArgs) {
        const response = await this.azuracastClient(`station/${process.env.AZURACAST_STATION_ID}/requests`, {
            searchParams: {
                current: trackSearchArgs.page,
                rowCount: trackSearchArgs.count,
                searchPhrase: trackSearchArgs.q,
            },
        }).json();
        if (!response)
            return {
                page: 1,
                count: 0,
                total: 0,
                items: [],
            };
        return {
            page: response.current,
            count: response.rowCount,
            total: response.total,
            items: response.rows.map((track) => ({
                requestId: track.request_id,
                track: {
                    id: track.song_id,
                    title: track.song_title,
                    artist: track.song_artist,
                    album: track.song_album,
                    art: track.song_art,
                    lyrics: track.song_lyrics,
                    text: track.song_text,
                },
            })),
        };
    }
    async requestTrack(args, ip) {
        try {
            const headers = {};
            if (ip) {
                headers['X-Forwarded-For'] = ip;
            }
            const response = await this.azuracastClient(`station/${process.env.AZURACAST_STATION_ID}/request/${args.songId}`, { headers }).json();
            return {
                success: response.success,
                message: response.message,
            };
        }
        catch (e) {
            return {
                success: e.response.body.success,
                message: e.response.body.message,
            };
        }
    }
    async updateCurrentPlaying() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        const currentPlaying = new current_playing_1.CurrentPlaying();
        try {
            const response = await this.azuracastClient(`nowplaying/${process.env.AZURACAST_STATION_ID}`).json();
            if (!response)
                return;
            let id = ((_a = response.now_playing) === null || _a === void 0 ? void 0 : _a.song.id) || '';
            let title = ((_b = response.now_playing) === null || _b === void 0 ? void 0 : _b.song.title) || '';
            let artist = ((_c = response.now_playing) === null || _c === void 0 ? void 0 : _c.song.artist) || '';
            let name = ((_d = response.now_playing) === null || _d === void 0 ? void 0 : _d.song.text) || '';
            let duration = ((_e = response.now_playing) === null || _e === void 0 ? void 0 : _e.duration) || 0;
            let startsAt = (((_f = response.now_playing) === null || _f === void 0 ? void 0 : _f.played_at) || 0) * 1000 || Date.now();
            let endsAt = startsAt + duration * 1000;
            let art = ((_g = response.now_playing) === null || _g === void 0 ? void 0 : _g.song.art) || '';
            if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
                art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
            }
            currentPlaying.current = { id, title, artist, name, duration, startsAt, endsAt, art };
            id = ((_h = response.playing_next) === null || _h === void 0 ? void 0 : _h.song.id) || '';
            title = ((_j = response.playing_next) === null || _j === void 0 ? void 0 : _j.song.title) || '';
            artist = ((_k = response.playing_next) === null || _k === void 0 ? void 0 : _k.song.artist) || '';
            name = ((_l = response.playing_next) === null || _l === void 0 ? void 0 : _l.song.text) || '';
            duration = ((_m = response.playing_next) === null || _m === void 0 ? void 0 : _m.duration) || 0;
            startsAt = (((_o = response.playing_next) === null || _o === void 0 ? void 0 : _o.cued_at) || 0) * 1000 || Date.now();
            endsAt = startsAt + duration * 1000;
            art = ((_p = response.playing_next) === null || _p === void 0 ? void 0 : _p.song.art) || '';
            if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
                art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
            }
            currentPlaying.next = { id, title, artist, name, duration, startsAt, endsAt, art };
            id = response.song_history[0].song.id || '';
            title = response.song_history[0].song.title || '';
            artist = response.song_history[0].song.artist || '';
            name = response.song_history[0].song.text || '';
            duration = response.song_history[0].duration || 0;
            startsAt = (response.song_history[0].played_at || 0) * 1000 || Date.now();
            endsAt = startsAt + duration * 1000;
            art = response.song_history[0].song.art || '';
            if (art && process.env.AZURACAST_PUBLIC_URL && process.env.AZURACAST_REAL_PUBLIC_URL) {
                art = art.replace(process.env.AZURACAST_PUBLIC_URL, process.env.AZURACAST_REAL_PUBLIC_URL);
            }
            currentPlaying.previous = { id, title, artist, name, duration, startsAt, endsAt, art };
            currentPlaying.live = {
                isLive: ((_q = response.live) === null || _q === void 0 ? void 0 : _q.is_live) || false,
                streamerName: ((_r = response.live) === null || _r === void 0 ? void 0 : _r.streamer_name) || '',
                broadcastStart: ((_s = response.live) === null || _s === void 0 ? void 0 : _s.broadcast_start) || 0,
            };
            currentPlaying.timestamp = Date.now();
            currentPlaying.listenersCount = ((_t = response.listeners) === null || _t === void 0 ? void 0 : _t.unique) || 0;
            if (((_u = this.currentPlaying) === null || _u === void 0 ? void 0 : _u.current.id) !== currentPlaying.current.id) {
                this.currentPlaying = currentPlaying;
                this.tracksGateway.sendCurrentTrack();
            }
            else {
                this.currentPlaying = currentPlaying;
            }
            this.tracksHistory = response.song_history.map((item) => ({
                id: item.sh_id,
                playedAt: item.played_at,
                duration: item.duration,
                playlist: item.playlist,
                streamer: item.streamer,
                isRequest: item.is_request,
                track: {
                    id: item.song.id,
                    text: item.song.text,
                    artist: item.song.title,
                    title: item.song.title,
                    album: item.song.album,
                    lyrics: item.song.lyrics,
                    art: (item.song.art || '').replace(process.env.AZURACAST_PUBLIC_URL || '', process.env.AZURACAST_REAL_PUBLIC_URL || ''),
                },
            }));
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
    getGatewayTrack() {
        var _a;
        let track;
        if ((_a = this.currentPlaying) === null || _a === void 0 ? void 0 : _a.current) {
            track = {
                id: this.currentPlaying.current.id,
                title: this.currentPlaying.current.title,
                artist: this.currentPlaying.current.artist,
                name: this.currentPlaying.current.name,
                art: this.currentPlaying.current.art,
                duration: this.currentPlaying.current.duration,
                starts_at: this.currentPlaying.current.startsAt
                    ? luxon_1.DateTime.fromMillis(this.currentPlaying.current.startsAt).toISO()
                    : null,
                ends_at: this.currentPlaying.current.endsAt
                    ? luxon_1.DateTime.fromMillis(this.currentPlaying.current.endsAt).toISO()
                    : null,
            };
        }
        return track;
    }
};
__decorate([
    schedule_1.Interval(5000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TracksService.prototype, "updateCurrentPlaying", null);
TracksService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => tracks_gateway_1.TracksGateway))),
    __metadata("design:paramtypes", [tracks_gateway_1.TracksGateway])
], TracksService);
exports.TracksService = TracksService;
//# sourceMappingURL=tracks.service.js.map