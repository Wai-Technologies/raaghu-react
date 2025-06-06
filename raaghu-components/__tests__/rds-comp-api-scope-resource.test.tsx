import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompApiScopeResource from '../src/rds-comp-api-scope-resource';
import { RdsButton, RdsCheckbox } from '../src/rds-elements';

// Mock RdsElements components
jest.mock('../src/rds-elements', () => ({
    RdsButton: jest.fn(({ 
        dataTestId, 
        isDisabled, 
        onClick, 
        label, 
        type, 
        colorVariant, 
        size,
        databsdismiss,
        class: className
    }) => (
        <button
            data-testid={dataTestId}
            disabled={isDisabled}
            onClick={onClick}
            type={type || 'button'}
            className={`${colorVariant ? `btn-${colorVariant}` : ''} ${className || ''} ${size ? `btn-${size}` : ''}`}
            aria-label={label}
            data-bs-dismiss={databsdismiss}
        >
            {label}
        </button>
    )),    RdsCheckbox: jest.fn(({ dataTestId, checked, onChange, labelText, id }) => (
        <div>
            <input
                type="checkbox"
                data-testid={dataTestId}
                checked={checked || false}
                onChange={onChange}
                id={id}
                aria-label={labelText}
            />
            <label htmlFor={id}>{labelText}</label>
        </div>
    ))
}));

describe('RdsCompApiScopeResource', () => {
    const mockResources = [
        {
            id: 1,
            displayName: 'Group A',
            selected: false,
            children: [
                {
                    id: 1,
                    p_id: 1,
                    displayName: 'Resource 1',
                    selected: false
                },
                {
                    id: 2,
                    p_id: 1,
                    displayName: 'Resource 2',
                    selected: true
                }
            ]
        },
        {
            id: 2,
            displayName: 'Group B',
            selected: false,
            children: [
                {
                    id: 3,
                    p_id: 2,
                    displayName: 'Resource 3',
                    selected: false
                }
            ]
        }
    ];

    const mockOnCreate = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all resource groups and their children', () => {
        render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Check if parent groups are rendered
        expect(screen.getByText('Group A')).toBeInTheDocument();
        expect(screen.getByText('Group B')).toBeInTheDocument();

        // Check if child resources are rendered
        expect(screen.getByText('Resource 1')).toBeInTheDocument();
        expect(screen.getByText('Resource 2')).toBeInTheDocument();
        expect(screen.getByText('Resource 3')).toBeInTheDocument();

        // Check if checkboxes are rendered with correct states
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes.length).toBeGreaterThan(0);
    });    it('handles select all functionality', () => {
        render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Find the first checkbox which is the select all
        const checkboxes = screen.getAllByRole('checkbox');
        const selectAllCheckbox = checkboxes[0];
        fireEvent.click(selectAllCheckbox);

        // Should update all checkboxes
        checkboxes.forEach(checkbox => {
            expect(checkbox).toBeChecked();
        });
    });

    it('handles parent checkbox selection', () => {
        render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Find and click a parent group's select all
        const parentCheckbox = screen.getAllByLabelText('Select all')[1]; // First parent group
        fireEvent.click(parentCheckbox);

        // Should update parent and its children
        expect(parentCheckbox).toBeChecked();
        const childCheckboxes = screen.getAllByLabelText(/Resource [12]/);
        childCheckboxes.forEach(checkbox => {
            expect(checkbox).toBeChecked();
        });
    });    it('updates parent state based on child selections', () => {
        render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Find child checkboxes for Group A
        const childCheckboxes = screen.getAllByLabelText(/Resource [12]/) as HTMLInputElement[];
        expect(childCheckboxes.length).toBe(2);

        // Click both child checkboxes if they're not already checked
        childCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                fireEvent.click(checkbox);
            }
        });

        // Find the parent group's checkbox (first parent after the main select all)
        const parentCheckbox = screen.getAllByLabelText(/Select all/)[1] as HTMLInputElement;
        expect(parentCheckbox).toBeChecked();
    });    it('calls onCreate with updated resources when save is clicked', () => {
        render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Select some resources
        const checkbox = screen.getByLabelText('Resource 1') as HTMLInputElement;
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        // Find save button by its aria-label
        const saveButton = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveButton);

        // Check if onCreate was called with updated resources
        expect(mockOnCreate).toHaveBeenCalledTimes(1);
        const updatedResources = mockOnCreate.mock.calls[0][0];
        expect(updatedResources[0].children[0].selected).toBe(true);
    });    it('calls onCancel and resets selections when cancel is clicked', async () => {
        const { rerender } = render(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Get initial state of checkboxes
        const checkboxes = screen.getAllByRole('checkbox');
        const initialStates = checkboxes.map(cb => (cb as HTMLInputElement).checked);

        // Click some checkboxes to change their state
        const firstGroupCheckbox = screen.getAllByLabelText(/Select all/)[1];
        fireEvent.click(firstGroupCheckbox);

        // Make sure some checkboxes were checked
        expect(screen.getAllByLabelText(/Resource [12]/)[0]).toBeChecked();
        expect(screen.getAllByLabelText(/Resource [12]/)[1]).toBeChecked();

        // Find and click the cancel button
        const cancelButton = screen.getByRole('button', {
            name: 'Cancel',
        });
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toHaveClass('btn-outline-primary');
        fireEvent.click(cancelButton);

        // Verify onCancel was called
        expect(mockOnCancel).toHaveBeenCalledTimes(1);

        // Simulate the parent component updating props after cancel
        rerender(
            <RdsCompApiScopeResource
                resources={mockResources}
                role="basic"
                onCreate={mockOnCreate}
                onCancel={mockOnCancel}
            />
        );

        // Verify everything is back to initial state
        const updatedCheckboxes = screen.getAllByRole('checkbox');
        initialStates.forEach((initialChecked, index) => {
            expect(updatedCheckboxes[index]).toHaveProperty('checked', initialChecked);
        });
    });
});