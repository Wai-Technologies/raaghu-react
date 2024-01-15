import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompUserClaim from "../src/rds-comp-user-claims/rds-comp-user-claims";

describe("RdsCompUserClaim", () => {
    test("renders input fields and buttons", () => {
        render(<RdsCompUserClaim />);

        // Check if the input fields are rendered
        const typeInput = screen.getByTestId("type");
        const valueInput = screen.getByTestId("value");
        expect(typeInput).toBeInTheDocument();
        expect(valueInput).toBeInTheDocument();

        // Check if the buttons are rendered
        const cancelButton = screen.getByTestId("cancel");
        const nextButton = screen.getByTestId("next");
        expect(cancelButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();

        expect(screen.getByText("Type")).toBeInTheDocument();
        expect(screen.getByText("Value")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
    });
});
