import { Ip } from '@common/decorators/ip.decorator';
import { GraphqlExceptionFilter } from '@common/filters/graphql-exception.filter';
import {
  ForbiddenException,
  UseFilters,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
} from '@nestjs/graphql';

import { VoteArgs } from './args/vote.args';
import { SongVotesService } from './song-votes.service';

@UseFilters(GraphqlExceptionFilter)
@Resolver('SongVotes')
export class SongVotesResolver {
  constructor(
    private readonly songVoteService: SongVotesService,
  ) { }

  @Mutation(() => Boolean)
  async voteForNowPlaying(@Args() args: VoteArgs, @Ip() ip?: string): Promise<boolean> {
    if (!ip) throw new ForbiddenException();

    return this.songVoteService.voteForNowPlaying(args, ip);
  }
}
