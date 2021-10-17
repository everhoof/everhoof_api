import { TracksModule } from '@modules/tracks/tracks.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AzuraSongsRepository } from './repositories/azura-songs.repository';
import { SongVotesRepository } from './repositories/song-votes.repository';
import { SongVotesResolver } from './song-votes.resolver';
import { SongVotesService } from './song-votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([AzuraSongsRepository, SongVotesRepository]), TracksModule],
  providers: [SongVotesService, SongVotesResolver],
})
export class SongVotesModule { }
