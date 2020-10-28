import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';
export declare class TracksService {
    private readonly azuracastClient;
    private currentPlaying?;
    private tracksHistory;
    constructor();
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
    getTracksHistory(): Promise<HistoryItem[]>;
    private updateCurrentPlaying;
}
