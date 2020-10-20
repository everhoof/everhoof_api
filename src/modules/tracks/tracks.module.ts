import { Module } from '@nestjs/common';
import { TracksService } from '@modules/tracks/tracks.service';
import { TracksResolver } from '@modules/tracks/tracks.resolver';

@Module({
  providers: [TracksService, TracksResolver],
})
export class TracksModule {}
