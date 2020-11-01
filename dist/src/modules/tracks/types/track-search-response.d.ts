import { Track } from '@modules/tracks/types/track';
export declare class TrackSearchItem {
    requestId: string;
    track: Track;
}
export declare class TrackSearchResponse {
    page: number;
    count: number;
    total: number;
    items: TrackSearchItem[];
}
