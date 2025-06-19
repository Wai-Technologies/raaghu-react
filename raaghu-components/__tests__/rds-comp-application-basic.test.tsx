import React from 'react';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompApplicationBasic from "../src/rds-comp-application-basic/rds-comp-application-basic";
import { act } from "react-dom/test-utils";

// Mock RdsInput and RdsButton components
jest.mock("../src/rds-elements", () => ({
    RdsInput: ({ value, onChange, placeholder, name, label, dataTestId }: any) => (
        <input
            data-testid={dataTestId || name === "Client Uri" || name === "Logo Uri" ? 
                "site-key-url" : `input-${name?.toLowerCase().replace(/\s/g, '-')}`}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            name={name}
            aria-label={name}
        />
    ),
    RdsButton: ({ label, onClick, dataTestId, type, isDisabled }: any) => (
        <button
            data-testid={dataTestId}
            onClick={onClick}
            type={type}
            disabled={isDisabled}
        >
            {label}
        </button>
    ),
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

describe("RdsCompApplicationBasic", () => {
    const mockBasicData = {
        clientId: "test-client",
        displayName: "Test Display",
        clientUri: "https://example.com",
        logoUri: "https://example.com/logo.png"
    };

    const mockOnSuccess = jest.fn();
    const mockEditApplicationData = jest.fn();

    // Reset mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });    it("renders all required form elements", async () => {
        render(
            <RdsCompApplicationBasic
                basicData={mockBasicData}
                onSuccess={mockOnSuccess}
                editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                    throw new Error('Function not implemented.');
                } }            />
        );

        // Check for presence of all required elements
        await waitFor(() => {
            // Check basic input fields
            expect(screen.getByTestId("input-client-id")).toBeInTheDocument();
            expect(screen.getByTestId("input-display-name")).toBeInTheDocument();
            
            // Check URL input fields
            const urlInputs = screen.getAllByTestId("site-key-url");
            expect(urlInputs).toHaveLength(2);
            expect(urlInputs[0]).toHaveAttribute("name", "Client Uri");
            expect(urlInputs[1]).toHaveAttribute("name", "Logo Uri");
            
            // Check buttons
            expect(screen.getByTestId("save")).toBeInTheDocument();
            expect(screen.getByTestId("cancel")).toBeInTheDocument();
        });
    });    it("initializes with provided basic data", async () => {
        render(
            <RdsCompApplicationBasic
                basicData={mockBasicData}
                onSuccess={mockOnSuccess}
                editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                    throw new Error('Function not implemented.');
                } }            />
        );

        // Verify all inputs have the correct initial values
        await waitFor(() => {            // Test regular inputs
            expect(screen.getByTestId("input-client-id")).toHaveValue(mockBasicData.clientId);
            expect(screen.getByTestId("input-display-name")).toHaveValue(mockBasicData.displayName);
            
            // Test URL inputs (they share the same test ID)
            const urlInputs = screen.getAllByTestId("site-key-url");
            expect(urlInputs[0]).toHaveValue(mockBasicData.clientUri);
            expect(urlInputs[1]).toHaveValue(mockBasicData.logoUri);
        });
    });    it("handles input changes correctly", async () => {
        render(
            <RdsCompApplicationBasic
                basicData={mockBasicData}
                onSuccess={mockOnSuccess}
                editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                    throw new Error('Function not implemented.');
                } }            />
        );

        const clientIdInput = screen.getByTestId("input-client-id");
        const displayNameInput = screen.getByTestId("input-display-name");

        // Change input values
        await act(async () => {
            fireEvent.change(clientIdInput, { target: { value: "new-client-id" } });
            fireEvent.change(displayNameInput, { target: { value: "New Display Name" } });
        });

        // Verify editApplicationData was called with updated data
        await waitFor(() => {
            expect(mockEditApplicationData).toHaveBeenCalledTimes(2);
            expect(mockEditApplicationData).toHaveBeenLastCalledWith({
                ...mockBasicData,
                clientId: "new-client-id",
                displayName: "New Display Name"
            });
        });
    });    describe("form validation", () => {
        it("validates required fields", async () => {
            render(
                <RdsCompApplicationBasic
                    basicData={{}}
                    onSuccess={mockOnSuccess}
                    editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                        throw new Error('Function not implemented.');
                    } }                />
            );

            const saveButton = screen.getByTestId("save");
            
            await waitFor(() => {
                expect(saveButton).toBeDisabled();
            });

            // Fill only some required fields
            await act(async () => {
                fireEvent.change(screen.getByTestId("input-client-id"), {
                    target: { value: "test-client" }
                });
            });

            // Button should still be disabled
            await waitFor(() => {
                expect(saveButton).toBeDisabled();
            });
        });

        it("validates URL formats", async () => {
            render(
                <RdsCompApplicationBasic
                    basicData={{}}
                    onSuccess={mockOnSuccess}
                    editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                        throw new Error('Function not implemented.');
                    } }                />
            );

            const saveButton = screen.getByTestId("save");

            // Fill in valid data except URLs
            await act(async () => {
                fireEvent.change(screen.getByTestId("input-client-id"), {
                    target: { value: "test-client" }
                });
                fireEvent.change(screen.getByTestId("input-display-name"), {
                    target: { value: "Test Display" }
                });                const urlInputs = screen.getAllByTestId("site-key-url");
                fireEvent.change(urlInputs[0], {
                    target: { value: "invalid-uri" }
                });
                fireEvent.change(urlInputs[1], {
                    target: { value: "invalid-uri" }
                });
            });

            await waitFor(() => {
                expect(saveButton).toBeDisabled();
            });

            // Update to valid URLs
            await act(async () => {                const urlInputs = screen.getAllByTestId("site-key-url");
                fireEvent.change(urlInputs[0], {
                    target: { value: "https://valid-client.com" }
                });
                fireEvent.change(urlInputs[1], {
                    target: { value: "https://valid-client.com/logo.png" }
                });
            });

            await waitFor(() => {
                expect(saveButton).not.toBeDisabled();
            });
        });
    });    it("handles form submission correctly", async () => {
        render(
            <RdsCompApplicationBasic
                basicData={mockBasicData}
                onSuccess={mockOnSuccess}
                editApplicationData={mockEditApplicationData} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                    throw new Error('Function not implemented.');
                } }            />
        );

        // Submit the form
        await act(async () => {
            const saveButton = screen.getByTestId("save");
            fireEvent.click(saveButton);
        });

        // Verify onSuccess was called with the correct data
        await waitFor(() => {
            expect(mockOnSuccess).toHaveBeenCalledTimes(1);
            expect(mockOnSuccess).toHaveBeenCalledWith(mockBasicData);
        });
    });

    it("handles form reset correctly", async () => {
        const { rerender } = render(
            <RdsCompApplicationBasic
                basicData={mockBasicData}
                onSuccess={mockOnSuccess}
                editApplicationData={mockEditApplicationData}
                reset={false} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                    throw new Error('Function not implemented.');
                } }            />
        );

        // Trigger a reset by changing the reset prop
        await act(async () => {
            rerender(
                <RdsCompApplicationBasic
                    basicData={mockBasicData}
                    onSuccess={mockOnSuccess}
                    editApplicationData={mockEditApplicationData}
                    reset={true} scopesList={[]} typeList={[]} consentType={[]} handleSubmit={function (event: any): void {
                        throw new Error('Function not implemented.');
                    } }                />
            );
        });

        // Submit form to trigger reset
        await act(async () => {
            fireEvent.click(screen.getByTestId("save"));
        });

        // Verify inputs are cleared
        await waitFor(() => {            // Check regular inputs
            expect(screen.getByTestId("input-client-id")).toHaveValue("");
            expect(screen.getByTestId("input-display-name")).toHaveValue("");
            
            // Check URL inputs
            const urlInputs = screen.getAllByTestId("site-key-url");
            expect(urlInputs[0]).toHaveValue("");
            expect(urlInputs[1]).toHaveValue("");
        });
    });
});