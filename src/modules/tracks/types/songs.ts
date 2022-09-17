export interface Song {
  id: number;
  fileName: string | null;
  filePath: string | null;
  fileSize: number;
  bitrate: number;
  foundOnDisk: boolean;
  useChance: number;
  length: string;
  lengthSeconds: number;
  replayGain: number | null;
  artist: string | null;
  title: string | null;
  album: string | null;
  lyrics: string | null;
  amplify: number | null;
  crossDuration: number | null;
  fadeIn: number | null;
  fadeOut: number | null;
  cueIn: number | null;
  cueOut: number | null;
}

export interface SongsResponse {
  page: number;
  totalPageCount: number;
  totalItems: number;
  items: Song[];
}
