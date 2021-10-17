import { StationResolver } from '@modules/station/station.resolver';
import { StationService } from '@modules/station/station.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [StationService, StationResolver],
})
export class StationModule {}
