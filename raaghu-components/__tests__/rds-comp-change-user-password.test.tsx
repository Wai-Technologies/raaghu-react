import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompChangePassword from "../src/rds-comp-change-password/rds-comp-change-password";

describe("RdsCompChangePassword", () => {
    const changePasswordData = {
        currentPassword: "currentPassword",
        newPassword: "newPassword",
        newPasswordConfirm: "newPasswordConfirm",
    };

    it("should render the component", () => {
        const { getByLabelText, getByText } = render(
            <RdsCompChangePassword changePasswordData={changePasswordData} />
        );
    });
});


describe("RdsCompChangePassword", () => {
    const changePasswordData = {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    };

    it("should handle form submission", () => {
        const handlePasswordDataSubmit = jest.fn();
        render(
            <RdsCompChangePassword
                changePasswordData={changePasswordData}
                handlePasswordDataSubmit={handlePasswordDataSubmit}
            />
        );
    
        // Simulate form submission
        const saveButton = screen.getByText("AbpUi.Save");
        fireEvent.click(saveButton);
    
        // Assert that the submit function is called with the correct form data
        expect(handlePasswordDataSubmit).toHaveBeenCalledWith(changePasswordData);
    });

  
});


describe("RdsCompChangePassword", () => {
    const changePasswordDataMock = {
        currentPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
    };

    it("should call handlePasswordDataSubmit when the Save button is clicked", () => {
        const handlePasswordDataSubmitMock = jest.fn();
        const { getByText } = render(
            <RdsCompChangePassword
                changePasswordData={changePasswordDataMock}
                handlePasswordDataSubmit={handlePasswordDataSubmitMock}
            />
        );

        // Find Save button
        const saveButton = getByText("AbpUi.Save");

        // Click the Save button
        fireEvent.click(saveButton);

        // Assert handlePasswordDataSubmit is called
        expect(handlePasswordDataSubmitMock).toHaveBeenCalled();
    });

 
});
