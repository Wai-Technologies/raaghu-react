import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOrderConfirmation from '../src/rds-comp-order-confirmation/rds-comp-order-confirmation';

// Mock the RdsButton and RdsCompLabel components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, onClick, colorVariant, block, size, showLoadingSpinner, type, class: className }: any) => (
    <button
      data-testid={`rds-button-${label.toLowerCase().replace(/\s/g, '-')}`}
      onClick={onClick}
      className={`btn ${colorVariant} ${block ? 'w-100' : ''} btn-${size} ${className || ''}`}
      data-loading={showLoadingSpinner}
      type={type}
    >
      {label}
    </button>
  ),
  RdsCompLabel: ({ label }: any) => <span data-testid="rds-comp-label">{label}</span>,
}));

describe('RdsCompOrderConfirmation', () => {
  const defaultConfirmationProps = {
    order: 'confirmation',
    goToLogin: jest.fn(),
    goToInvoice: jest.fn(),
    increasePageCountHandler: jest.fn(),
  };

  const defaultSummaryProps = {
    order: 'summary',
    isCheckout: true,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Order Confirmation Mode', () => {
    it('should render order confirmation content when order is "confirmation"', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your purchase.')).toBeInTheDocument();
    });

    it('should render the main heading with correct styling', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const heading = screen.getByText('Order Confirmation');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass('text-start');
    });

    it('should render the success message with correct styling', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const successMessage = screen.getByText('Thank you for your purchase.');
      expect(successMessage).toBeInTheDocument();
      expect(successMessage.tagName).toBe('H6');
      expect(successMessage).toHaveClass('text-green', 'fs-5');
    });

    it('should render "GO TO LOGIN" button with correct props', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('GO TO LOGIN');
      expect(loginButton).toHaveClass('btn', 'primary', 'w-100', 'btn-medium');
      expect(loginButton).toHaveAttribute('data-loading', 'true');
    });

    it('should render "VIEW INVOICE" button with correct props', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      expect(invoiceButton).toBeInTheDocument();
      expect(invoiceButton).toHaveTextContent('VIEW INVOICE');
      expect(invoiceButton).toHaveClass('btn', 'outline-primary', 'w-100', 'btn-medium');
      expect(invoiceButton).toHaveAttribute('data-loading', 'true');
    });

    it('should call goToLogin when "GO TO LOGIN" button is clicked', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      fireEvent.click(loginButton);
      
      expect(defaultConfirmationProps.goToLogin).toHaveBeenCalledTimes(1);
    });

    it('should call goToInvoice when "VIEW INVOICE" button is clicked', () => {
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} />);
      
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      fireEvent.click(invoiceButton);
      
      expect(defaultConfirmationProps.goToInvoice).toHaveBeenCalledTimes(1);
    });
  });

  describe('Order Summary Mode', () => {
    it('should render order summary content when order is "summary"', () => {
      render(<RdsCompOrderConfirmation {...defaultSummaryProps} />);
      
      expect(screen.getByText('Order summary')).toBeInTheDocument();
      expect(screen.getByText('subtotal')).toBeInTheDocument();
      expect(screen.getByText('Shipping estimate')).toBeInTheDocument();
      expect(screen.getByText('Tax estimate')).toBeInTheDocument();
    });

    it('should render order summary table with correct structure', () => {
      render(<RdsCompOrderConfirmation {...defaultSummaryProps} />);
      
      const table = document.querySelector('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveAttribute('id', 'table');
      
      const thead = document.querySelector('thead');
      expect(thead).toBeInTheDocument();
      expect(thead).toHaveClass('thead-dark');
    });

    it('should render checkout button when isCheckout is true', () => {
      render(<RdsCompOrderConfirmation {...defaultSummaryProps} />);
      
      const checkoutButton = screen.getByTestId('rds-button-checkout');
      expect(checkoutButton).toBeInTheDocument();
      expect(checkoutButton).toHaveTextContent('Checkout');
      expect(checkoutButton).toHaveClass('btn', 'primary', 'w-100', 'btn-small');
    });

    it('should not render checkout button when isCheckout is false', () => {
      render(<RdsCompOrderConfirmation order="summary" isCheckout={false} />);
      
      const checkoutButton = screen.queryByTestId('rds-button-checkout');
      expect(checkoutButton).not.toBeInTheDocument();
    });

    it('should render RdsCompLabel for Order Total', () => {
      render(<RdsCompOrderConfirmation {...defaultSummaryProps} />);
      
      const orderTotalLabel = screen.getByTestId('rds-comp-label');
      expect(orderTotalLabel).toBeInTheDocument();
      expect(orderTotalLabel).toHaveTextContent('Order Total');
    });
  });

  describe('Component Behavior', () => {

    it('should handle undefined callback functions gracefully', () => {
      render(<RdsCompOrderConfirmation order="confirmation" goToLogin={undefined} goToInvoice={undefined} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      
      expect(() => {
        fireEvent.click(loginButton);
        fireEvent.click(invoiceButton);
      }).not.toThrow();
    });

    it('should handle null props gracefully', () => {
      expect(() => {
        render(<RdsCompOrderConfirmation order="confirmation" goToLogin={null} goToInvoice={null} />);
      }).not.toThrow();
    });

    it('should accept increasePageCountHandler prop', () => {
      const mockHandler = jest.fn();
      render(<RdsCompOrderConfirmation {...defaultConfirmationProps} increasePageCountHandler={mockHandler} />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
    });
  });
});