import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import RdsButton from "../src/rds-button/rds-button";
import { TooltipStyle } from "../src/rds-tooltip/rds-tooltip";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsButton", () => {
    it("renders button with label", () => {
        render(<RdsButton label="Click me" type={"submit"} />);
        const button = screen.getByText("Click me");
        expect(button).toBeInTheDocument();
    });

    it("handles click events", () => {
        const handleClick = jest.fn();
        render(
            <RdsButton label="Click me" onClick={handleClick} type={"button"} />
        );
        const button = screen.getByText("Click me");
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("disables the button when isDisabled prop is true", () => {
        render(<RdsButton isDisabled={true} type={"button"} />);
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it("renders button with icon", () => {
        render(<RdsButton type={"button"} icon="plus" />);
        const button = screen.getByRole("img");
        expect(button).toBeInTheDocument();
    });

    it("renders button with tooltip", () => {
        render(
            <RdsButton
                label="Button Label"
                tooltip={true}
                tooltipTitle="Tooltip Title"
                tooltipPlacement={TooltipStyle.MiddleBottomArrow}
                type={"button"}
            />
        );
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("tooltip is shown when button is hovered", () => {
        render(
            <RdsButton
                label="Button Label"
                tooltip={true}
                tooltipTitle="Tooltip Title"
                tooltipPlacement={TooltipStyle.MiddleBottomArrow}
                type={"submit"}
            />
        );
        fireEvent.mouseEnter(screen.getByText("Button Label"));
        expect(screen.getByRole("tooltip")).toBeVisible();
    });
});
