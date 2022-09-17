export enum QueueOrigin {
  AdminRequest,
  ListenerRequest,
  DJStream,
  AutoDJ,
  AutoDJ_random,
  AutoDJ_jingle,
}

export interface PlayoutHistorySong {
  id: number;
  length: string;
  artist: string | null;
  title: string | null;
  album: string | null;
  playlistId: number | null;
}

export interface PlayoutHistoryEntry {
  id: number;
  begin: string;
  end: string;
  listenerCount: number;
  origin: QueueOrigin;
  song: PlayoutHistorySong;
}

export interface PlayoutHistory {
  page: number;
  totalPageCount: number;
  totalItems: number;
  items: PlayoutHistoryEntry[];
}
