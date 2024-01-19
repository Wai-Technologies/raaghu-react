import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompInformation, { RdsCompInformationProps } from "../src/rds-comp-information/rds-comp-information";

describe("RdsCompInformation", () => {
    const inputTypeList = ["Option 1", "Option 2"];
    const informationItemInitial = {
        propertyName: "Initial Property",
        displayName: "Initial Display",
        inputValue: "Initial Input",
    };

    const mockOnPropertyChange = jest.fn();
    const mockOnDisplayChange = jest.fn();
    const mockOnInputTypeChange = jest.fn();
    const mockInformationItem = jest.fn();

    const defaultProps: RdsCompInformationProps = {
        inputTypeList,
        informationItemInitial,
        onPropertyChange: mockOnPropertyChange,
        onDisplayChange: mockOnDisplayChange,
        onInputTypeChange: mockOnInputTypeChange,
        informationItem: mockInformationItem,
    };

    it("renders the component with initial values", () => {
        render(<RdsCompInformation {...defaultProps} />);

        expect(screen.getByText("Property Name")).toBeInTheDocument();
        expect(screen.getByText("Display Name")).toBeInTheDocument();
        expect(screen.getByText("Input Type")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Property Name")).toHaveValue(informationItemInitial.propertyName);
        expect(screen.getByPlaceholderText("Display Name")).toHaveValue(informationItemInitial.displayName);
        expect(screen.getByText("Input Type")).toBeInTheDocument();
    });

    it("calls onPropertyChange when Property Name input changes", () => {
        render(<RdsCompInformation {...defaultProps} />);

        const propertyNameInput = screen.getByTestId("property-name");
        const newPropertyName = "New Property";

        fireEvent.change(propertyNameInput, { target: { value: newPropertyName } });

        expect(mockOnPropertyChange).toHaveBeenCalledTimes(1);
        expect(mockOnPropertyChange).toHaveBeenCalledWith(expect.any(Object)); // You can assert the event object here if needed
        expect(propertyNameInput).toHaveValue(newPropertyName);
    });

    it("calls onDisplayChange when Display Name input changes", () => {
        render(<RdsCompInformation {...defaultProps} />);

        const displayNameInput = screen.getByTestId("display-name");
        const newDisplayName = "New Display";

        fireEvent.change(displayNameInput, { target: { value: newDisplayName } });

        expect(mockOnDisplayChange).toHaveBeenCalledTimes(1);
        expect(mockOnDisplayChange).toHaveBeenCalledWith(expect.any(Object)); // You can assert the event object here if needed
        expect(displayNameInput).toHaveValue(newDisplayName);
    });
});
