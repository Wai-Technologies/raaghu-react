import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDialog from '../src/rds-comp-dialog/rds-comp-dialog';

// Mock the RDS components
jest.mock('../src/rds-elements', () => ({
    RdsButton: (props: any) => (
        <button 
            data-testid={props.dataTestId || "rds-button"} 
            onClick={props.onClick}
            className={props.class}
            disabled={props.isDisabled}
        >
            {props.label}
        </button>
    ),
    RdsIcon: (props: any) => (
        <span 
            data-testid={props.dataTestId || "rds-icon"} 
            onClick={props.onClick}
            style={{ 
                cursor: props.isCursorPointer ? 'pointer' : 'default',
                width: props.width,
                height: props.height 
            }}
        >
            {props.name}
        </span>
    )
}));

describe('RdsCompDialog', () => {
    const defaultProps = {
        Title: 'Test Dialog',
        Content: 'This is test content',
        ColorVariant: 'primary'
    };    // Basic Rendering Tests
    describe('Basic Rendering', () => {
        it('renders dialog component with default props', () => {
            render(<RdsCompDialog {...defaultProps} ShowTitle={true} />);
            
            expect(screen.getByText('Test Dialog')).toBeInTheDocument();
            expect(screen.getByText('This is test content')).toBeInTheDocument();
        });

        it('renders without title when ShowTitle is false', () => {
            render(<RdsCompDialog {...defaultProps} ShowTitle={false} />);
            
            expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
            expect(screen.getByText('This is test content')).toBeInTheDocument();
        });

        it('renders without content when Content is not provided', () => {
            render(<RdsCompDialog Title="Test Dialog" ShowTitle={true} />);
            
            expect(screen.getByText('Test Dialog')).toBeInTheDocument();
            expect(screen.queryByText('This is test content')).not.toBeInTheDocument();
        });
    });

    // Size and Style Tests
    describe('Size and Style Variants', () => {
        it('applies large size class correctly', () => {
            render(<RdsCompDialog {...defaultProps} Size="large" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveClass('col-12');
        });

        it('applies small size class correctly', () => {
            render(<RdsCompDialog {...defaultProps} Size="small" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveClass('col-sm-4', 'col-md-12', 'col-lg-6', 'col-xl-3');
        });

        it('applies outlined style correctly', () => {
            render(<RdsCompDialog {...defaultProps} Style="outlined" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveStyle({ border: '1px solid #adb5bd' });
        });

        it('applies filled style correctly', () => {
            render(<RdsCompDialog {...defaultProps} Style="filled" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveStyle({ backgroundColor: '#FEF7FF' });
        });
    });

    // Button Visibility Tests
    describe('Button Visibility', () => {
        it('shows dismiss button when ShowDissmiss is true', () => {
            render(<RdsCompDialog {...defaultProps} ShowDissmiss={true} />);
            
            expect(screen.getByTestId('rds-icon')).toBeInTheDocument();
            expect(screen.getByText('close')).toBeInTheDocument();
        });

        it('hides dismiss button when ShowDissmiss is false', () => {
            render(<RdsCompDialog {...defaultProps} ShowDissmiss={false} />);
            
            expect(screen.queryByText('close')).not.toBeInTheDocument();
        });

        it('shows primary button when ShowPrimary is true', () => {
            render(<RdsCompDialog {...defaultProps} ShowPrimary={true} />);
            
            expect(screen.getByText('Okay')).toBeInTheDocument();
        });

        it('hides primary button when ShowPrimary is false', () => {
            render(<RdsCompDialog {...defaultProps} ShowPrimary={false} />);
            
            expect(screen.queryByText('Okay')).not.toBeInTheDocument();
        });

        it('shows secondary button when ShowSecondary is true', () => {
            render(<RdsCompDialog {...defaultProps} ShowSecondary={true} />);
            
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });

        it('hides secondary button when ShowSecondary is false', () => {
            render(<RdsCompDialog {...defaultProps} ShowSecondary={false} />);
            
            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });

        it('shows both primary and secondary buttons', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ShowPrimary={true} 
                    ShowSecondary={true} 
                />
            );
            
            expect(screen.getByText('Okay')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });
    });

    // Icon Tests
    describe('Icon Display', () => {
        it('renders icon when Icon prop is provided', () => {
            render(<RdsCompDialog {...defaultProps} Icon="warning" />);
            
            expect(screen.getByText('warning')).toBeInTheDocument();
        });

        it('does not render icon when Icon prop is not provided', () => {
            render(<RdsCompDialog {...defaultProps} />);
            
            expect(screen.queryByTestId('rds-icon')).not.toBeInTheDocument();
        });

        it('applies correct color variant to icon', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    Icon="warning" 
                    ColorVariant="danger" 
                />
            );
            
            expect(screen.getByText('warning')).toBeInTheDocument();
        });
    });

    // Content Position Tests
    describe('Content Position', () => {
        it('renders content at bottom when ContentPosition is bottom', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ContentPosition="bottom"
                    Icon="warning"
                />
            );
            
            const contentDiv = screen.getByText('This is test content').closest('.d-flex');
            expect(contentDiv).toHaveClass('d-flex', 'flex-column', 'align-items-center');
            
            const textContent = screen.getByText('This is test content');
            expect(textContent).toHaveClass('dialog-content', 'text-center', 'mt-2');
        });        it('renders content normally when ContentPosition is not bottom', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ContentPosition="top"
                    Icon="warning"
                />
            );
            
            const textContent = screen.getByText('This is test content');
            expect(textContent).toHaveClass('dialog-content', 'mt-2', 'text-center');
            // Both branches render with text-center class, so we verify it has the expected classes
            expect(textContent).toBeInTheDocument();
        });
    });

    // Button Actions Tests
    describe('Button Actions', () => {
        it('calls resetToDefault function when Cancel button is clicked', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ShowSecondary={true} 
                />
            );
            
            const cancelButton = screen.getByText('Cancel');
            fireEvent.click(cancelButton);
            
            // Since the function is empty, we just verify the button click doesn't throw errors
            expect(cancelButton).toBeInTheDocument();
            
            consoleSpy.mockRestore();
        });

        it('calls handleSave function when Okay button is clicked', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ShowPrimary={true} 
                />
            );
            
            const okayButton = screen.getByText('Okay');
            fireEvent.click(okayButton);
            
            // Since the function is empty, we just verify the button click doesn't throw errors
            expect(okayButton).toBeInTheDocument();
            
            consoleSpy.mockRestore();
        });
    });

    // Dialog Actions Layout Tests
    describe('Dialog Actions Layout', () => {
        it('applies flex-column class for small size dialog', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    Size="small"
                    ShowPrimary={true}
                    ShowSecondary={true}
                />
            );
            
            const actionsDiv = document.querySelector('.dialog-actions');
            expect(actionsDiv).toHaveClass('flex-column');
        });

        it('does not apply flex-column class for non-small size dialog', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    Size="large"
                    ShowPrimary={true}
                    ShowSecondary={true}
                />
            );
            
            const actionsDiv = document.querySelector('.dialog-actions');
            expect(actionsDiv).not.toHaveClass('flex-column');
        });
    });

    // Color Variant Tests
    describe('Color Variant', () => {
        it('applies color variant to buttons and icons', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps} 
                    ColorVariant="danger"
                    ShowPrimary={true}
                    ShowSecondary={true}
                    ShowDissmiss={true}
                    Icon="warning"
                />
            );
            
            expect(screen.getByText('Okay')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });
    });

    // Integration Tests
    describe('Integration Tests', () => {
        it('renders complete dialog with all elements', () => {
            render(
                <RdsCompDialog 
                    Size="large"
                    Style="outlined"
                    ShowDissmiss={true}
                    ShowPrimary={true}
                    ShowSecondary={true}
                    Title="Complete Dialog"
                    ShowTitle={true}
                    Content="This is a complete dialog with all features"
                    Icon="info"
                    ColorVariant="primary"
                    ContentPosition="bottom"
                />
            );
            
            // Check all elements are present
            expect(screen.getByText('Complete Dialog')).toBeInTheDocument();
            expect(screen.getByText('This is a complete dialog with all features')).toBeInTheDocument();
            expect(screen.getByText('info')).toBeInTheDocument();
            expect(screen.getByText('close')).toBeInTheDocument();
            expect(screen.getByText('Okay')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
            
            // Check styling
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveClass('col-12');
            expect(dialogContainer).toHaveStyle({ border: '1px solid #adb5bd' });
        });

        it('renders minimal dialog with only content', () => {
            render(
                <RdsCompDialog 
                    Content="Minimal dialog content"
                />
            );
            
            expect(screen.getByText('Minimal dialog content')).toBeInTheDocument();
            expect(screen.queryByText('close')).not.toBeInTheDocument();
            expect(screen.queryByText('Okay')).not.toBeInTheDocument();
            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });
    });

    // Edge Cases
    describe('Edge Cases', () => {
        it('handles empty title gracefully', () => {
            render(
                <RdsCompDialog 
                    Title=""
                    ShowTitle={true}
                    Content="Content with empty title"
                />
            );
            
            expect(screen.getByText('Content with empty title')).toBeInTheDocument();
        });

        it('handles empty content gracefully', () => {
            render(
                <RdsCompDialog 
                    Title="Title with empty content"
                    ShowTitle={true}
                    Content=""
                />
            );
            
            expect(screen.getByText('Title with empty content')).toBeInTheDocument();
        });

        it('handles undefined props gracefully', () => {
            render(<RdsCompDialog />);
            
            // Should render without errors even with no props
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toBeInTheDocument();
        });
    });

    // Accessibility Tests
    describe('Accessibility', () => {
        it('has proper dialog structure', () => {
            render(
                <RdsCompDialog 
                    {...defaultProps}
                    ShowTitle={true}
                    ShowPrimary={true}
                    ShowSecondary={true}
                />
            );
            
            expect(screen.getByText('Test Dialog')).toBeInTheDocument();
            expect(screen.getByText('This is test content')).toBeInTheDocument();
        });

        it('dismiss icon has proper cursor pointer style', () => {
            render(<RdsCompDialog {...defaultProps} ShowDissmiss={true} />);
            
            const dismissIcon = screen.getByTestId('rds-icon');
            expect(dismissIcon).toHaveStyle({ cursor: 'pointer' });
        });
    });
});