export enum StreamFormat {
  mp3 = 0,
  oggVorbis,
  oggOpus,
  aac,
  flac,
}

export interface MountsResponseItem {
  id: number;
  name: string;
  bitrate: number;
  format: StreamFormat;
}
