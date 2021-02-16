import { CalendarEvent } from '@modules/calendar/types/calendar-event';
export declare class CalendarService {
    private readonly calendar;
    private calendarEvents;
    constructor();
    updateCalendarEvents(): Promise<CalendarEvent | undefined>;
    getCalendarEvents(): Promise<CalendarEvent[]>;
    private static parseParams;
}
