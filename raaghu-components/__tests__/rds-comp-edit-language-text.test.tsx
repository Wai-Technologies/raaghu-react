import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompEditLanguageText from "../src/rds-comp-edit-language-text/rds-comp-edit-language-text";

describe("RdsCompEditLanguageText", () => {
    it("renders base language textarea correctly", () => {
        render(<RdsCompEditLanguageText />);
        const baseLanguageTextarea = screen.getByText("Base Language");
        expect(baseLanguageTextarea).toBeInTheDocument();
        expect(baseLanguageTextarea).not.toBeDisabled();
    // Add more assertions if needed
    });

    it("renders target language textarea correctly", () => {
        render(<RdsCompEditLanguageText />);
        const targetLanguageTextarea = screen.getByText("Target Language");
        expect(targetLanguageTextarea).toBeInTheDocument();
        expect(targetLanguageTextarea).not.toBeDisabled();
    });

    it("calls save function when Save button is clicked", () => {
        render(<RdsCompEditLanguageText />);
        const saveButton = screen.getByTestId("save");
        fireEvent.click(saveButton);
    });

    it("calls cancel function when Cancel button is clicked", () => {
        render(<RdsCompEditLanguageText/>);
        const cancelButton = screen.getByTestId("cancel");
        fireEvent.click(cancelButton);
    });
});
