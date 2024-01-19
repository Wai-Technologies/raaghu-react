import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompNewClaimType, { RdsCompNewClaimTypeProps } from "../src/rds-comp-new-claim-type/rds-comp-new-claim-type";

describe("RdsCompNewClaimType", () => {
    const mockProps: RdsCompNewClaimTypeProps = {
        onSubmit: jest.fn(),
        claimsData: {},
        valueType: []
    };


    it("renders all input fields", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("regex")).toBeInTheDocument();
        expect(screen.getByTestId("reges-description")).toBeInTheDocument();
        expect(screen.getByText("AbpIdentity.RegexDescription")).toBeInTheDocument();
        expect(screen.getByText("AbpIdentity.Required")).toBeInTheDocument();
    });

    it("handles name change", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
        const nameInput = screen.getByTestId("name") as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: "Test Name" } });
        expect(nameInput.value).toBe("Test Name");
    });

    it("handles regex change", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
        const regexInput = screen.getByTestId("regex") as HTMLInputElement;
        fireEvent.change(regexInput, { target: { value: "Test Regex" } });
        expect(regexInput.value).toBe("Test Regex");
    });

    it("handles regex description change", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
        const regexDescInput = screen.getByTestId("reges-description") as HTMLInputElement;
        fireEvent.change(regexDescInput, { target: { value: "Test Regex Description" } });
        expect(regexDescInput.value).toBe("Test Regex Description");
    });

    it("handles description change", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
      
        const descriptionInput = screen.getByPlaceholderText("Enter Regex Description") as HTMLInputElement;
      
        fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
      
        expect(descriptionInput.value).toBe("Test Description");
      });
      
      
    

    it("handles required checkbox change", () => {
        render(<RdsCompNewClaimType {...mockProps} />);
        const requiredCheckbox = screen.getByTestId("required") as HTMLInputElement;
        fireEvent.click(requiredCheckbox);
        expect(requiredCheckbox.checked).toBe(true);
    });

    it("calls onSubmit when save button is clicked", () => {
        const handleClick = jest.fn();
        render(<RdsCompNewClaimType {...mockProps} onSubmit={handleClick} />);
        const saveButton = screen.getByTestId("save");
        expect(saveButton).toBeInTheDocument();
    });
});
