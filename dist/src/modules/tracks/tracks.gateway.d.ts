import { TracksService } from '@modules/tracks/tracks.service';
import { Server } from 'ws';
export declare class TracksGateway {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    server: Server;
    handleConnection(client: WebSocket): Promise<void>;
    sendCurrentTrack(client?: WebSocket): void;
}
