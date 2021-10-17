import { Module } from '@nestjs/common';

import { TracksGateway } from '~/modules/tracks/tracks.gateway';
import { TracksResolver } from '~/modules/tracks/tracks.resolver';
import { TracksService } from '~/modules/tracks/tracks.service';

@Module({
  providers: [TracksService, TracksResolver, TracksGateway],
  exports: [TracksGateway, TracksService],
})
export class TracksModule {}
