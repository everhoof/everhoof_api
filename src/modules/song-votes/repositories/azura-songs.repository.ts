import {
  EntityRepository,
  Repository,
} from 'typeorm';

import { AzuraSong } from '../entities/azura-song.entity';

@EntityRepository(AzuraSong)
export class AzuraSongsRepository extends Repository<AzuraSong> {
  getSongById(id: string): Promise<AzuraSong | undefined> {
    return this.findOne({
      where: { id },
    });
  }

  async addSong(song: AzuraSong): Promise<void> {
    await this.save(song);
  }
}
