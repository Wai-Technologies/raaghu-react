import React from "react";
import "@testing-library/jest-dom";
import { screen, render, fireEvent } from "@testing-library/react";
import RdsCompBlogPost from "../src/rds-comp-blog-post/rds-comp-blog-post";
jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));

  jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );
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
            <RdsCompBlogPost
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
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

    it("Check for pagination presence in data table with pagination", () => {
        render(
            <RdsCompBlogPost
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
            />
        );
    });

    it("Check action button in data table with pagination", () => {
        render(
            <RdsCompBlogPost
                tableHeaders={tableHeaders}
                tableData={tableData}
                pagination={true}
                actions={actions}
                recordsPerPage={5}
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
