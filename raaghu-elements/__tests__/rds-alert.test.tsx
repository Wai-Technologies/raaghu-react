import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RdsAlert, { AlertType } from "../src/rds-alert/rds-alert";
import "@testing-library/jest-dom";
import React from "react";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsAlert", () => {
    it("renders alert message", () => {
        const alertMessage = "Test alert message";
        render(<RdsAlert message={alertMessage} type={AlertType.info} />);
        const messageElement = screen.getByText(alertMessage);
        expect(messageElement).toBeInTheDocument();
    });

    it("displays icon when provided", () => {
        const icon = "check-circle";
        render(
            <RdsAlert
                message="Test alert message"
                icon={icon} type={AlertType.info}            />
        );
        const iconElement = screen.getByRole("img");
        expect(iconElement).toBeInTheDocument();
    });
});
