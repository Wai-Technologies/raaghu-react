import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompProfileEdit, {
    RdsCompProfileEditProps,
} from "../src/rds-comp-profile-edit/rds-comp-profile-edit";

describe("RdsCompProfileEdit", () => {
    const mockOnForgotPassword = jest.fn();

    const setup = (props: Partial<RdsCompProfileEditProps> = {}) => {
        const initialProps: RdsCompProfileEditProps = {
            onForgotPassword: mockOnForgotPassword,
            ...props,
        };

        render(<RdsCompProfileEdit {...initialProps} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component correctly", () => {
        setup();

        expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Email Address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Phone Nunber")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });


    it("should display an error message for empty username input when blurred", () => {
        setup();
        const usernameInput = screen.getByText("User Name");
        fireEvent.blur(usernameInput);
    });
});
