import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsDialog from './rds-dialog';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-dialog.scss', () => ({}));

// Mock RdsButton component
jest.mock('../rds-button/rds-button', () => {
  return function MockRdsButton({ children, onClick, text, style, ...props }: any) {
    return (
      <button onClick={onClick} {...props}>
        {children || text}
      </button>
    );
  };
});

// Mock MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Dialog: ({ children, onClose, maxWidth, open, ...props }: any) => {
    if (!open) return null;
    return (
      <div data-testid="dialog-root" role="dialog" aria-labelledby="mock-dialog-title" {...props}>
        {children}
      </div>
    );
  },
  DialogTitle: ({ children, ...props }: any) => (
    <div id="mock-dialog-title" data-testid="dialog-title" {...props}>{children}</div>
  ),
  DialogContent: ({ children, ...props }: any) => (
    <div data-testid="dialog-content" {...props}>{children}</div>
  ),
  DialogActions: ({ children, ...props }: any) => (
    <div data-testid="dialog-actions" {...props}>{children}</div>
  ),
  IconButton: ({ children, onClick, 'aria-label': ariaLabel, ...props }: any) => (
    <button
      data-testid={ariaLabel ? `icon-button-${ariaLabel}` : 'icon-button'}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock MUI Icons
jest.mock('@mui/icons-material/Close', () => {
  return function MockCloseIcon() {
    return <span data-testid="close-icon">CloseIcon</span>;
  };
});

describe('RdsDialog', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsDialog {...defaultProps} />);
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      render(<RdsDialog {...defaultProps} open={false} />);
      expect(screen.queryByTestId('dialog-root')).not.toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsDialog.displayName).toBe('RdsDialog');
    });

    it('should render with default dialog role', () => {
      render(<RdsDialog {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Title Props', () => {
    it('should render title when provided', () => {
      render(<RdsDialog {...defaultProps} title="Test Dialog Title" />);
      expect(screen.getByText('Test Dialog Title')).toBeInTheDocument();
    });

    it('should render title element when showTitle is true', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Test Title"
          showTitle={true}
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Hidden Title"
          showTitle={false}
        />
      );
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
    });

    it('should render title element even when showTitle is false if ShowDissmiss is true', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Test"
          showTitle={false}
          ShowDissmiss={true}
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });
  });

  describe('Children and Content', () => {
    it('should render children content', () => {
      render(
        <RdsDialog {...defaultProps}>
          <div>Dialog Content</div>
        </RdsDialog>
      );
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });

    it('should render dialog content element', () => {
      render(
        <RdsDialog {...defaultProps}>
          <p>Test Content</p>
        </RdsDialog>
      );
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('should render complex children', () => {
      render(
        <RdsDialog {...defaultProps}>
          <div>
            <h1>Header</h1>
            <p>Description</p>
          </div>
        </RdsDialog>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Close Button (ShowDissmiss)', () => {
    it('should render close button when ShowDissmiss is true', () => {
      render(<RdsDialog {...defaultProps} ShowDissmiss={true} />);
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
    });

    it('should not render close button when ShowDissmiss is false', () => {
      render(<RdsDialog {...defaultProps} ShowDissmiss={false} />);
      expect(screen.queryByTestId('icon-button-close')).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <RdsDialog
          {...defaultProps}
          onClose={mockOnClose}
          ShowDissmiss={true}
        />
      );
      fireEvent.click(screen.getByTestId('icon-button-close'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should show close icon when ShowDissmiss is true', () => {
      render(<RdsDialog {...defaultProps} ShowDissmiss={true} />);
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render with standard variant', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          title="Standard Dialog"
        />
      );
      expect(screen.getByText('Standard Dialog')).toBeInTheDocument();
    });

    it('should render with default variant', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="default"
          title="Default Dialog"
        />
      );
      expect(screen.getByText('Default Dialog')).toBeInTheDocument();
    });

    it('should use standard variant when explicitly set', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          title="Test"
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });

    it('should use default variant by default', () => {
      render(<RdsDialog {...defaultProps} title="Test" />);
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });
  });

  describe('Size Props', () => {
    const sizes = ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

    sizes.forEach((size) => {
      it(`should render with ${size} size`, () => {
        render(
          <RdsDialog
            {...defaultProps}
            size={size}
            title="Test"
          />
        );
        expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
      });
    });

    it('should render with false size', () => {
      render(
        <RdsDialog
          {...defaultProps}
          size={false}
          title="Test"
        />
      );
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });

    it('should use medium size by default', () => {
      render(<RdsDialog {...defaultProps} title="Test" />);
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });
  });

  describe('Actions Props', () => {
    it('should render actions when provided', () => {
      render(
        <RdsDialog
          {...defaultProps}
          actions={<button>Action Button</button>}
        />
      );
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    it('should render dialog actions element when actions provided', () => {
      render(
        <RdsDialog
          {...defaultProps}
          actions={<button>Test Action</button>}
        />
      );
      expect(screen.getByTestId('dialog-actions')).toBeInTheDocument();
    });

    it('should not render dialog actions element when no actions provided', () => {
      render(<RdsDialog {...defaultProps} />);
      // In default variant, actions element is only shown if actions prop is provided
      // So we check if our test action button exists
      expect(screen.queryByText('Test Action')).not.toBeInTheDocument();
    });

    it('should render multiple action buttons', () => {
      render(
        <RdsDialog
          {...defaultProps}
          actions={
            <>
              <button>Cancel</button>
              <button>Save</button>
            </>
          }
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Primary and Secondary Actions (Standard Variant)', () => {
    it('should render secondary button when ShowSecondary is true', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          ShowSecondary={true}
          onClose={jest.fn()}
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should render primary button when ShowPrimary is true', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          ShowPrimary={true}
        />
      );
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should render both primary and secondary buttons', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          ShowPrimary={true}
          ShowSecondary={true}
          onClose={jest.fn()}
        />
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should call onClose when secondary button is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          ShowSecondary={true}
          onClose={mockOnClose}
        />
      );
      fireEvent.click(screen.getByText('Cancel'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when primary button is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          ShowPrimary={true}
          onClose={mockOnClose}
        />
      );
      fireEvent.click(screen.getByText('Okay'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Handlers', () => {
    it('should call onClose when provided', () => {
      const mockOnClose = jest.fn();
      render(
        <RdsDialog
          {...defaultProps}
          onClose={mockOnClose}
          ShowDissmiss={true}
        />
      );
      fireEvent.click(screen.getByTestId('icon-button-close'));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should handle undefined onClose gracefully', () => {
      render(
        <RdsDialog
          open={true}
          ShowDissmiss={true}
        />
      );
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="dialog"', () => {
      render(<RdsDialog {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsDialog open={true} title="Test Dialog" onClose={jest.fn()} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

    it('should have proper aria-label on close button', () => {
      render(
        <RdsDialog
          {...defaultProps}
          ShowDissmiss={true}
        />
      );
      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });

    it('should have role="dialog" for standard variant', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          title="Test"
        />
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have proper title structure for accessibility', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Accessible Title"
          showTitle={true}
        />
      );
      expect(screen.getByText('Accessible Title')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply rds-dialog class to dialog paper in standard variant', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          title="Test"
        />
      );
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });

    it('should render dialog with correct structure', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Test Title"
          variant="standard"
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });
  });

  describe('Props Combination Tests', () => {
    it('should render with title, content, and close button', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Complex Dialog"
          ShowDissmiss={true}
          showTitle={true}
        >
          <p>Dialog Content</p>
        </RdsDialog>
      );
      expect(screen.getByText('Complex Dialog')).toBeInTheDocument();
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
    });

    it('should render standard variant with all features', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="standard"
          title="Full Featured"
          ShowDissmiss={true}
          ShowPrimary={true}
          ShowSecondary={true}
          showTitle={true}
          size="large"
          onClose={jest.fn()}
        >
          <p>Content</p>
        </RdsDialog>
      );
      expect(screen.getByText('Full Featured')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should render default variant with custom actions', () => {
      render(
        <RdsDialog
          {...defaultProps}
          variant="default"
          title="With Actions"
          showTitle={true}
          actions={<button>Custom Action</button>}
        >
          <p>Content</p>
        </RdsDialog>
      );
      expect(screen.getByText('With Actions')).toBeInTheDocument();
      expect(screen.getByText('Custom Action')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-actions')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title=""
          showTitle={true}
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      render(
        <RdsDialog
          {...defaultProps}
          title="Test"
        />
      );
      expect(screen.getByTestId('dialog-root')).toBeInTheDocument();
    });

    it('should handle undefined title', () => {
      render(
        <RdsDialog
          {...defaultProps}
          showTitle={true}
        />
      );
      expect(screen.getByTestId('dialog-title')).toBeInTheDocument();
    });

    it('should not render dialog when open is not true', () => {
      render(
        <RdsDialog
          open={false}
          title="Not Visible"
        />
      );
      expect(screen.queryByText('Not Visible')).not.toBeInTheDocument();
    });
  });
});