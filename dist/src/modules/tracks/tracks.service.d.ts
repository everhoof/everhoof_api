import { CurrentPlaying } from '@modules/tracks/types/current-playing';
import { HistoryItem } from '@modules/tracks/types/history';
import { TrackSearchResponse } from '@modules/tracks/types/track-search-response';
import { TrackSearchArgs } from '@modules/tracks/args/track-search.args';
import { TrackRequestArgs } from '@modules/tracks/args/track-request.args';
import { TrackRequestResponse } from '@modules/tracks/types/track-request-response';
import { TracksGateway } from '@modules/tracks/tracks.gateway';
import { GatewayTrack } from '@modules/tracks/types/gateway';
export declare class TracksService {
    private readonly tracksGateway;
    private readonly azuracastClient;
    private currentPlaying?;
    private tracksHistory;
    constructor(tracksGateway: TracksGateway);
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
    getTracksHistory(): Promise<HistoryItem[]>;
    searchTracks(trackSearchArgs: TrackSearchArgs): Promise<TrackSearchResponse>;
    requestTrack(args: TrackRequestArgs, ip?: string): Promise<TrackRequestResponse>;
    private updateCurrentPlaying;
    getGatewayTrack(): GatewayTrack | undefined;
}
