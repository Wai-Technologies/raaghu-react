import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompColorSwitcher, { DisplayType, RdsCompColorSwitcherProps } from "../src/rds-comp-color-switcher/rds-comp-color-switcher";

describe("RdsCompColorSwitcher", () => {
    const defaultProps: RdsCompColorSwitcherProps = {
        header: "Color Switcher",
        itemList: [
            { id: 1, color: "#FF0000" },
            { id: 2, color: "#00FF00" },
            { id: 3, color: "#0000FF" },
        ],
    };

    it("renders with default props", () => {
        render(<RdsCompColorSwitcher {...defaultProps} />);
        expect(screen.getByText(defaultProps.header!)).toBeInTheDocument();
    });

    it("renders with square display type", () => {
        const props: RdsCompColorSwitcherProps = {
            ...defaultProps,
            displayType: DisplayType.Square,
        };
        render(<RdsCompColorSwitcher {...props} />);
        expect(screen.getByText(props.header!)).toBeInTheDocument();
    });

    it("sets default value", () => {
        const props: RdsCompColorSwitcherProps = {
            ...defaultProps,
            defaultValue: 2,
        };
        render(<RdsCompColorSwitcher {...props} />);
        expect(screen.getByTestId("selected-color")).toHaveStyle({
            backgroundColor: defaultProps.itemList[1].color,
        });
    });
  
});
