import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOrderSummary from '../src/rds-comp-order-summary/rds-comp-order-summary';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, type, size, block, colorVariant, class: className }: any) => (
    <button
      data-testid="rds-button-checkout"
      type={type}
      className={`btn ${colorVariant} ${block ? 'w-100' : ''} btn-${size} ${className}`}
    >
      {label}
    </button>
  ),
  RdsLabel: ({ label }: any) => (
    <span data-testid="rds-label">{label}</span>
  ),
}));

describe('RdsCompOrderSummary', () => {
  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompOrderSummary isCheckout={false} />);
      }).not.toThrow();
    });

    it('should render the order summary table', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      expect(screen.getByText('Order summary')).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('should render all order summary rows', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      expect(screen.getByText('subtotal')).toBeInTheDocument();
      expect(screen.getByText('Shipping estimate')).toBeInTheDocument();
      expect(screen.getByText('Tax estimate')).toBeInTheDocument();
      expect(screen.getByTestId('rds-label')).toHaveTextContent('Order Total');
    });

    it('should display correct monetary values', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      const dollarAmounts = screen.getAllByText('$0.00');
      expect(dollarAmounts).toHaveLength(4); // subtotal, shipping, tax, and total
    });
  });

  describe('Table Structure', () => {
    it('should have correct table structure with thead and tbody', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      const table = container.querySelector('table');
      expect(table).toHaveAttribute('id', 'table');
      expect(table).toHaveClass('w-100');
      
      const thead = container.querySelector('thead');
      expect(thead).toBeInTheDocument();
      expect(thead).toHaveClass('thead-dark');
      
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
    });

    it('should have proper CSS classes for responsiveness', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      expect(container.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(container.querySelector('.row')).toBeInTheDocument();
      expect(container.querySelector('.col-md-12')).toBeInTheDocument();
      expect(container.querySelector('.table-responsive')).toBeInTheDocument();
    });

    it('should have correct table cell styling', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      const cells = container.querySelectorAll('td.p-2');
      expect(cells.length).toBeGreaterThan(0);
      
      const textEndCells = container.querySelectorAll('td.text-end');
      expect(textEndCells.length).toBe(4); // All price cells should be right-aligned
    });
  });

  describe('Checkout Button Conditional Rendering', () => {
    it('should render checkout button when isCheckout is true', () => {
      render(<RdsCompOrderSummary isCheckout={true} />);
      
      const checkoutButton = screen.getByTestId('rds-button-checkout');
      expect(checkoutButton).toBeInTheDocument();
      expect(checkoutButton).toHaveTextContent('Checkout');
    });

    it('should not render checkout button when isCheckout is false', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      const checkoutButton = screen.queryByTestId('rds-button-checkout');
      expect(checkoutButton).not.toBeInTheDocument();
    });

    it('should render checkout button with correct props when isCheckout is true', () => {
      render(<RdsCompOrderSummary isCheckout={true} />);
      
      const checkoutButton = screen.getByTestId('rds-button-checkout');
      expect(checkoutButton).toHaveAttribute('type', 'submit');
      expect(checkoutButton).toHaveClass('btn', 'primary', 'w-100', 'btn-small', 'ms-2', 'me-2');
    });

    it('should have correct button container styling when checkout is enabled', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={true} />);
      
      const buttonContainer = container.querySelector('.d-flex.flex-column-reverse.flex-lg-row');
      expect(buttonContainer).toBeInTheDocument();
      expect(buttonContainer).toHaveClass(
        'd-flex',
        'flex-column-reverse',
        'flex-lg-row',
        'px-4',
        'flex-md-column-reverse',
        'flex-row',
        'flex-xl-row',
        'flex-xxl-row',
        'footer-buttons',
        'gap-2',
        'mt-3',
        'pb-3'
      );
    });
  });

  describe('Props Handling', () => {
    it('should handle isCheckout prop correctly', () => {
      const { rerender } = render(<RdsCompOrderSummary isCheckout={false} />);
      expect(screen.queryByTestId('rds-button-checkout')).not.toBeInTheDocument();
      
      rerender(<RdsCompOrderSummary isCheckout={true} />);
      expect(screen.getByTestId('rds-button-checkout')).toBeInTheDocument();
    });

    it('should maintain table content regardless of isCheckout prop', () => {
      const { rerender } = render(<RdsCompOrderSummary isCheckout={false} />);
      expect(screen.getByText('Order summary')).toBeInTheDocument();
      expect(screen.getByText('subtotal')).toBeInTheDocument();
      
      rerender(<RdsCompOrderSummary isCheckout={true} />);
      expect(screen.getByText('Order summary')).toBeInTheDocument();
      expect(screen.getByText('subtotal')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render table rows with correct border classes', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      const borderBottomRows = container.querySelectorAll('tr.border-bottom');
      expect(borderBottomRows).toHaveLength(4); // Header + 3 content rows with borders
    });

    it('should have bold formatting for header and total', () => {
      const { container } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      const boldElements = container.querySelectorAll('b');
      expect(boldElements.length).toBeGreaterThanOrEqual(2); // At least header and total
    });

    it('should render RdsLabel component in the total row', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      const label = screen.getByTestId('rds-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Order Total');
    });
  });

  describe('Accessibility', () => {
    it('should have proper table structure for screen readers', () => {
      render(<RdsCompOrderSummary isCheckout={false} />);
      
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      
      // Check for table rows
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('should have accessible button when checkout is enabled', () => {
      render(<RdsCompOrderSummary isCheckout={true} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName('Checkout');
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      expect(() => {
        rerender(<RdsCompOrderSummary isCheckout={true} />);
        rerender(<RdsCompOrderSummary isCheckout={false} />);
        rerender(<RdsCompOrderSummary isCheckout={true} />);
      }).not.toThrow();
    });

    it('should maintain consistent table content across re-renders', () => {
      const { rerender } = render(<RdsCompOrderSummary isCheckout={false} />);
      
      const initialText = screen.getByText('Order summary');
      expect(initialText).toBeInTheDocument();
      
      rerender(<RdsCompOrderSummary isCheckout={true} />);
      expect(screen.getByText('Order summary')).toBeInTheDocument();
    });
  });
});