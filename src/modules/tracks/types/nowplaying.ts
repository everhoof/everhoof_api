export interface CurrentPlayingLastMetadata {
  id: string | null;
  playlistId: string | null;
  artist: string | null;
  title: string | null;
}

export interface CurrentPlayingPlaylist {
  id: number;
  name: string | null;
}

export interface CurrentPlayingTrack {
  id: number;
  length: string | null;
  begin: string | null;
  end: string | null;
  artist: string | null;
  title: string | null;
  album: string | null;
  playlist: CurrentPlayingPlaylist | null;
}

export interface NowPlaying {
  lastMetadata: CurrentPlayingLastMetadata | null;
  liveUser: string | null;
  current: CurrentPlayingTrack | null;
  next: CurrentPlayingTrack | null;
}
