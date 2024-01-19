import React from "react";
import { render, screen } from "@testing-library/react";
import RdsCompUserPermission, { RdsCompUserPermissionProps } from "../src/rds-comp-user-permission/rds-comp-user-permission";
import "@testing-library/jest-dom";
const mockTableHeaders = [
    // Mock table headers data
    { displayName: "Display Name", key: "display_name", datatype: "string" }
];

const mockTableData = [
    // Mock table data
    { id: 1, name: "John Doe", email: "johndoe@example.com" }
];

const mockActions = [
    // Mock actions data
    { displayName: "Edit", id: "edit" }
];

const mockOnActionSelection = jest.fn();

const setup = (props: Partial<RdsCompUserPermissionProps> = {}) => {
    const defaultProps: RdsCompUserPermissionProps = {
        tableHeaders: [],
        tableData: [],
        actions: [],
        pagination: false,
        onActionSelection: mockOnActionSelection,
        ...props,
    };

    render(<RdsCompUserPermission {...defaultProps} />);
};

describe("RdsCompUserPermission", () => {
    test("renders 'New User' button", () => {
        setup();
        const newUserButton = screen.getByText("New User");
        expect(newUserButton).toBeInTheDocument();
        // Add more assertions if necessary
    });

    /* test("renders RdsCompDatatable component", () => {
        setup({
            tableHeaders: mockTableHeaders,
            tableData: mockTableData,
            actions: mockActions,
        });
        const datatableComponent = screen.getByTestId("rds-comp-datatable");
        expect(datatableComponent).toBeInTheDocument();
        // Add more assertions if necessary
    }); */

    // Add more test cases as needed
});
