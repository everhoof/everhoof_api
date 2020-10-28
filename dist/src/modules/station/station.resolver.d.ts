import { StationService } from '@modules/station/station.service';
import { Station } from '@modules/station/types/station';
export declare class StationResolver {
    private readonly mountsService;
    constructor(mountsService: StationService);
    getStation(): Promise<Station>;
}
