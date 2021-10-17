import { TracksGateway } from '@modules/tracks/tracks.gateway';
import { TracksResolver } from '@modules/tracks/tracks.resolver';
import { TracksService } from '@modules/tracks/tracks.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [TracksService, TracksResolver, TracksGateway],
})
export class TracksModule {}
