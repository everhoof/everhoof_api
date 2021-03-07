import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { forwardRef, Inject } from '@nestjs/common';
import { TracksService } from '@modules/tracks/tracks.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(5501)
export class TracksGateway {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket): Promise<void> {
    this.sendCurrentTrack(client);
  }

  sendCurrentTrack(client?: Socket): void {
    const track = this.tracksService.getGatewayTrack();
    if (!track) return;
    (client ?? this.server).emit('current-track', this.tracksService.getGatewayTrack());
  }
}
