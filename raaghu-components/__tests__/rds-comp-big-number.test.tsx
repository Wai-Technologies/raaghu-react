import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompBigNumber, { RdsCompBigNumberProps } from "../src/rds-comp-big-number/rds-comp-big-number";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));


describe("RdsCompBigNumber", () => {
    const defaultProps: RdsCompBigNumberProps = {
        bigNumber: "123",
        subTitle: "Test subtitle",
    };

    it("renders the big number and subtitle", () => {
        render(<RdsCompBigNumber bigNumber="123" subTitle='Test subtitle' isIconSubTitle={true} />);
        expect(screen.getByText(defaultProps.bigNumber)).toBeInTheDocument();
        expect(screen.getByText("Test subtitle")).toBeInTheDocument();
    });

    it("renders children when provided", () => {
        render(
            <RdsCompBigNumber {...defaultProps}>
                <div data-testid="test-child" />
            </RdsCompBigNumber>
        );
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });
});
