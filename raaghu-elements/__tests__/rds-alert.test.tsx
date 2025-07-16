import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RdsAlert, { AlertType } from "../src/rds-alert/rds-alert";
import "@testing-library/jest-dom";
import React from "react";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

// Mock fetch to prevent icon loading errors in tests
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve(''),
            json: () => Promise.resolve({}),
            blob: () => Promise.resolve(new Blob()),
            clone: () => this,
            headers: { get: () => null },
            redirected: false,
            status: 200,
            statusText: 'OK',
            type: 'basic',
            url: '',
            body: null,
            bodyUsed: false,
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            formData: () => Promise.resolve(new FormData()),
        })
    ) as jest.Mock;
});

describe("RdsAlert", () => {
    it("renders alert description when provided", () => {
        const alertDescription = "Test alert description";
        render(<RdsAlert description={alertDescription} showDescription={true} type={AlertType.info} />);
        const alertContainer = screen.getByRole("alert");
        expect(alertContainer).toHaveTextContent(alertDescription);
    });

    it("displays icon when provided", () => {
        const icon = "check-circle";
        render(
            <RdsAlert
                changeIcon={icon}
                showIcon={true}
                description="Test alert description"
                showDescription={true}
                type={AlertType.info}
                multiline={true}
            />
        );
        const alertContainer = screen.getByRole("alert");
        // For multiline alerts, icon is rendered in a container with id 'rdicon'
        const iconContainer = alertContainer.querySelector('#rdicon');
        expect(iconContainer).toBeInTheDocument();
    });
});
