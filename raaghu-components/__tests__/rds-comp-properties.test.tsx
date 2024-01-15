import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompProperties, {
    RdsCompPropertiesProp,
} from "../src/rds-comp-properties/rds-comp-properties";

describe("RdsCompProperties", () => {
    const tableHeaders = [
        {
            displayName: "Edition Name",
            key: "editionName",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: "Price ($)",
            key: "price",
            datatype: "number",
            dataLength: 5,
            required: false,
            sortable: true,
        },
        {
            displayName: "Trial Period(Day(s))",
            key: "trialPeriod",
            datatype: "number",
            dataLength: 5,
            required: true,
        },
    ];

    const tableData = [
        { id: 1, editionName: "Standard", price: 60, trialPeriod: 1 },
        { id: 2, editionName: "Basic", price: 120, trialPeriod: 23 },
        { id: 3, editionName: "Premium", price: 250, trialPeriod: 3 },
        { id: 4, editionName: "Standard", price: 60, trialPeriod: 4 },
        { id: 5, editionName: "Basic", price: 100, trialPeriod: 5 },
        { id: 6, editionName: "Standard", price: 60, trialPeriod: 6 },
        { id: 7, editionName: "Premium", price: 100, trialPeriod: 7 },
        { id: 8, editionName: "Standard", price: 100, trialPeriod: 8 },
        { id: 9, editionName: "Standard", price: 100, trialPeriod: 9 },
    ];

    const mockData: RdsCompPropertiesProp = {
        propertyData: tableData,
        propertyHeaders: tableHeaders,
        onActionSelection: jest.fn(),
    };

    it("renders data table in the properties component:", () => {
        render(<RdsCompProperties {...mockData} />);

        expect(screen.getByText(/Edition Name/)).toBeInTheDocument();
        expect(screen.getByText(/Price \(\$\)/)).toBeInTheDocument();
        expect(screen.getByText(/Trial Period\(Day\(s\)\)/)).toBeInTheDocument();
        expect(screen.getByText("120")).toBeInTheDocument();
        expect(screen.getByText("250")).toBeInTheDocument();
        expect(screen.getByText("23")).toBeInTheDocument();
        const standardEditionName = screen.getAllByText("Standard");
        standardEditionName.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const basicEditionName = screen.getAllByText("Basic");
        basicEditionName.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const premiumEditionName = screen.getAllByText("Premium");
        premiumEditionName.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const priceToBe100 = screen.getAllByText("100");
        priceToBe100.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const priceToBe60 = screen.getAllByText("60");
        priceToBe60.forEach((item) => {
            expect(item).toBeInTheDocument();
        });

        const iconElement = screen.getAllByRole("img");
        iconElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    it("renders form elements", () => {
        render(<RdsCompProperties {...mockData} />);
        expect(screen.getByTestId("key")).toBeInTheDocument();
        expect(screen.getByTestId("value")).toBeInTheDocument();
        expect(screen.getByTestId("add")).toBeInTheDocument();
        expect(screen.getByTestId("cancel")).toBeInTheDocument();
        expect(screen.getByTestId("save")).toBeInTheDocument();
    });

    it("updates key state on input change", () => {
        render(<RdsCompProperties {...mockData} />);
        const keyInput = screen.getByTestId("key");
        fireEvent.change(keyInput, { target: { value: "testKey" } });
        expect(keyInput).toHaveValue("testKey");
    });

    it("updates value state on input change", () => {
        render(<RdsCompProperties {...mockData} />);
        const valueInput = screen.getByTestId("value");
        fireEvent.change(valueInput, { target: { value: "testValue" } });
        expect(valueInput).toHaveValue("testValue");
    });

    it("submits the form and clears key and value state", () => {
        render(<RdsCompProperties {...mockData} />);
        const keyInput = screen.getByTestId("key");
        const valueInput = screen.getByTestId("value");
        const addButton = screen.getByTestId("add");
        fireEvent.change(keyInput, { target: { value: "testKey" } });
        fireEvent.change(valueInput, { target: { value: "testValue" } });
        fireEvent.click(addButton);
        expect(keyInput).toHaveValue("");
        expect(valueInput).toHaveValue("");
    });
});




describe("RdsCompProperties", () => {
    test("renders component", () => {
        render(<RdsCompProperties propertyData={[]} propertyHeaders={[]} onActionSelection={() => {}} />);
    // Add your assertions here
    });


});


