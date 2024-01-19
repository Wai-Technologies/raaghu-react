import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompSecrets from "../src/rds-comp-secrets/rds-comp-secrets";
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompSecrets", () => {
    it("renders input fields and buttons", () => {
        render(<RdsCompSecrets />);

        // Input fields
        const typeInput = screen.getByText("Type");
        const valueInput = screen.getByText("Value");
        const expirationInput = screen.getByText("Expiration");
        const descriptionInput = screen.getByText("Description");

        expect(typeInput).toBeInTheDocument();
        expect(valueInput).toBeInTheDocument();
        expect(expirationInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();

        // Buttons
        const addButton = screen.getByTestId("add");
        const cancelButton = screen.getByTestId("cancel");
        const createButton = screen.getByTestId("create");

        expect(addButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(createButton).toBeInTheDocument();
    });

    it("calls the cancel function when cancel button is clicked", () => {
        render(<RdsCompSecrets/>);
        const cancelButton = screen.getByTestId("cancel");
        fireEvent.click(cancelButton);
    });

    it("calls the create function when create button is clicked", () => {
        render(<RdsCompSecrets/>);
        const createButton = screen.getByTestId("create");
        fireEvent.click(createButton);
    });
});
