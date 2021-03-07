import { TracksService } from '@modules/tracks/tracks.service';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';
import { TrackSearchResponse } from '@modules/tracks/types/track-search-response';
import { TrackSearchArgs } from '@modules/tracks/args/track-search.args';
import { TrackRequestArgs } from '@modules/tracks/args/track-request.args';
import { TrackRequestResponse } from '@modules/tracks/types/track-request-response';
export declare class TracksResolver {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
    getTracksHistory(): Promise<HistoryItem[]>;
    searchTracks(trackSearchArgs: TrackSearchArgs): Promise<TrackSearchResponse>;
    requestTrack(args: TrackRequestArgs, ip?: string): Promise<TrackRequestResponse>;
}
