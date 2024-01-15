import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsTextEditor, { RdsTextEditorProps } from "../src/rds-text-editor/rds-text-editor";

module.exports = {
    //...
    setupFilesAfterEnv: ["./jest.setup.js"],
};

describe("RdsTextEditor Component", () => {
    const props = {
        label: "Sample Text Editor",
    };

    it("should render correctly", () => {
        // Render the component
        render(<RdsTextEditor {...props} />);

        // Assert that the component elements have rendered as expected
        expect(screen.getByText("Sample Text Editor")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    const defaultProps: RdsTextEditorProps = {
        label: "Text Editor",
    };

    it("renders label", () => {
        const { getByText } = render(<RdsTextEditor {...defaultProps} />);
        expect(getByText("Text Editor")).toBeInTheDocument();
    });

    it("renders the label passed as a prop", () => {
        render(<RdsTextEditor label="Test Label" />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

});

