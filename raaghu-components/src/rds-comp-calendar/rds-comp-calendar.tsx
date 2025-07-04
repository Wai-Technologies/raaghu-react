import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "./rds-comp-calendar.css";

export interface RdsCalendarProps {
    events: any[];
    defaultView?: string;
    defaultDate?: Date;
    showToolbar?: boolean;
    minicalendar?: boolean;
    styleClass?: string;
}

// Get current year and month for sample events
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

// Sample events data for demonstrations
export const getSampleEvents = () => [
    {
        title: "Team Meeting",
        allDay: true,
        start: new Date(currentYear, currentMonth, 10),
        end: new Date(currentYear, currentMonth, 12),
    },
    {
        title: "Vacation",
        start: new Date(currentYear, currentMonth, 7),
        end: new Date(currentYear, currentMonth, 10),
    },
    {
        title: "Conference",
        start: new Date(currentYear, currentMonth, 20),
        end: new Date(currentYear, currentMonth, 23),
    },
    {
        title: "Client Call",
        start: new Date(currentYear, currentMonth, 15, 10, 0), // 10:00 AM
        end: new Date(currentYear, currentMonth, 15, 11, 30),  // 11:30 AM
    },
    {
        title: "Team Lunch",
        start: new Date(currentYear, currentMonth, 17, 12, 0), // 12:00 PM
        end: new Date(currentYear, currentMonth, 17, 13, 30),  // 1:30 PM
    },
    {
        title: "Sprint Planning",
        start: new Date(currentYear, currentMonth, 5, 9, 0),   // 9:00 AM
        end: new Date(currentYear, currentMonth, 5, 11, 0),    // 11:00 AM
    },
];

const RdsCompCalendar = (props: RdsCalendarProps) => {
    const localizer = momentLocalizer(moment);
    const { 
        events, 
        defaultView = "month", 
        defaultDate = new Date(),
        showToolbar = true,
        minicalendar = false,
        styleClass = "" } = props;
    
    // Define the available views
    const views = {
        month: true,
        week: true,
        day: true,
        agenda: true
    };    // Map view names to actual view constants if needed
    const getDefaultView = () => {
        switch(defaultView) {
            case 'month': return Views.MONTH;
            case 'week': return Views.WEEK;
            case 'work_week': return Views.WEEK; // Fallback to week view
            case 'day': return Views.DAY;
            case 'agenda': return Views.AGENDA;
            default: return Views.MONTH;
        }
    };
    
    return (
        <>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={views}
                    defaultView={getDefaultView()}
                    defaultDate={defaultDate}
                    toolbar={showToolbar}
                    className={`${minicalendar ? 'miniCalendar' : 'calenderHeight'} ${styleClass}`}
                />
            </div>
        </>
    );
};

export default RdsCompCalendar;
