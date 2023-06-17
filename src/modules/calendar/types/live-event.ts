import {
  BaseResponse,
  Pagination,
} from '~/common/types';

export interface LiveEventTag {
  id: number;
  name: string;
  color: string;
}

export interface LiveEvent {
  id: number;
  previewImage: string | null;
  description: string;
  descriptionLong: string | null;
  beginsAt: string;
  estimatedLength: string;
  estimatedEnd: string;
  fileName: string | null;
  fileSize: number | null;
  tags: LiveEventTag[];
}

export type LiveEventResponse = BaseResponse<Pagination<LiveEvent>>;
