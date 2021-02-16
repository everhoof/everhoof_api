export declare class CalendarEvent {
    summary: string;
    startsAt: number;
    endsAt: number;
    notify: boolean;
}
export interface CalendarEventParams {
    notify: boolean;
}
export declare class CalendarEventDto {
    summary: string;
    starts_at: string;
    ends_at: string;
}
