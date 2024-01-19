import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompScopeBasicResource, {
    RdsCompScopeBasicResourceProps,
} from "../src/rds-comp-scope-basic-resource/rds-comp-scope-basic-resource";

describe("RdsCompScopeBasicResource", () => {
    const mockSaveApiScopeData = jest.fn();

    const defaultProps: RdsCompScopeBasicResourceProps = {
        apiScopeData: {
            name: "Test Name",
            description: "Test Description",
            enabled: true,
            required: false,
            emphasize: true,
            showInDiscoveryDocument: false,
        },
        saveApiScopeData: mockSaveApiScopeData,
    };

    beforeEach(() => {
        render(<RdsCompScopeBasicResource {...defaultProps} />);
    });

    test("renders form inputs with initial values", () => {
        expect(screen.getByTestId("name")).toHaveValue(
            defaultProps.apiScopeData.name
        );
        expect(screen.getByTestId("description")).toHaveValue(
            defaultProps.apiScopeData.description
        );
        expect(screen.getByTestId("enabled")).toBeChecked();
        expect(screen.getByTestId("required")).not.toBeChecked();
        expect(screen.getByTestId("emphasize")).toBeChecked();
        expect(screen.getByTestId("show-discovery-documents")).not.toBeChecked();
    });

    test("updates form inputs and calls saveApiScopeData", () => {
        const newName = "New Name";
        const newDescription = "New Description";

        fireEvent.change(screen.getByTestId("name"), {
            target: { value: newName },
        });
        fireEvent.change(screen.getByTestId("description"), {
            target: { value: newDescription },
        });
        fireEvent.click(screen.getByTestId("enabled"));
        fireEvent.click(screen.getByTestId("required"));
        fireEvent.click(screen.getByTestId("emphasize"));
        fireEvent.click(screen.getByTestId("show-discovery-documents"));

        expect(screen.getByTestId("name")).toHaveValue(newName);
        expect(screen.getByTestId("description")).toHaveValue(newDescription);
        expect(screen.getByTestId("enabled")).not.toBeChecked();
        expect(screen.getByTestId("required")).toBeChecked();
        expect(screen.getByTestId("emphasize")).not.toBeChecked();
        expect(screen.getByTestId("show-discovery-documents")).toBeChecked();

        fireEvent.click(screen.getByTestId("save"));

        expect(mockSaveApiScopeData).toHaveBeenCalledWith({
            name: newName,
            description: newDescription,
            enabled: false,
            required: true,
            emphasize: false,
            showInDiscoveryDocument: true,
        });
    });

    test("calls handleName when name input changes", () => {
        const newName = "New Name";
        fireEvent.change(screen.getByTestId("name"), {
            target: { value: newName },
        });
        expect(screen.getByTestId("name")).toHaveValue(newName);
    });
});
