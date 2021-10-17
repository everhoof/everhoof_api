import { Module } from '@nestjs/common';

import { StationResolver } from '~/modules/station/station.resolver';
import { StationService } from '~/modules/station/station.service';

@Module({
  providers: [StationService, StationResolver],
})
export class StationModule {}
