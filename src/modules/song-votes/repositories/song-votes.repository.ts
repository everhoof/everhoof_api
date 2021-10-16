import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { SongVote } from '../entities/song-vote.entity';

@EntityRepository(SongVote)
export class SongVotesRepository extends Repository<SongVote> {
  getLastVoteByIP(ip: string): Promise<SongVote | undefined> {
    return this.findOne({
      where: { ip },
      order: { ts: 'DESC' },
    });
  }

  async addVote(song: SongVote): Promise<void> {
    await this.save(song);
  }
}
