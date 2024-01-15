import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompIdentityManagement, {
    RdsCompIdentityManagementProps,
} from "../src/rds-comp-identity-management-new/rds-comp-identity-management-new";

describe("RdsCompIdentityManagement", () => {
    const mockProps: RdsCompIdentityManagementProps = {
        // handleIdentity: jest.fn(),
        lockoutSettings: {},
        passwordSettings: {},
        signSettings: {},
        userSettings: {},
        onIdentitySettingsSubmit: undefined
    };


    it("should render the component correctly", () => {
        render(<RdsCompIdentityManagement {...mockProps} />);
    });

    it("should update the passwordSettings state when the 'Required Length (Min)' input is changed", () => {
        render(<RdsCompIdentityManagement {...mockProps} />);
        const inputElement = screen.getByTestId("required-length") as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: "10" } });
        expect(inputElement.value).toBe("10");
    });

    it("should update the lockoutSettings state when the 'Lockout Duration (Seconds)' input is changed", () => {
        render(<RdsCompIdentityManagement {...mockProps} />);
        const inputElement = screen.getByTestId("lockout-duration") as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: "60" } });
        expect(inputElement.value).toBe("60");
    });

});
