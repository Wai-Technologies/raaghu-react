import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RdsAlert from "../src/rds-alert/rds-alert";
import "@testing-library/jest-dom";
import React from "react";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsAlert", () => {
    it("renders alert message", () => {
        const alertMessage = "Test alert message";
        render(<RdsAlert alertmessage={alertMessage} colorVariant="primary" />);
        const messageElement = screen.getByText(alertMessage);
        expect(messageElement).toBeInTheDocument();
    });

    it("displays icon when provided", () => {
        const icon = "check-circle";
        render(
            <RdsAlert
                alertmessage="Test alert message"
                icon={icon}
                colorVariant="primary"
            />
        );
        const iconElement = screen.getByRole("img");
        expect(iconElement).toBeInTheDocument();
    });
});
