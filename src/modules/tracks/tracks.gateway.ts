import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { forwardRef, Inject } from '@nestjs/common';
import { TracksService } from '@modules/tracks/tracks.service';
import { Server } from 'ws';

@WebSocketGateway(5501)
export class TracksGateway {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: WebSocket): Promise<void> {
    this.sendCurrentTrack(client);
  }

  sendCurrentTrack(client?: WebSocket): void {
    const track = this.tracksService.getGatewayTrack();
    if (!track) return;

    const data = JSON.stringify({ event: 'current-track', ...track });
    if (client) {
      client.send(data);
    } else {
      this.server.clients.forEach((client) => {
        client.send(data);
      });
    }
  }
}
