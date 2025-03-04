import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsProgressBar, {
    RdsProgressBarProps,
} from "../src/rds-progress-bar/rds-progress-bar";

describe("RdsProgressBar", () => {
    const props: RdsProgressBarProps = {
        colorVariant: "primary",
        striped: false,
        progressWidth: 50,
        role: "single",
        displayPercentage: true,
        steps: 0,
        completedSteps: 0
    };

    it("renders progress bar with percentage", () => {
        render(<RdsProgressBar {...props} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
        expect(progressBar).toHaveTextContent("50%");
    });

    it("renders progress bar without percentage", () => {
        const newProps = {
            ...props,
            displayPercentage: false,
        };
        render(<RdsProgressBar {...newProps} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
        expect(progressBar).not.toHaveTextContent("50%");
    });

    it("renders progress bar with level indicators", () => {
        const newProps = {
            ...props,
            displayLevel: true,
        };
        render(<RdsProgressBar {...newProps} />);

        const levelIndicatorMin = screen.getByTestId("level-indicator-min");
        const levelIndicatorMax = screen.getByTestId("level-indicator-max");

        expect(levelIndicatorMin).toHaveTextContent("0");
        expect(levelIndicatorMax).toHaveTextContent("100");
    });

    it("renders multiple progress bars", () => {
        const newProps = {
            ...props,
            role: "multiple",
            progressValues: [
                {
                    colorVariant: "primary",
                    stripe: "",
                    animation: "",
                    progressWidth: 30,
                },
                {
                    colorVariant: "secondary",
                    stripe: "progress-bar-striped",
                    animation: "progress-bar-animated",
                    progressWidth: 70,
                },
            ],
        };
        render(<RdsProgressBar {...newProps} />);
        const progressBars = screen.getAllByRole("progressbar");
        expect(progressBars).toHaveLength(2);
        expect(progressBars[0]).toHaveAttribute("aria-valuenow", "30");
        expect(progressBars[1]).toHaveAttribute("aria-valuenow", "70");
    });
});
