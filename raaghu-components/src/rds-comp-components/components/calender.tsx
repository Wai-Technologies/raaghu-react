import React from "react";
import RdsCompCalendar from "../../rds-comp-calendar/rds-comp-calendar";

export const code_actual = () => {
    return (
        <RdsCompCalendar events={[
            {
                title: "Big Meeting",
                allDay: true,
                start: new Date(2021, 6, 10),
                end: new Date(2021, 6, 12),
            },
            {
                title: "Vacation",
                start: new Date(2021, 6, 7),
                end: new Date(2021, 6, 10),
            },
            {
                title: "Conference",
                start: new Date(2021, 6, 20),
                end: new Date(2021, 6, 23),
            },
        ]}
        />
    );
};

export default code_actual;