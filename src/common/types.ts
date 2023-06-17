export interface BaseResponse<T = Record<string, never>> {
  succeeded: boolean;
  value: T;
  errors: string[];
}

export interface Pagination<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
