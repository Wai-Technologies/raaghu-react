import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompInvoice from "../src/rds-comp-invoice/rds-comp-invoice";

test("RdsCompInvoice renders correctly", () => {
    render(<RdsCompInvoice />);
});

test("RdsCompInvoice renders RdsInput correctly", () => {
    render(<RdsCompInvoice />);
    expect(screen.getByText("Legal name")).toBeInTheDocument();
    expect(screen.getByText("Invoice Information")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
});

test("RdsCompInvoice renders RdsTextArea correctly", () => {
    render(<RdsCompInvoice />);
    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
});
