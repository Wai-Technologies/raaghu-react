import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RdsCompUserBasics from "../src/rds-comp-user-basics/rds-comp-user-basics";

describe("RdsCompUserBasics", () => {
    const mockUserData = {
        name: "John",
        surname: "Doe",
        email: "john@example.com",
        password: "password",
        userName: "johndoe",
        phoneNumber: "1234567890",
        twoFactorEnabled: true,
        isActive: true,
        lockoutEnabled: true,
    };

    const mockCreateUser = jest.fn();

    it("updates isActive and lockoutEnabled when corresponding checkboxes change", () => {
        const { getByLabelText } = render(
            <RdsCompUserBasics userData={mockUserData} createUser={mockCreateUser} />
        );

        // Toggle the "Active" checkbox
        fireEvent.click(getByLabelText("Active"));

        // Toggle the "Account Lockout" checkbox
        fireEvent.click(getByLabelText("Account Lockout"));

        // Check the values after toggling
        expect(mockCreateUser).toHaveBeenCalledTimes(2);

        // Check the first call
        expect(mockCreateUser).toHaveBeenNthCalledWith(1, {
            ...mockUserData,
            isActive: false,
            lockoutEnabled: true,
        });
        
        // Check the second call
        expect(mockCreateUser).toHaveBeenNthCalledWith(2, {
            ...mockUserData,
            isActive: false,
            lockoutEnabled: false,
        });
    });
});
