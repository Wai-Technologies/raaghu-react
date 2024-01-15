import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsSize, { RdsSizeProps } from "../src/rds-size/rds-size";

describe("RdsSize", () => {
    const sizeData: any[] = [
        { value: "Small", inStock: true },
        { value: "Medium", inStock: true },
        { value: "Large", inStock: false },
    ];

    const sizeDataWithDescription: any[] = [
        { value: "Small", description: "Fits most kids ages 6-8" },
        { value: "Medium", description: "Fits most adults" },
        {
            value: "Large",
            description: "For larger heads or to wear a hat underneath",
        },
    ];

    const defaultProps: RdsSizeProps = {
        sizeType: "withDescription",
        sizeData,
        sizeDataWithDescription,
    };

    it("should render withDescription size options correctly", () => {
        render(<RdsSize {...defaultProps} />);
        expect(screen.getByText("Small")).toBeInTheDocument();
        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("Large")).toBeInTheDocument();
    });

    it("should render withoutDescription size options correctly", () => {
        const props: RdsSizeProps = {
            ...defaultProps,
            sizeType: "withoutDescription",
        };
        render(<RdsSize {...props} />);
        expect(screen.getByText("Small")).toBeInTheDocument();
        expect(screen.getByText("Medium")).toBeInTheDocument();
        expect(screen.getByText("Large")).toBeInTheDocument();
    });

    it("should highlight selected size option with description", () => {
        render(<RdsSize {...defaultProps} />);
        const mediumButton = screen.getByTestId("size-button-1");
        fireEvent.click(mediumButton);
        expect(mediumButton.classList.contains("border-color")).toBe(true);
    });
});
