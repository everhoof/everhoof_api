import { BaseResponse } from '~/common/types';

export interface HistoryEntry {
  playingEnded: string;
  title: string | null;
  artist: string | null;
}

export type HistoryResponse = BaseResponse<HistoryEntry[]>;
