import {
  BaseResponse,
  Pagination,
} from '~/common/types';

export interface Song {
  id: number;
  artist: string | null;
  title: string | null;
  album: string | null;
}

export type SongsResponse = BaseResponse<Pagination<Song>>;
