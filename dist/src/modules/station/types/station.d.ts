export declare class Playlists {
    m3u: string;
    pls: string;
}
export declare class Listeners {
    current: number;
    unique: number;
    total: number;
}
export declare class Mount {
    path: string;
    default: boolean;
    id: number;
    name: string;
    url: string;
    bitrate: number;
    format: string;
    listeners: Listeners;
}
export declare class Station {
    id: number;
    name: string;
    shortcode: string;
    description: string;
    frontend: string;
    backend: string;
    listenUrl: string;
    public: boolean;
    playlists: Playlists;
    mounts: Mount[];
}
