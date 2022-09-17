export interface CurrentListenersResponse {
  timestamp: string;
  totalListeners: number;
  mounts: CurrentListenersMount[];
}

export interface CurrentListenersMount {
  name: string;
  totalListeners: number;
  listenersPeak: number;
}
