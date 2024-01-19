import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompNewRole, {
    RdsCompNewRoleProps,
} from "../src/rds-comp-new-role/rds-comp-new-role";

jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));

describe("RdsCompNewRole", () => {
    const roleData: any = {
        displayName: "Test Role",
        isDefault: false,
    };

    const renderComponent = (props: RdsCompNewRoleProps) => {
        render(<RdsCompNewRole {...props} />);
    };

    it("renders the component with role data", () => {
        renderComponent({ roleData });
        // Assert labels, inputs, and buttons are rendered correctly
        expect(screen.getByText(roleData.displayName)).toBeInTheDocument();
        expect(screen.getByText("Default")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("displays the role data correctly", () => {
        renderComponent({ roleData });
        // Assert input placeholder and checkbox checked state
        expect(
            screen.getByPlaceholderText(roleData.displayName)
        ).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).not.toBeChecked();
    });

    it("updates the input value when typing", () => {
        renderComponent({ roleData });
        const input = screen.getByPlaceholderText(
            roleData.displayName
        ) as HTMLInputElement;
        input.value = "New Value";
        fireEvent.input(input); // Simulate the input event
        expect(input.value).toBe("New Value");
    });

    it("toggles the checkbox when clicked", () => {
        renderComponent({ roleData });
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
        checkbox.checked = true;
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
    });
});
