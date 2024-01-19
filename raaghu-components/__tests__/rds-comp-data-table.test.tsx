import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import RdsCompDatatable from "../src/rds-comp-data-table/rds-comp-data-table";
jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
describe("RdsCompDataTable", () => {
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
    const actions = [
        { id: "delete", displayName: "Delete" },
        { id: "edit", displayName: "Edit" },
    ];

    it("renders data table correctly", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        expect(screen.getByText(/Edition Name/)).toBeInTheDocument();
        expect(screen.getByText(/Price \(\$\)/)).toBeInTheDocument();
        expect(screen.getByText(/Trial Period\(Day\(s\)\)/)).toBeInTheDocument();
        expect(screen.getByText(/Actions/)).toBeInTheDocument();
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
        iconElement.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });

    it("renders checkbox in data table with pagination correctly", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        const checkboxElement = screen.getAllByRole("checkbox");
        checkboxElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });

    it("checkboxes are initially unchecked", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        const checkboxes = screen.getAllByRole("checkbox");
        checkboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });

    it("handle checkbox change correctly", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        const checkbox = screen.getAllByRole("checkbox")[1] as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBeTruthy();
    });

    it("Check all the checkbox when the top checkbox is checked", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        const checkboxes = screen.getAllByRole("checkbox");
        const checkbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
        fireEvent.click(checkbox);
        checkboxes.forEach((item) => {
            const checkboxElement = item as HTMLInputElement;
            expect(checkboxElement.checked).toBeTruthy();
        });
    });

    it("Check for pagination presence in data table with pagination", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
    });

    it("Check action button in data table with pagination", () => {
        render(
            <RdsCompDatatable
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
                recordsPerPageSelectListOption={true}
                enablecheckboxselection={true}
            />
        );
        const actionBtnElement = screen.getAllByTestId("action-btn");
        actionBtnElement.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const actionBtn = screen.getAllByTestId("action-btn")[0];
        fireEvent.click(actionBtn);
        const deleteBtn = screen.getAllByText("Delete");
        deleteBtn.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        const editBtn = screen.getAllByText("Edit");
        editBtn.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });
});
