import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TracksService } from '~/modules/tracks/tracks.service';

import { VoteArgs } from './args/vote.args';
import { AzuraSongsRepository } from './repositories/azura-songs.repository';
import { SongVotesRepository } from './repositories/song-votes.repository';

@Injectable()
export class SongVotesService {
  constructor(
    @InjectRepository(SongVotesRepository)
    private readonly songVotesRepository: SongVotesRepository,
    @InjectRepository(AzuraSongsRepository)
    private readonly azuraSongsRepository: AzuraSongsRepository,
    private readonly tracksService: TracksService,
  ) {}

  async voteForNowPlaying(voteArgs: VoteArgs, ip: string): Promise<boolean> {
    const nowPlaying = await this.tracksService.getCurrentPlaying();
    if (!nowPlaying) return false;

    const lastVote = await this.songVotesRepository.getLastVoteByIP(ip);

    if (lastVote && lastVote.azuraSongId === nowPlaying.current.id) return false;

    let azuraSong = await this.azuraSongsRepository.getSongById(nowPlaying.current.id);
    if (!azuraSong) {
      const newAzSong = this.azuraSongsRepository.create({
        artist: nowPlaying.current.artist,
        title: nowPlaying.current.title,
        id: nowPlaying.current.id,
      });
      azuraSong = await this.azuraSongsRepository.save(newAzSong);
    }
    if (azuraSong) {
      const newVote = this.songVotesRepository.create({
        ip,
        rating: voteArgs.rating,
        azuraSongId: azuraSong.id,
      });
      await this.songVotesRepository.save(newVote);
      return true;
    }

    return false;
  }
}
