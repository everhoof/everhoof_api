export declare class CalendarEvent {
    summary: string;
    startsAt: number;
    endsAt: number;
    preview: string;
    notify: boolean;
}
export interface CalendarEventParams {
    notify: boolean;
    preview: string;
}
export declare class CalendarEventDto {
    summary: string;
    starts_at: string;
    ends_at: string;
    preview: string;
}
