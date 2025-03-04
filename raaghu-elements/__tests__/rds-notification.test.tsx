import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsNotification, { RdsNotificationProps } from "../src/rds-notification/rds-notification";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsNotification", () => {
    const defaultProps: RdsNotificationProps = {
        notifications: [
            {
                userNotificationId: "1",
                title: "Notification 1",
                status: "info",
                time: "2022-01-01T00:00:00.000Z",
            },
            {
                userNotificationId: "2",
                title: "Notification 2",
                status: "warn",
                time: "2022-01-02T00:00:00.000Z",
            },
        ],
    };

    it("renders the component with notifications", () => {
        render(<RdsNotification {...defaultProps} />);

        expect(screen.getByText((content, element) => {
            return content.startsWith("2") && content.endsWith("New");
        })).toBeInTheDocument();
    });


    const notifications = [
        {
            userNotificationId: 1,
            title: "Notification 1",
            time: "1 hour ago",
            status: "info",
        },
        {
            userNotificationId: 2,
            title: "Notification 2",
            time: "2 hours ago",
            status: "warn",
        },
    ];

    it("renders the component with notifications", () => {
        const { getByText } = render(
            <RdsNotification
                notifications={notifications}
            />
        );
        expect(getByText("Notification")).toBeInTheDocument();
        expect(getByText("2 New")).toBeInTheDocument();
        expect(getByText("Notification 1")).toBeInTheDocument();
        expect(getByText("Notification 2")).toBeInTheDocument();
    });

    it("calls onSetAsRead when the 'Set as Read' button is clicked", () => {
        const onSetAsRead = jest.fn();
        const { getAllByText } = render(
            <RdsNotification
                notifications={notifications}
            />
        );
        const setAsReadButtons = getAllByText("Set as Read");
        fireEvent.click(setAsReadButtons[0]);
        expect(onSetAsRead).toHaveBeenCalledWith(
            expect.objectContaining({ type: "click" }),
            notifications[0]
        );
        fireEvent.click(setAsReadButtons[1]);
        expect(onSetAsRead).toHaveBeenCalledWith(
            expect.objectContaining({ type: "click" }),
            notifications[1]
        );
    });
});
