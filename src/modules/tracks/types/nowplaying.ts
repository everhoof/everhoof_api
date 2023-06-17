import { BaseResponse } from '~/common/types';

export interface CurrentPlayingRawMetadata {
  artist: string | null;
  title: string | null;
}

export interface CurrentPlayingTrack {
  id: number | null;
  audioLength: string | null;
  begin: string | null;
  end: string | null;
  artist: string | null;
  title: string | null;
  album: string | null;
}

export interface NowPlaying {
  rawMetadata: CurrentPlayingRawMetadata | null;
  liveUser: string | null;
  now: CurrentPlayingTrack | null;
  next: CurrentPlayingTrack | null;
}

export type NowPlayingResponse = BaseResponse<NowPlaying>;
