import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsColorSwitcher, { RdsColorSwitcherProps } from "../src/rds-color-switcher/rds-color-switcher";

describe("RdsColorSwitcher", () => {
    const defaultProps: RdsColorSwitcherProps = {
        header: "Color Switcher",
        itemList: [
            { id: 1, color: "#FF0000" },
            { id: 2, color: "#00FF00" },
            { id: 3, color: "#0000FF" },
        ],
    };

    it("renders with default props", () => {
        render(<RdsColorSwitcher {...defaultProps} />);
        expect(screen.getByText(defaultProps.header!)).toBeInTheDocument();
    });

    it("renders with square display type", () => {
        const props: RdsColorSwitcherProps = {
            ...defaultProps,
            displayType: "square",
        };
        render(<RdsColorSwitcher {...props} />);
        expect(screen.getByText(props.header!)).toBeInTheDocument();
    });

    it("sets default value", () => {
        const props: RdsColorSwitcherProps = {
            ...defaultProps,
            defaultValue: 2,
        };
        render(<RdsColorSwitcher {...props} />);
        expect(screen.getByTestId("selected-color")).toHaveStyle({
            backgroundColor: defaultProps.itemList[1].color,
        });
    });
  
});
