export declare class Live {
    isLive: boolean;
    streamerName: string;
    broadcastStart: number;
}
export declare class CurrentPlayingTrack {
    id: string;
    name: string;
    title: string;
    artist: string;
    startsAt: number;
    endsAt: number;
    duration: number;
    art: string;
}
export declare class CurrentPlaying {
    previous: CurrentPlayingTrack;
    current: CurrentPlayingTrack;
    next: CurrentPlayingTrack;
    live: Live;
    timestamp: number;
    listenersCount: number;
}
