import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompIdentiyResourceBasic from "../src/rds-comp-identiy-resource-basic/rds-comp-identiy-resource-basic";

jest.mock("../__mocks__/bootstrap.ts", () => ({
    Offcanvas: jest.fn(),
}));

describe("RdsCompIdentiyResourceBasic", () => {
    it("renders input fields", () => {
        render(<RdsCompIdentiyResourceBasic />);
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("display-name")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("sets identity basic data on input change", () => {
        render(<RdsCompIdentiyResourceBasic />);

        const nameInput = screen.getByTestId("name") as HTMLInputElement;
        const displayNameInput = screen.getByTestId(
            "display-name"
        ) as HTMLInputElement;
        const descriptionInput = screen.getByPlaceholderText("Description") as HTMLInputElement;


        fireEvent.change(nameInput, { target: { value: "John" } });
        fireEvent.change(displayNameInput, { target: { value: "John Doe" } });
        fireEvent.change(descriptionInput, {
            target: { value: "Test description" },
        });

        expect(nameInput.value).toBe("John");
        expect(displayNameInput.value).toBe("John Doe");
        expect(descriptionInput.value).toBe("Test description");
    });

    it("submits form data on save button click", () => {
        render(<RdsCompIdentiyResourceBasic />);

        const saveButton = screen.getByTestId("save");
        const nameInput = screen.getByTestId("name");
        const displayNameInput = screen.getByTestId("display-name");
        const descriptionInput = screen.getByPlaceholderText("Description");

        fireEvent.change(nameInput, { target: { value: "John" } });
        fireEvent.change(displayNameInput, { target: { value: "John Doe" } });
        fireEvent.change(descriptionInput, {
            target: { value: "Test description" },
        });
        fireEvent.click(saveButton);
    });

    it("toggles enabled checkbox", () => {
        render(<RdsCompIdentiyResourceBasic />);
        const enabledCheckbox = screen.getByTestId("enabled") as HTMLInputElement;
        fireEvent.click(enabledCheckbox);
        expect(enabledCheckbox.checked).toBe(true);
        fireEvent.click(enabledCheckbox);
        expect(enabledCheckbox.checked).toBe(false);
    });

    it("toggles required checkbox", () => {
        render(<RdsCompIdentiyResourceBasic />);
        const requiredCheckbox = screen.getByTestId("required") as HTMLInputElement;
        fireEvent.click(requiredCheckbox);
        expect(requiredCheckbox.checked).toBe(true);
        fireEvent.click(requiredCheckbox);
        expect(requiredCheckbox.checked).toBe(false);
    });

    it("toggles emphasize checkbox", () => {
        render(<RdsCompIdentiyResourceBasic />);

        const emphasizeCheckbox = screen.getByTestId(
            "emphasize"
        ) as HTMLInputElement;
        fireEvent.click(emphasizeCheckbox);
        expect(emphasizeCheckbox.checked).toBe(true);
        fireEvent.click(emphasizeCheckbox);
        expect(emphasizeCheckbox.checked).toBe(false);
    });

    it("toggles show in discovery checkbox", () => {
        render(<RdsCompIdentiyResourceBasic />);

        const discoveryCheckbox = screen.getByTestId(
            "discovery-document"
        ) as HTMLInputElement;
        fireEvent.click(discoveryCheckbox);
        expect(discoveryCheckbox.checked).toBe(true);
        fireEvent.click(discoveryCheckbox);
        expect(discoveryCheckbox.checked).toBe(false);
    });
});
