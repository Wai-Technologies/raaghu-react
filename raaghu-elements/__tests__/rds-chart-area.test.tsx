import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsAreaChart, { lineprops } from "../src/rds-chart-area/rds-chart-area";
import Chart,{LineController} from "chart.js/auto";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";



import "@testing-library/jest-dom";
import RdsToggle, { ToggleLayout, ToggleState, ToggleStyle } from "../src/rds-toggle/rds-toggle";

describe("RdsToggle", () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        iconOnUncheck: "uncheck",
        iconOnCheck: "check",
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        const { container } = render(<RdsToggle style={ToggleStyle.Style1} layout={ToggleLayout.SwitchLabel} checked={false} state={ToggleState.DisabledOn} {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });


    it("calls onClick handler when switch is clicked and enabled", async () => {
        const { getByRole } = render(
            <RdsToggle
                style={ToggleStyle.Style1}
                layout={ToggleLayout.SwitchLabel}
                checked={false}
                state={ToggleState.Off} // Must be enabled for click
                {...defaultProps}
                onClick={mockOnClick}
            />
        );
        const switchInput = getByRole("switch");
        await userEvent.click(switchInput);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});

