import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';
import { StationService } from '@modules/station/station.service';
import { Station } from '@modules/station/types/station';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Station')
export class StationResolver {
  constructor(private readonly mountsService: StationService) {}

  @Query(() => Station)
  getStation(): Promise<Station> {
    return this.mountsService.getStation();
  }
}
