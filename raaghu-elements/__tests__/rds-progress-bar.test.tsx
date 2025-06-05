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
        
        // The percentage might be rendered in a span next to the progress bar
        // Look for the text content "50%" anywhere in the document
        const percentageContainer = screen.getByText(/50\s*%/);
        expect(percentageContainer).toBeInTheDocument();
    });

    it("renders progress bar without percentage", () => {
        const newProps = {
            ...props,
            displayPercentage: false,
        };
        render(<RdsProgressBar {...newProps} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
        
        // Make sure there's no percentage display
        const percentageElements = screen.queryByText(/50\s*%/);
        expect(percentageElements).not.toBeInTheDocument();
    });

    it("verifies progress bar width corresponds to value", () => {
        render(<RdsProgressBar {...props} />);
        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveStyle("width: 50%");
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
    
    it("renders with striped style when striped prop is true", () => {
        const newProps = {
            ...props,
            striped: true
        };
        render(<RdsProgressBar {...newProps} />);
        const progressBar = screen.getByRole("progressbar");
        
        // Check for striped class on the progress bar
        expect(progressBar.className).toContain("progress-bar-striped");
    });
});
