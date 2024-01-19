import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompEditionList, { RdsCompEditionListProps } from "../src/rds-comp-tenant-list/rds-comp-tenant-list";

jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompEditionList", () => {
    const tableHeaders = [
        {
            displayName: "Name",
            key: "name",
            datatype: "string",
        },
    // Add other table header objects as needed
    ];

    const actions = [
        {
            displayName: "Edit",
            id: "edit",
        },
    // Add other action objects as needed
    ];

    const tableData = [
        {
            name: "John Doe",
        },
    // Add other data objects as needed
    ];

    const onActionSelection = jest.fn();
    const onNewTenantClick = jest.fn();

    const props: RdsCompEditionListProps = {
        enablecheckboxselection: true,
        tableHeaders,
        actions,
        tableData,
        pagination: true,
        recordsPerPage: 10,
        recordsPerPageSelectListOption: true,
        onActionSelection,
        onNewTenantClick,
    };

    test("renders RdsCompEditionList component", () => {
        render(<RdsCompEditionList {...props} />);
    // Add your assertions here to verify the rendered component
    });


    test("Verifying Name and Edit", () => {
        render(<RdsCompEditionList {...props} />);
   
        expect(screen.getByText("Name")).toBeInTheDocument();
    });
});
