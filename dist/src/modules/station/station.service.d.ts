import { Station } from '@modules/station/types/station';
export declare class StationService {
    private readonly azuracastClient;
    private station;
    constructor();
    getStation(): Promise<Station>;
    private updateStation;
}
