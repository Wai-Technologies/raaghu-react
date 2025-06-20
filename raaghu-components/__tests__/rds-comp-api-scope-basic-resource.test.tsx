import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompScopeBasicResource from '../src/rds-comp-scope-basic-resource';
import { RdsInput, RdsCheckbox, RdsButton } from '../src/rds-elements';

// Mock the RdsElements components
jest.mock('../src/rds-elements', () => ({
    RdsInput: jest.fn(({ dataTestId, value, onChange }) => (
        <input
            data-testid={dataTestId}
            value={value || ''}
            onChange={onChange}
        />
    )),
    RdsCheckbox: jest.fn(({ dataTestId, checked, onChange }) => (
        <input
            type="checkbox"
            data-testid={dataTestId}
            checked={checked || false}
            onChange={onChange}
        />
    )),
    RdsButton: jest.fn(({ dataTestId, isDisabled, onClick }) => (
        <button
            data-testid={dataTestId}
            disabled={isDisabled}
            onClick={onClick}
        />
    ))
}));

describe('RdsCompScopeBasicResource', () => {
    const mockApiScopeData = {
        name: 'test-scope',
        description: 'Test description',
        enabled: true,
        required: false,
        emphasize: true,
        showInDiscovery: false
    };

    const mockOnSaveHandler = jest.fn();

    beforeEach(() => {
        mockOnSaveHandler.mockClear();
        jest.clearAllMocks();
    });    it('renders all form fields with provided data', () => {
        render(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
        />);

        // Verify RdsInput was called with correct props
        expect(RdsInput).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'name',
                value: mockApiScopeData.name,
                required: true
            }),
            expect.any(Object)
        );

        expect(RdsInput).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'description',
                value: mockApiScopeData.description,
                required: false
            }),
            expect.any(Object)
        );

        // Verify RdsCheckbox was called with correct props
        expect(RdsCheckbox).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'enabled',
                checked: mockApiScopeData.enabled
            }),
            expect.any(Object)
        );

        expect(RdsCheckbox).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'required',
                checked: mockApiScopeData.required
            }),
            expect.any(Object)
        );

        expect(RdsCheckbox).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'emphasize',
                checked: mockApiScopeData.emphasize
            }),
            expect.any(Object)
        );

        expect(RdsCheckbox).toHaveBeenCalledWith(
            expect.objectContaining({
                dataTestId: 'discovery-document',
                checked: mockApiScopeData.showInDiscovery
            }),
            expect.any(Object)
        );
    });    it('handles form field changes', () => {
        const { rerender } = render(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
        />);

        // Test text input change
        const nameInput = screen.getByTestId('name');
        fireEvent.change(nameInput, { target: { value: 'new-scope-name' } });

        // Force a rerender to ensure state updates are reflected
        rerender(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
        />);

        // Find the last RdsInput call for the name field
        const nameInputCall = jest.mocked(RdsInput).mock.calls
            .reverse()
            .find(call => call[0].dataTestId === 'name');

        expect(nameInputCall?.[0]).toMatchObject({
            dataTestId: 'name',
            value: 'new-scope-name'
        });

        // Test checkbox change
        const enabledCheckbox = screen.getByTestId('enabled');
        
        // Clear previous calls to get a fresh start
        jest.clearAllMocks();
        
        // Trigger the checkbox change
        fireEvent.click(enabledCheckbox);

        // Find the last RdsCheckbox call for the enabled field
        const enabledCheckboxCall = jest.mocked(RdsCheckbox).mock.calls
            .find(call => call[0].dataTestId === 'enabled');

        expect(enabledCheckboxCall?.[0]).toMatchObject({
            dataTestId: 'enabled',
            checked: false
        });
    });

    it('validates form and controls save button state', () => {
        // Test with empty name
        render(<RdsCompScopeBasicResource 
            apiScopeData={{ ...mockApiScopeData, name: '' }}
            onSaveHandler={mockOnSaveHandler}
        />);

        expect(RdsButton).toHaveBeenLastCalledWith(
            expect.objectContaining({
                isDisabled: true
            }),
            expect.any(Object)
        );

        // Test with valid name
        render(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
        />);

        expect(RdsButton).toHaveBeenLastCalledWith(
            expect.objectContaining({
                isDisabled: false
            }),
            expect.any(Object)
        );
    });

    it('handles form submission correctly', () => {
        render(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
        />);

        // Find and click save button
        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);

        // Verify onSaveHandler was called with correct data
        expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
        expect(mockOnSaveHandler).toHaveBeenCalledWith(mockApiScopeData);
    });    it('handles form reset correctly', () => {
        const { rerender } = render(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
            reset={false}
        />);

        // Get initial RdsInput calls
        const initialCalls = jest.mocked(RdsInput).mock.calls.length;

        // Trigger reset
        rerender(<RdsCompScopeBasicResource 
            apiScopeData={mockApiScopeData}
            onSaveHandler={mockOnSaveHandler}
            reset={true}
        />);

        // Get all new RdsInput calls after rerender
        const newCalls = jest.mocked(RdsInput).mock.calls.slice(initialCalls);

        // Verify that at least one call to RdsInput includes reset=true
        const hasResetCall = newCalls.some(call => 
            call[0].dataTestId === 'name' && call[0].reset === true
        );
        
        expect(hasResetCall).toBe(true);

        // Verify the form values are reset
        expect(newCalls.find(call => call[0].dataTestId === 'name')?.[0]).toEqual(
            expect.objectContaining({
                value: mockApiScopeData.name
            })
        );
    });

    it('renders form with empty data when apiScopeData is not provided', () => {
        render(<RdsCompScopeBasicResource 
            onSaveHandler={mockOnSaveHandler}
        />);

        // Should render with empty/default values
        expect(RdsInput).toHaveBeenCalledWith(
            expect.objectContaining({
                value: undefined
            }),
            expect.any(Object)
        );

        expect(RdsCheckbox).toHaveBeenCalledWith(
            expect.objectContaining({
                checked: undefined
            }),
            expect.any(Object)
        );
    });
});