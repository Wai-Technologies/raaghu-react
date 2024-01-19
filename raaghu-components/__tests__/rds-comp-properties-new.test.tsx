import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompPropertiesNew from "../src/rds-comp-properties-new/rds-comp-properties-new";

describe("RdsCompPropertiesNew", () => {
    test("renders the component", () => {
        render(<RdsCompPropertiesNew />);
        expect(screen.getByTestId("add")).toBeInTheDocument();
        expect(screen.getByTestId("cancel")).toBeInTheDocument();
        expect(screen.getByTestId("submit")).toBeInTheDocument();
    });

    test("handles form submission", () => {
        render(<RdsCompPropertiesNew />);

        console.log = jest.fn();
        fireEvent.change(screen.getByTestId("key"), { target: { value: "testKey" } });
        fireEvent.change(screen.getByTestId("value"), { target: { value: "testValue" } });
        fireEvent.click(screen.getByTestId("add"));
        fireEvent.click(screen.getByTestId("submit"));
    });

    test("handles item deletion", () => {
        render(<RdsCompPropertiesNew />);

        console.log = jest.fn();
        fireEvent.change(screen.getByTestId("key"), { target: { value: "testKey" } });
        fireEvent.change(screen.getByTestId("value"), { target: { value: "testValue" } });
        fireEvent.click(screen.getByTestId("add"));
        fireEvent.click(screen.getByTestId("delete"));
        expect(screen.queryByText("testKey")).not.toBeInTheDocument();
        expect(screen.queryByText("testValue")).not.toBeInTheDocument();
    });
});
