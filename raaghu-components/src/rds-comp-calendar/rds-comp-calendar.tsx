import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./rds-comp-calendar.css";

export interface RdsCalendarProps {
    events: any[];
}

const RdsCompCalendar = (props: RdsCalendarProps) => {
    const localizer = momentLocalizer(moment);
    return (
        <>
            <div>
                <Calendar
                    localizer={localizer}
                    events={props.events}
                    startAccessor="start"
                    endAccessor="end"
                    className="calenderHeight"
                />
            </div>
        </>
    );
};

export default RdsCompCalendar;
