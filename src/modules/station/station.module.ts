import { Module } from '@nestjs/common';
import { StationService } from '@modules/station/station.service';
import { StationResolver } from '@modules/station/station.resolver';

@Module({
  providers: [StationService, StationResolver],
})
export class StationModule {}
