import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Tooltip, { TooltipStyle } from "../src/rds-tooltip/rds-tooltip";

describe("Tooltip component", () => {

    it("disposes tooltip correctly", () => {
        const { unmount } = render(
            <Tooltip label="Tooltip text" style={TooltipStyle.MiddleBottomArrow}>
                <button role="tooltip">Hover me</button>
            </Tooltip>
        );

        unmount(); // Dispose the component
        expect(() => screen.getByRole("button")).toThrow(); // Ensure the button is no longer in the DOM
    });
});
