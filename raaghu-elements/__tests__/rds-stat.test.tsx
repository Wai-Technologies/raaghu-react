import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsStat, { RdsStatProps } from "../src/rds-stat/rds-stat";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsStat component", () => {
    const items = [
        {
            icon: "user",
            iconFill: "#000",
            iconHeight: "30px",
            iconWidth: "30px",
            title: "Users",
            value: 100,
        },
        {
            icon: "book",
            iconFill: "#000",
            iconHeight: "30px",
            iconWidth: "30px",
            title: "Books",
            value: 50,
        },
    ];
    const defaultProps: RdsStatProps = {
        displayType: "basic",
        items,
    };

    it("should render basic display type correctly", () => {
        render(<RdsStat {...defaultProps} />);
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should render advanced display type correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            displayType: "advanced",
        };
        render(<RdsStat {...props} />);
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Books")).toBeInTheDocument();
    });

    it("should apply custom background color variant correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            backgroundColorVarient: "blue",
        };
        render(<RdsStat {...props} />);
        expect(screen.getByTestId("rds-stat")).toHaveStyle(
            "background-color: blue;"
        );
    });

    it("should apply custom text color correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            textColor: "success",
        };
        render(<RdsStat {...props} />);
        expect(screen.getByText("100")).toHaveClass("text-success");
    });
});
