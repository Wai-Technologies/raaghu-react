import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsFeatureList from "../src/rds-feature-list/rds-feature-list";

describe("RdsFeatureList", () => {
    const mockProps = {
        heading: "List",
        itemList: ["Feature 1", "Feature 2", "Feature 3"],
        columns: 2,
        colorVariant:"primary"
    };

    it("should render the component with correct heading and list items", () => {
        render(
            <RdsFeatureList {...mockProps} fontStyle="italic" colorVariant="primary" />
        );
        expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
        expect(screen.getAllByText(/Feature/)).toHaveLength(mockProps.itemList.length);
    });

    it("should render the correct number of columns", () => {
        render(<RdsFeatureList {...mockProps} fontStyle="italic" colorVariant="primary"/>);
        expect(screen.getAllByTestId("column")).toHaveLength(mockProps.columns);
    });

    it("should render list items with the correct style and color", () => {
        render(<RdsFeatureList {...mockProps} fontStyle="italic" colorVariant="primary" />);
        const headingElement = screen.getByRole("heading");
        const listItems = screen.getAllByText(/Feature/);
        listItems.forEach(item => {
            expect(item).toHaveClass("fw-normal", "fst-italic");
        });
        expect(headingElement).toHaveClass(`text-${mockProps.colorVariant}`);
    });
});
