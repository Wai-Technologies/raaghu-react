import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsAreaChart, { lineprops } from "../src/rds-chart-area/rds-chart-area";
import Chart,{LineController} from "chart.js/auto";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";



import "@testing-library/jest-dom";
import RdsToggle from "../src/rds-toggle/rds-toggle";

describe("RdsToggle", () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        iconOnUncheck: "uncheck",
        iconOnCheck: "check",
        checked: false,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        const { container } = render(<RdsToggle {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("calls onChangeHandler function when checkbox is clicked", () => {
        const { getByRole } = render(
            <RdsToggle {...defaultProps} onClick={mockOnClick} />
        );
        fireEvent.click(getByRole("checkbox"));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

});

