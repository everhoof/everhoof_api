import { Recording } from '@modules/recordings/types/recording';
export declare class RecordingsService {
    private recordings;
    getRecordings(): Promise<Recording[]>;
    private updateRecordings;
}
