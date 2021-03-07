import { TracksService } from '@modules/tracks/tracks.service';
import { Server, Socket } from 'socket.io';
export declare class TracksGateway {
    private readonly tracksService;
    constructor(tracksService: TracksService);
    server: Server;
    handleConnection(client: Socket): Promise<void>;
    sendCurrentTrack(client?: Socket): void;
}
