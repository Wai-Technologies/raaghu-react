import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompApiScopeBasicResource, {
    RdsCompApiScopeBasicResourceProps,
} from "../src/rds-comp-api-scope-basic-resource/rds-comp-api-scope-basic-resource";

  
describe("RdsCompApiScopeBasicResource", () => {
    const defaultProps: RdsCompApiScopeBasicResourceProps = {
        scopeData: {
            id: "",
            name: "test@example.com",
            displayName: "John Doe",
            description: "Test message",
            resources: "",
        },
        onSuccess: jest.fn(),
        reset: false,
    };

    beforeEach(() => {
        render(<RdsCompApiScopeBasicResource {...defaultProps} />);
    });

    test("renders form elements", () => {
        expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Display Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("AbpOpenIddict.Description")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("AbpOpenIddict.Resources")).toBeInTheDocument();
        expect(screen.getByText("AbpUi.Cancel")).toBeInTheDocument();
        expect(screen.getByText("AbpUi.Save")).toBeInTheDocument();
    });

    test("fills form fields and submits", () => {
        const nameInput = screen.getByPlaceholderText("Enter Name") as HTMLInputElement;
        const displayNameInput = screen.getByPlaceholderText("Enter Display Name") as HTMLInputElement;
        const descInput = screen.getByPlaceholderText("AbpOpenIddict.Description") as HTMLInputElement;
        const resourcesInput = screen.getByPlaceholderText("AbpOpenIddict.Resources") as HTMLInputElement;
        const saveButton = screen.getByText("AbpUi.Save") as HTMLButtonElement;

        fireEvent.change(nameInput, { target: { value: "Updated Name" } });
        fireEvent.change(displayNameInput, { target: { value: "Updated Display Name" } });
        fireEvent.change(descInput, { target: { value: "Updated Description" } });
        fireEvent.change(resourcesInput, { target: { value: "Updated Resources" } });
        fireEvent.click(saveButton);

        expect(defaultProps.onSuccess).toHaveBeenCalledWith({
            id: "",
            name: "Updated Name",
            displayName: "Updated Display Name",
            description: "Updated Description",
            resources: "Updated Resources",
        });
    });

    test("initializes form fields with default values", () => {
        const nameInput = screen.getByPlaceholderText("Enter Name") as HTMLInputElement;
        const displayNameInput = screen.getByPlaceholderText("Enter Display Name") as HTMLInputElement;
        const descInput = screen.getByPlaceholderText("AbpOpenIddict.Description") as HTMLInputElement;
        const resourcesInput = screen.getByPlaceholderText("AbpOpenIddict.Resources") as HTMLInputElement;

        expect(nameInput.value).toBe("test@example.com");
        expect(displayNameInput.value).toBe("John Doe");
        // expect(descInput.value).toBe("Test message");
        expect(resourcesInput.value).toBe("");
    });

    test("enables the \"Save\" button when the form is valid", () => {
        const nameInput = screen.getByPlaceholderText("Enter Name") as HTMLInputElement;
        const saveButton = screen.getByText("AbpUi.Save") as HTMLButtonElement;

        fireEvent.change(nameInput, { target: { value: "Updated Name" } });
        expect(saveButton).toBeEnabled();
    });

    test("calls the onSuccess callback with correct data on form submission", () => {
        const saveButton = screen.getByText("AbpUi.Save") as HTMLButtonElement;
        fireEvent.click(saveButton);

        expect(defaultProps.onSuccess).toHaveBeenCalledWith({
            id: "",
            name: "test@example.com",
            displayName: "John Doe",
            description: "Test message",
            resources: "",
        });
    });
});

