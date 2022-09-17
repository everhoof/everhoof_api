export interface LiveEventTag {
  id: number;
  name: string;
  color: string;
}
export interface DiscordEvent {
  discordEventId: number;
  announceAt: string;
  eventLocation: string;
}

export interface LiveEvent {
  id: number;
  description: string;
  descriptionLong: string | null;
  dateTime: string;
  customInfo: string | null;
  fileName: string | null;
  previewImage: string | null;
  fileSize: number | null;
  hidden: boolean;
  tagIds: number[];
  publishAt: string;
  discordEvent: DiscordEvent | null;
  tags: LiveEventTag[];
}

export interface LiveEventsResponse {
  page: number;
  totalPageCount: number;
  totalItems: number;
  items: LiveEvent[];
}
