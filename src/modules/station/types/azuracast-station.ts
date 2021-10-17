export interface AzuracastStation {
  id: number;
  name: string;
  shortcode: string;
  description: string;
  frontend: string;
  backend: string;
  listen_url: string;
  is_public: boolean;
  mounts: Mount[];
  remotes: unknown[];
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

export interface Listeners {
  current: number;
  unique: number;
  total: number;
}
