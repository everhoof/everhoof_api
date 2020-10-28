import { TracksService } from '@modules/tracks/tracks.service';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';
export declare class TracksResolver {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
    getTracksHistory(): Promise<HistoryItem[]>;
}
