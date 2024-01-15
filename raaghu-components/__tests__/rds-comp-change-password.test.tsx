import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompChangePassword from "../src/rds-comp-change-password/rds-comp-change-password";

describe("RdsCompChangePassword", () => {
    it("handles form submission correctly", () => {
        const changePasswordData = {
            currentPassword: "oldPassword",
            newPassword: "newPassword",
            newPasswordConfirm: "newPassword",
        };

        const handlePasswordDataSubmit = jest.fn();

        render(
            <RdsCompChangePassword
                changePasswordData={changePasswordData}
                handlePasswordDataSubmit={handlePasswordDataSubmit}
            />
        );

        const currentPasswordInput = screen.getByTestId("curr-password");
        const newPasswordInput = screen.getAllByPlaceholderText("AbpAccount.DisplayName:NewPassword")[0] as HTMLInputElement;
const confirmPasswordInput = screen.getAllByPlaceholderText("AbpAccount.DisplayName:NewPasswordConfirm")[0] as HTMLInputElement;
        const saveButton = screen.getByTestId("save");

        fireEvent.change(currentPasswordInput, {
            target: { value: "newPassword" },
        });
        fireEvent.change(newPasswordInput, { target: { value: "newPassword2" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "newPassword2" },
        });

        fireEvent.click(saveButton);

        expect(handlePasswordDataSubmit).toHaveBeenCalledWith({
            currentPassword: "newPassword",
            newPassword: "newPassword2",
            newPasswordConfirm: "newPassword2",
        });
    });
  
    it("renders input fields with initial values", () => {
        const changePasswordData = {
            currentPassword: "oldPassword",
            newPassword: "newPassword",
            newPasswordConfirm: "newPassword",
        };

        render(<RdsCompChangePassword changePasswordData={changePasswordData} />);

        const currentPasswordInput = screen.getByTestId(
            "curr-password"
        ) as HTMLInputElement;
        const newPasswordInput = screen.getAllByText("AbpAccount.DisplayName:NewPassword")[0] as HTMLInputElement;
        const confirmPasswordInput =screen.getAllByPlaceholderText("AbpAccount.DisplayName:NewPasswordConfirm")[0] as HTMLInputElement;

        expect(currentPasswordInput.value).toBe("oldPassword");
        expect(newPasswordInput.value).toBe(undefined);
        expect(confirmPasswordInput.value).toBe("newPassword");
    });

    it("updates input values on user input", () => {
        render(<RdsCompChangePassword changePasswordData={{}} />);
    
        const currentPasswordInput = screen.getByPlaceholderText(
            "AbpAccount.DisplayName:CurrentPassword"
        ) as HTMLInputElement;
        const newPasswordInput = screen.getByPlaceholderText(
            "AbpAccount.DisplayName:NewPassword"
        ) as HTMLInputElement;
        const confirmPasswordInputs = screen.getAllByPlaceholderText(
            "AbpAccount.DisplayName:NewPasswordConfirm"
        ) as HTMLInputElement[];
    
        // Select the appropriate confirmPasswordInput
        const confirmPasswordInput = confirmPasswordInputs.find(
            (input) => input.getAttribute("data-testid") === "confirm-password"
        );
    
        fireEvent.change(currentPasswordInput, {
            target: { value: "newPassword" },
        });
    
        fireEvent.change(newPasswordInput, { target: { value: "newPassword2" } });
    
        if (confirmPasswordInput) {
            fireEvent.change(confirmPasswordInput, {
                target: { value: "newPassword2" },
            });
    
            expect(confirmPasswordInput.value).toBe("newPassword2");
        } else {
            fail("confirmPasswordInput not found");
        }
    
        expect(currentPasswordInput.value).toBe("newPassword");
        expect(newPasswordInput.value).toBe("newPassword2");
    });
    
    
});

