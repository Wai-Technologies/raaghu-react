import React from "react";
import { render, screen } from "@testing-library/react";
import RdsCompCalendar, { RdsCalendarProps } from "../src/rds-comp-calendar/rds-comp-calendar";
import "@testing-library/jest-dom";
describe("RdsCompCalendar", () => {
    it("renders the calendar component", () => {
        const events: never[] = [
            // Define test events here
        ];

        render(<RdsCompCalendar events={events} />);
    
    });
});

describe("RdsCompCalendar", () => {
    const mockEvents: any[] = [
        {
            id: 1,
            title: "Event 1",
            start: new Date(),
            end: new Date(),
        },
    ];

    const renderComponent = (props: RdsCalendarProps) => {
        return render(<RdsCompCalendar {...props} />);
    };

    it("renders calendar component", () => {
        const { getByText } = renderComponent({ events: mockEvents });

        // Verify that the calendar component is rendered
        expect(getByText("Event 1")).toBeInTheDocument();
    });
});

