import { CalendarService } from '@modules/calendar/calendar.service';
import { CalendarEventDto } from '@modules/calendar/types/calendar-event';
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
    getEvents(): Promise<CalendarEventDto[]>;
}
