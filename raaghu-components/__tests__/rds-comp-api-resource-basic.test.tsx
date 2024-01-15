import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompApiResourceBasic, { RdsCompApiResourceBasicProps } from "../src/rds-comp-api-resource-basic/rds-comp-api-resource-basic";

describe("RdsCompApiResourceBasic", () => {
    const defaultProps: RdsCompApiResourceBasicProps = {
        email: "",
        fullname: "",
        message: "",
        accessTokenSigningAlgorithm: "",
        onSuccess: jest.fn(),
    };

    test("renders the form inputs", () => {
        render(<RdsCompApiResourceBasic {...defaultProps} />);

        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Display name")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Allowed access token signing algorithms")).toBeInTheDocument();
    });

    test("submits the form with valid data", () => {
        render(<RdsCompApiResourceBasic {...defaultProps} />);
        
        const nameInput = screen.getByTestId("name") as HTMLInputElement;
        const displayNameInput = screen.getByTestId("display-name") as HTMLInputElement;
        const descriptionInput = screen.getByPlaceholderText("Description") as HTMLTextAreaElement;
        const allowedAccessTokenInput = screen.getByTestId("allowed-access-token") as HTMLInputElement;
        const saveButton = screen.getByTestId("save") as HTMLButtonElement;
    
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(displayNameInput, { target: { value: "John" } });
    
        // Use fireEvent.input to trigger the change event for textarea
        fireEvent.input(descriptionInput, { target: { value: "Sample description" } });
    
        fireEvent.change(allowedAccessTokenInput, { target: { value: "algorithm1" } });
        fireEvent.click(saveButton);
    
        expect(defaultProps.onSuccess).toHaveBeenCalledWith({
            fullname: "John",
            email: "John Doe",
            message: "Sample description",
            accessTokenSigningAlgorithm: "",
            resource: "algorithm1",
        });
    });
    
    
});
