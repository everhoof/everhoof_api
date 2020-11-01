export interface AzuracastRequest {
  request_id: string;
  request_url: string;
  song_id: string;
  song_text: string;
  song_artist: string;
  song_title: string;
  song_album: string;
  song_lyrics: string;
  song_art: string;
  song_custom_fields_youtube?: string;
}

export interface AzuracastRequests {
  current: number;
  rowCount: number;
  total: number;
  rows: AzuracastRequest[];
}

export interface AzuracastRequestResponse {
  code?: number;
  message: string;
  formatted_message: string;
  extra_data: string[];
  success: boolean;
}
