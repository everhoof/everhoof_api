import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEvent } from '@modules/calendar/types/calendar-event';
export declare class CalendarResolver {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    getCalendarEvents(): Promise<CalendarEvent[]>;
}
