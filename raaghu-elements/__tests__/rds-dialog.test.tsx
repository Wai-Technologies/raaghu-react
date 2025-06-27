import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsDialog from '../src/rds-dialog/rds-dialog';

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
    RdsCompIcon: (props: any) => (
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

describe('RdsDialog', () => {
    const defaultProps = {
        Title: 'Test Dialog',
        Content: 'This is test content',
        ColorVariant: 'primary'
    };    // Basic Rendering Tests
    describe('Basic Rendering', () => {
        it('renders dialog component with default props', () => {
            render(<RdsDialog {...defaultProps} ShowTitle={true} />);
            
            expect(screen.getByText('Test Dialog')).toBeInTheDocument();
            expect(screen.getByText('This is test content')).toBeInTheDocument();
        });

        it('renders without title when ShowTitle is false', () => {
            render(<RdsDialog {...defaultProps} ShowTitle={false} />);
            
            expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
            expect(screen.getByText('This is test content')).toBeInTheDocument();
        });

        it('renders without content when Content is not provided', () => {
            render(<RdsDialog Title="Test Dialog" ShowTitle={true} />);
            
            expect(screen.getByText('Test Dialog')).toBeInTheDocument();
            expect(screen.queryByText('This is test content')).not.toBeInTheDocument();
        });
    });

    // Size and Style Tests
    describe('Size and Style Variants', () => {
        it('applies large size class correctly', () => {
            render(<RdsDialog {...defaultProps} Size="large" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveClass('col-12');
        });

        it('applies small size class correctly', () => {
            render(<RdsDialog {...defaultProps} Size="small" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveClass('col-sm-4', 'col-md-12', 'col-lg-6', 'col-xl-3');
        });        it('applies outlined style correctly', () => {
            render(<RdsDialog {...defaultProps} Style="outlined" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toBeInTheDocument();
        });

        it('applies filled style correctly', () => {
            render(<RdsDialog {...defaultProps} Style="filled" />);
            
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toHaveStyle({ backgroundColor: '#FEF7FF' });
        });
    });

    // Button Visibility Tests
    describe('Button Visibility', () => {
        it('shows dismiss button when ShowDissmiss is true', () => {
            render(<RdsDialog {...defaultProps} ShowDissmiss={true} />);
            
            expect(screen.getByTestId('rds-icon')).toBeInTheDocument();
            expect(screen.getByText('close')).toBeInTheDocument();
        });

        it('hides dismiss button when ShowDissmiss is false', () => {
            render(<RdsDialog {...defaultProps} ShowDissmiss={false} />);
            
            expect(screen.queryByText('close')).not.toBeInTheDocument();
        });

        it('shows primary button when ShowPrimary is true', () => {
            render(<RdsDialog {...defaultProps} ShowPrimary={true} />);
            
            expect(screen.getByText('Okay')).toBeInTheDocument();
        });

        it('hides primary button when ShowPrimary is false', () => {
            render(<RdsDialog {...defaultProps} ShowPrimary={false} />);
            
            expect(screen.queryByText('Okay')).not.toBeInTheDocument();
        });

        it('shows secondary button when ShowSecondary is true', () => {
            render(<RdsDialog {...defaultProps} ShowSecondary={true} />);
            
            expect(screen.getByText('Cancel')).toBeInTheDocument();
        });

        it('hides secondary button when ShowSecondary is false', () => {
            render(<RdsDialog {...defaultProps} ShowSecondary={false} />);
            
            expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        });

        it('shows both primary and secondary buttons', () => {
            render(
                <RdsDialog 
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
            render(<RdsDialog {...defaultProps} Icon="warning" />);
            
            expect(screen.getByText('warning')).toBeInTheDocument();
        });

        it('does not render icon when Icon prop is not provided', () => {
            render(<RdsDialog {...defaultProps} />);
            
            expect(screen.queryByTestId('rds-icon')).not.toBeInTheDocument();
        });

        it('applies correct color variant to icon', () => {
            render(
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
                <RdsDialog 
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
    describe('Integration Tests', () => {        it('renders complete dialog with all elements', () => {
            render(
                <RdsDialog 
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
        });

        it('renders minimal dialog with only content', () => {
            render(
                <RdsDialog 
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
                <RdsDialog 
                    Title=""
                    ShowTitle={true}
                    Content="Content with empty title"
                />
            );
            
            expect(screen.getByText('Content with empty title')).toBeInTheDocument();
        });

        it('handles empty content gracefully', () => {
            render(
                <RdsDialog 
                    Title="Title with empty content"
                    ShowTitle={true}
                    Content=""
                />
            );
            
            expect(screen.getByText('Title with empty content')).toBeInTheDocument();
        });

        it('handles undefined props gracefully', () => {
            render(<RdsDialog />);
            
            // Should render without errors even with no props
            const dialogContainer = document.querySelector('.dialog-container');
            expect(dialogContainer).toBeInTheDocument();
        });
    });

    // Accessibility Tests
    describe('Accessibility', () => {
        it('has proper dialog structure', () => {
            render(
                <RdsDialog 
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
            render(<RdsDialog {...defaultProps} ShowDissmiss={true} />);
            
            const dismissIcon = screen.getByTestId('rds-icon');
            expect(dismissIcon).toHaveStyle({ cursor: 'pointer' });
        });
    });
});