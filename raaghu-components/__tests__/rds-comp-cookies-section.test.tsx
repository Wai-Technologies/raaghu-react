import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompCookiesSection from "../src/rds-comp-cookies-section/rds-comp-cookies-section";

// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    const React = jest.requireActual('react');
    return {
      ...jest.requireActual('react-lottie-player'),
      useRef: React.useRef,
    };
  });
  
// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    return {
      ...jest.requireActual('react-lottie-player'),
      __esModule: true,
      default: jest.fn(),
    };
  });
  
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: any) => key }),
}));
describe("RdsCompCookiesSection", () => {
    test("renders the component with accept button", () => {
        render(<RdsCompCookiesSection />);
        const acceptButton = screen.getByTestId("accept");
        expect(acceptButton).toBeInTheDocument();
        const alertMessage = screen.getByText("This website uses cookies to ensure you get the best experience on our website.");
        expect(alertMessage).toBeInTheDocument();
    });

    test("renders the component with decline button", () => {
        render(<RdsCompCookiesSection showDeclineButton={true} />);   
        const showAcceptButton = screen.getByTestId("show-accept");
        expect(showAcceptButton).toBeInTheDocument();  
        const declineButton = screen.getByTestId("decline");
        expect(declineButton).toBeInTheDocument();
        const alertMessage = screen.getByText("This website uses cookies to ensure you get the best experience on our website.");
        expect(alertMessage).toBeInTheDocument();
    });
});
