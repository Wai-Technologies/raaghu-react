import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompOtherSettings from "../src/rds-comp-other-settings/rds-comp-other-settings";

describe("RdsCompOtherSettings", () => {
    it("renders the component correctly", () => {
        render(<RdsCompOtherSettings />);
        const labelElement = screen.getByText("Quick Theme Selection");
        expect(labelElement).toBeInTheDocument();
        const checkboxElement = screen.getByText("Is Quick Theme Select Enabled");
        expect(checkboxElement).toBeInTheDocument();
        expect(checkboxElement).not.toBeChecked();
    });
});
