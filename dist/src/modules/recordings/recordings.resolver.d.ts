import { RecordingsService } from '@modules/recordings/recordings.service';
import { Recording } from '@modules/recordings/types/recording';
export declare class RecordingsResolver {
    private readonly recordingsService;
    constructor(recordingsService: RecordingsService);
    getRecordings(): Promise<Recording[]>;
}
