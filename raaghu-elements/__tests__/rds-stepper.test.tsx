import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsStepper, { RdsStepperProps } from "../src/rds-stepper/rds-stepper";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsStepper", () => {
    const defaultProps: RdsStepperProps = {
        stepperType: "simple",
        detail: 'Step 1'
    };

    it("renders the component with default props", () => {
        const { getByText } = render(<RdsStepper {...defaultProps} />);
        expect(getByText("Step 1")).toBeInTheDocument();
        expect(getByText("Profile")).toBeInTheDocument();
        expect(getByText("Step 2")).toBeInTheDocument();
        expect(getByText("Positions")).toBeInTheDocument();
        expect(getByText("Step 3")).toBeInTheDocument();
        expect(getByText("Settings")).toBeInTheDocument();
    });

    it("increases the page count when Next button is clicked", () => {
        const { getByText } = render(<RdsStepper {...defaultProps} />);
        fireEvent.click(getByText("Next"));
        expect(getByText("Step 2")).toBeInTheDocument();
        expect(getByText("Positions")).toBeInTheDocument();
    });

    it("decreases the page count when Prev button is clicked", () => {
        const { getByText } = render(<RdsStepper {...defaultProps} />);
        fireEvent.click(getByText("Next"));
        fireEvent.click(getByText("Prev"));
        expect(getByText("Step 1")).toBeInTheDocument();
        expect(getByText("Profile")).toBeInTheDocument();
    });
});
