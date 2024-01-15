import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import RdsCompBillingAddress, {
    RdsCompBillingAddressProps
} from "../src/rds-comp-billing-address/rds-comp-billing-address";

describe("RdsCompBillingAddress", () => {
    const mockCountryList = [
        { option: "Country 1", value: "1" },
        { option: "Country 2", value: "2" },
      ];
      
      const mockIndianStateList = [
        { option: "State 1", value: "3" },
        { option: "State 2", value: "4" },
      ];

    const mockProps: RdsCompBillingAddressProps = {
        countryList: mockCountryList,
        IndianStateList: mockIndianStateList,
        BillingAddressDetails: jest.fn(),
    };

    beforeEach(() => {
        render(<RdsCompBillingAddress {...mockProps} />);
    });

    it("renders all input fields", () => {
        expect(screen.getByText("First Name")).toBeInTheDocument();
        expect(screen.getByText("Last Name")).toBeInTheDocument();
        expect(screen.getByText("Company")).toBeInTheDocument();
        expect(screen.getByText("Phone")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("City")).toBeInTheDocument();
        expect(screen.getByText("Country")).toBeInTheDocument();
        expect(screen.getByText("State/Province")).toBeInTheDocument();
        expect(screen.getByText("Postal Code")).toBeInTheDocument();
        expect(screen.getByText("Back")).toBeInTheDocument();
        expect(screen.getByText("Continue")).toBeInTheDocument();
    });

    it("should call onbackHandler when the \"Back\" button is clicked", () => {
        const backButton = screen.getByText("Back");
        fireEvent.click(backButton);
        const fNameInput = screen.getAllByTestId("f-name");
        const lNameInput = screen.getAllByTestId("last-name");
        const companyInput = screen.getAllByTestId("company");
        const phoneInput = screen.getAllByTestId("phone");
        const addressInput = screen.getAllByTestId("address");
        const cityInput = screen.getAllByTestId("city");

        fNameInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        lNameInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        companyInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        phoneInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        addressInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        cityInput.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByTestId("back")).toBeInTheDocument();
        expect(screen.getByTestId("continue")).toBeInTheDocument();
    });

    it("checks for first name input", () => {
        render(<RdsCompBillingAddress {...mockProps} />);
        const firstNameInput = screen.getAllByPlaceholderText("Enter First Name")[0] as HTMLInputElement;
        fireEvent.change(firstNameInput, { target: { value: "John" } });
        expect(firstNameInput.value).toBe("John");

        const lastNameInput = screen.getAllByTestId("last-name")[0] as HTMLInputElement;
        fireEvent.change(lastNameInput, { target: { value: "Doe" } });
        expect(lastNameInput.value).toBe("Doe");

        const companyInput = screen.getAllByTestId("company")[0] as HTMLInputElement;
        fireEvent.change(companyInput, { target: { value: "Wai" } });
        expect(companyInput.value).toBe("Wai");

        const phoneInput = screen.getAllByTestId("phone")[0] as HTMLInputElement;
        fireEvent.change(phoneInput, { target: { value: "9999999999" } });
        expect(phoneInput.value).toBe("9999999999");
    
        const addressInput = screen.getAllByTestId("address")[0] as HTMLInputElement;
        fireEvent.change(addressInput, { target: { value: "Maharashtra" } });
        expect(addressInput.value).toBe("Maharashtra");

        const cityInput = screen.getAllByTestId("city")[0] as HTMLInputElement;
        fireEvent.change(cityInput, { target: { value: "Pune" } });
        expect(cityInput.value).toBe("Pune");

        const pinInput = screen.getAllByTestId("postal-code")[0] as HTMLInputElement;
        fireEvent.change(pinInput, { target: { value: "411030" } });
        expect(pinInput.value).toBe("411030");
    });
});
