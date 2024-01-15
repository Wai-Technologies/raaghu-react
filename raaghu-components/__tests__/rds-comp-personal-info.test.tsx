import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompPersonalInfo from "../src/rds-comp-personal-info/rds-comp-personal-info";

describe("RdsCompPersonalInfo", () => {
    it("renders form inputs with initial values", () => {
        const personalInfo = {
            userName: "JohnDoe",
            name: "John",
            surname: "Doe",
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
        };

        render(<RdsCompPersonalInfo personalInfo={personalInfo} />);

        expect(screen.getByTestId("admin")).toHaveValue(personalInfo.userName);
        expect(screen.getByTestId("name")).toHaveValue(personalInfo.name);
        expect(screen.getByTestId("surname")).toHaveValue(personalInfo.surname);
        expect(screen.getByTestId("email")).toHaveValue(personalInfo.email);
        expect(screen.getByTestId("phone-number")).toHaveValue(
            personalInfo.phoneNumber
        );
    });

    it("calls handleVerifyEmailSubmit on Verify Email button click", () => {
        const mockHandleVerifyEmailSubmit = jest.fn();
        const personalInfo = {
            userName: "JohnDoe",
            name: "John",
            surname: "Doe",
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
        };
        render(
            <RdsCompPersonalInfo
                personalInfo={personalInfo}
                handleVerifyEmailSubmit={mockHandleVerifyEmailSubmit}
            />
        );

        fireEvent.click(screen.getByTestId("verify-email"));

        expect(mockHandleVerifyEmailSubmit).toHaveBeenCalledTimes(1);
    });

    it("calls handlePersonalDataSubmit on Save button click", () => {
        const personalInfo = {
            userName: "JohnDoe",
            name: "John",
            surname: "Doe",
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
        };
        const mockHandlePersonalDataSubmit = jest.fn();
        render(
            <RdsCompPersonalInfo
                personalInfo={personalInfo}
                handlePersonalDataSubmit={mockHandlePersonalDataSubmit}
            />
        );

        fireEvent.click(screen.getByTestId("save"));

        expect(mockHandlePersonalDataSubmit).toHaveBeenCalledTimes(1);
    });

    it("updates form input values on change", () => {
        const personalInfo = {
            userName: "JohnDoe",
            name: "John",
            surname: "Doe",
            email: "johndoe@example.com",
            phoneNumber: "1234567890",
        };

        render(<RdsCompPersonalInfo personalInfo={personalInfo} />);

        const newValues = {
            userName: "NewUser",
            name: "Jane",
            surname: "Smith",
            email: "janesmith@example.com",
            phoneNumber: "9876543210",
        };

        fireEvent.change(screen.getByTestId("admin"), {
            target: { value: newValues.userName },
        });
        fireEvent.change(screen.getByTestId("name"), {
            target: { value: newValues.name },
        });
        fireEvent.change(screen.getByTestId("surname"), {
            target: { value: newValues.surname },
        });
        fireEvent.change(screen.getByTestId("email"), {
            target: { value: newValues.email },
        });
        fireEvent.change(screen.getByTestId("phone-number"), {
            target: { value: newValues.phoneNumber },
        });

        expect(screen.getByTestId("admin")).toHaveValue(newValues.userName);
        expect(screen.getByTestId("name")).toHaveValue(newValues.name);
        expect(screen.getByTestId("surname")).toHaveValue(newValues.surname);
        expect(screen.getByTestId("email")).toHaveValue(newValues.email);
        expect(screen.getByTestId("phone-number")).toHaveValue(
            newValues.phoneNumber
        );
    });
});
