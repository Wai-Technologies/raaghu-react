import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompPasswordSetting from "../src/rds-comp-password-setting/rds-comp-password-setting";

describe("RdsCompPasswordSetting", () => {
    test("renders all input fields correctly", () => {
        render(<RdsCompPasswordSetting />);
        expect(screen.getByText("Current password")).toBeInTheDocument();
        expect(screen.getByText("New password")).toBeInTheDocument();
        expect(screen.getByText("Confirm new password")).toBeInTheDocument();
    });

    test("displays error message when current password is invalid", () => {
        render(<RdsCompPasswordSetting />);
        fireEvent.change(screen.getByTestId("current-password"), {
            target: { value: "123" },
        });
        expect(screen.getByText("Current Password is invalid")).toBeInTheDocument();
    });

    test("displays error message when new password is invalid", () => {
        render(<RdsCompPasswordSetting />);
        fireEvent.change(screen.getByTestId("new-password"), {
            target: { value: "123" },
        });
        expect(screen.getByText("New passowrd is invalid")).toBeInTheDocument();
    });

    test("displays error message when passwords do not match", () => {
        render(<RdsCompPasswordSetting />);
        fireEvent.change(screen.getByTestId("new-password"), {
            target: { value: "password1" },
        });
        fireEvent.change(screen.getByTestId("confirm-password"), {
            target: { value: "password2" },
        });
        expect(screen.getByText("Password mismatch found")).toBeInTheDocument();
    });

    test("disables the save button when the form is invalid", () => {
        render(<RdsCompPasswordSetting />);
        expect(screen.getByTestId("save")).toBeDisabled();
        fireEvent.change(screen.getByTestId("current-password"), {
            target: { value: "validpassword" },
        });
        expect(screen.getByTestId("save")).toBeDisabled();
        fireEvent.change(screen.getByTestId("new-password"), {
            target: { value: "validpassword" },
        });
        expect(screen.getByTestId("save")).toBeDisabled();
        fireEvent.change(screen.getByTestId("confirm-password"), {
            target: { value: "validpassword" },
        });
        expect(screen.getByTestId("save")).toBeEnabled();
    });
});
