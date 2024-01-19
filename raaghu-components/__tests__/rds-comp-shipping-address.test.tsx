import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompShippingAddress from "../src/rds-comp-shipping-address/rds-comp-shipping-address";

test("renders the first name input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
});

test("renders the last name input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Last Name")).toBeInTheDocument();
});

test("renders the company input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Company")).toBeInTheDocument();
});

test("renders the phone input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Phone")).toBeInTheDocument();
});

test("renders the address input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Address")).toBeInTheDocument();
});

test("renders the city input field", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("City")).toBeInTheDocument();
});

test("Checking Postal Code and State/Province", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Postal Code")).toBeInTheDocument();
    expect(screen.getByText("State/Province")).toBeInTheDocument();
    
});

test("To verify the Address", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Address")).toBeInTheDocument();
    
});


test("renders the BACK button", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Back")).toBeInTheDocument();
});

test("renders the SAVE button", () => {
    render(<RdsCompShippingAddress countryList={[]} />);
    expect(screen.getByText("Save")).toBeInTheDocument();
});


