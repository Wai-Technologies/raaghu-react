import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import RdsCompPages from "../src/rds-comp-pages/rds-comp-pages";


jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
  jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe("RdsCompPages", () => {
    const tableHeaders = [
        {
            displayName: "Header 1",
            key: "header1",
            datatype: "string",
        },
    // Add more table headers if needed
    ];

    const actions = [
        {
            displayName: "Action 1",
            id: "action1",
        },
    // Add more actions if needed
    ];

    const tableData = [
        {
            header1: "Data 1",
            // Add more data properties if needed
        },
    // Add more data objects if needed
    ];

    it("renders without error", () => {
        render(
            <RdsCompPages
                tableHeaders={tableHeaders}
                actions={actions}
                tableData={tableData}
                pagination={true}
                recordsPerPage={10}
                onActionSelection={() => {}}
            />
        );
    });

    // Add more test cases if needed
});
