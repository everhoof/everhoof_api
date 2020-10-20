export interface Listeners {
  current: number;
  unique: number;
  total: number;
}

export interface Mount {
  path: string;
  is_default: boolean;
  id: number;
  name: string;
  url: string;
  bitrate: number;
  format: string;
  listeners: Listeners;
}

export interface Station {
  id: number;
  name: string;
  shortcode: string;
  description: string;
  frontend: string;
  backend: string;
  listen_url: string;
  is_public: boolean;
  mounts: Mount[];
  remotes: any[];
}

export interface Live {
  is_live: boolean;
  streamer_name: string;
  broadcast_start?: any;
}

export interface Song {
  id: string;
  text: string;
  artist: string;
  title: string;
  album: string;
  lyrics: string;
  art: string;
  custom_fields: any[];
}

export interface NowPlaying {
  elapsed: number;
  remaining: number;
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
}

export interface PlayingNext {
  cued_at: number;
  duration: number;
  playlist: string;
  is_request: boolean;
  song: Song;
}

export interface SongHistory {
  sh_id: number;
  played_at: number;
  duration: number;
  playlist: string;
  streamer: string;
  is_request: boolean;
  song: Song;
}

export interface AzuracastNowPlaying {
  station?: Station;
  listeners?: Listeners;
  live?: Live;
  now_playing?: NowPlaying;
  playing_next?: PlayingNext;
  song_history: SongHistory[];
  cache?: string;
}
