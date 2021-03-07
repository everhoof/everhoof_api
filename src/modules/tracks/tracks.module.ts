import { Module } from '@nestjs/common';
import { TracksService } from '@modules/tracks/tracks.service';
import { TracksResolver } from '@modules/tracks/tracks.resolver';
import { TracksGateway } from '@modules/tracks/tracks.gateway';

@Module({
  providers: [TracksService, TracksResolver, TracksGateway],
})
export class TracksModule {}
