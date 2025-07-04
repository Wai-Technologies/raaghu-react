import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompApplicationScopes from "./rds-comp-application-scopes";

// Mock the RdsCompCheckboxGroup component to avoid React hooks issues
jest.mock("../rds-elements", () => ({
    RdsCompCheckboxGroup: ({ itemList, onClick }: any) => (
        <div data-testid="checkbox-group">
            {itemList?.map((item: any) => (
                <div key={item.id} data-testid={`checkbox-item-${item.id}`}>
                    <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked || false}
                        onChange={onClick}
                        data-testid={`checkbox-${item.id}`}
                    />
                    <label htmlFor={item.id}>{item.label}</label>
                </div>
            ))}
        </div>
    )
}));

describe("RdsCompApplicationScopes Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should mount without crashing", () => {
        const { container } = render(<RdsCompApplicationScopes scopesList={[]} />);
        expect(container).toBeInTheDocument();
    });

    it("should render checkbox group with provided scopes", () => {
        const mockScopes = [
            { id: "1", label: "Scope 1", checked: false },
            { id: "2", label: "Scope 2", checked: true }
        ];
        
        render(<RdsCompApplicationScopes scopesList={mockScopes} />);
        
        // Check if the checkbox group is rendered
        expect(screen.getByTestId("checkbox-group")).toBeInTheDocument();
        
        // Check if checkboxes are rendered with correct states
        expect(screen.getByTestId("checkbox-1")).not.toBeChecked();
        expect(screen.getByTestId("checkbox-2")).toBeChecked();
        
        // Check if labels are rendered
        expect(screen.getByText("Scope 1")).toBeInTheDocument();
        expect(screen.getByText("Scope 2")).toBeInTheDocument();
    });    it("should render with empty scopes list", () => {
        render(<RdsCompApplicationScopes scopesList={[]} />);
        
        // Check if the checkbox group is still rendered even with empty list
        expect(screen.getByTestId("checkbox-group")).toBeInTheDocument();
        
        // Check that no checkboxes are rendered
        expect(screen.queryByTestId("checkbox-1")).not.toBeInTheDocument();
    });

    it("should not call editScopeList when it's not provided", () => {
        const mockScopes = [
            { id: "1", label: "Scope 1", checked: false }
        ];
        
        // This should not throw an error even without editScopeList prop
        render(<RdsCompApplicationScopes scopesList={mockScopes} />);
        
        const checkbox1 = screen.getByTestId("checkbox-1");
        
        // This should not throw an error
        expect(() => {
            fireEvent.change(checkbox1, { target: { checked: true, id: "1" } });
        }).not.toThrow();
    });

    it("should update internal state when checkbox is changed", () => {
        const mockScopes = [
            { id: "1", label: "Scope 1", checked: false },
            { id: "2", label: "Scope 2", checked: false }
        ];
        
        const { rerender } = render(<RdsCompApplicationScopes scopesList={mockScopes} />);
        
        // Initially both checkboxes should be unchecked
        expect(screen.getByTestId("checkbox-1")).not.toBeChecked();
        expect(screen.getByTestId("checkbox-2")).not.toBeChecked();
        
        // Change the first checkbox
        const checkbox1 = screen.getByTestId("checkbox-1");
        fireEvent.change(checkbox1, { target: { checked: true, id: "1" } });
        
        // The checkbox should now be checked (this tests internal state management)
        expect(checkbox1).toBeChecked();
        expect(screen.getByTestId("checkbox-2")).not.toBeChecked();
    });
});