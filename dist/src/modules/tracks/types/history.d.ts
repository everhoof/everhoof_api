import { Track } from '@modules/tracks/types/track';
export declare class HistoryItem {
    id: number;
    playedAt: number;
    duration: number;
    playlist: string;
    streamer: string;
    isRequest: boolean;
    track: Track;
}
