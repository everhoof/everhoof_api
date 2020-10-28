import { CurrentPlaying } from '@modules/tracks/types/current-playing';
export declare class TracksService {
    private readonly azuracastClient;
    private currentPlaying?;
    constructor();
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
    private updateCurrentPlaying;
}
