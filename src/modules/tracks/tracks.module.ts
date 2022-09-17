import { Module } from '@nestjs/common';

import { StationModule } from '~/modules/station/station.module';
import { TracksGateway } from '~/modules/tracks/tracks.gateway';
import { TracksResolver } from '~/modules/tracks/tracks.resolver';
import { TracksService } from '~/modules/tracks/tracks.service';

@Module({
  imports: [StationModule],
  providers: [TracksService, TracksResolver, TracksGateway],
  exports: [TracksGateway, TracksService],
})
export class TracksModule {}
