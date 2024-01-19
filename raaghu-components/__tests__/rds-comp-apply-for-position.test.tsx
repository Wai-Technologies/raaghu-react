import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompApplyForPosition from "../src/rds-comp-apply-for-position/rds-comp-apply-for-position";


describe("RdsCompApplyForPosition", () => {
    it("should render the component", () => {
        render(<RdsCompApplyForPosition />);
        expect(screen.getByText("Email ID")).toBeInTheDocument();
        expect(screen.getByText("Full Name")).toBeInTheDocument();
        expect(screen.getByText("Contact Number")).toBeInTheDocument();
        expect(screen.getByText("Applying For Position:")).toBeInTheDocument();
        expect(screen.getByText("When Can You Start?")).toBeInTheDocument();
    });

    it("should update form fields correctly", () => {
        render(<RdsCompApplyForPosition />);
        const emailInput = screen.getByPlaceholderText("name@domain.com") as HTMLInputElement;
        const fullNameInput = screen.getByPlaceholderText("Full Name") as HTMLInputElement;
        const contactNumberInput = screen.getByPlaceholderText("+91 9087654321") as HTMLInputElement;
        const positionInput = screen.getByPlaceholderText("Position Name") as HTMLInputElement;
        const periodInput = screen.getByPlaceholderText("Notice Period") as HTMLInputElement;
        const coverLetterInput = screen.getByPlaceholderText("Cover Letter..") as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(fullNameInput, { target: { value: "Test User" } });
        fireEvent.change(contactNumberInput, { target: { value: "9876543210" } });
        fireEvent.change(positionInput, { target: { value: "Software Engineer" } });
        fireEvent.change(periodInput, { target: { value: "1 month" } });
        fireEvent.change(coverLetterInput, { target: { value: "This is my cover letter." } });

        expect(emailInput.value).toBe("test@example.com");
        expect(fullNameInput.value).toBe("Test User");
        expect(contactNumberInput.value).toBe("9876543210");
        expect(positionInput.value).toBe("Software Engineer");
        expect(periodInput.value).toBe("1 month");
        expect(coverLetterInput.value).toBe("This is my cover letter.");
    });

});
