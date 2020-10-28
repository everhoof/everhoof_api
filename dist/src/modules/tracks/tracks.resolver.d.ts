import { TracksService } from '@modules/tracks/tracks.service';
import { CurrentPlaying } from '@modules/tracks/types/current-playing';
export declare class TracksResolver {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    getCurrentPlaying(): Promise<CurrentPlaying | undefined>;
}
