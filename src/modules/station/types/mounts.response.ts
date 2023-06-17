import { BaseResponse } from '~/common/types';

export interface MountsResponseItem {
  displayName: string;
  path: string;
  bitrate: number;
  format: string;
}

export type MountsResponse = BaseResponse<MountsResponseItem[]>;
