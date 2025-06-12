import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOrderConfirmation from '../src/rds-comp-order-confirmation/rds-comp-order-confirmation';

// Mock the RdsButton component
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, onClick, colorVariant, block, size, showLoadingSpinner }: any) => (
    <button
      data-testid={`rds-button-${label.toLowerCase().replace(/\s/g, '-')}`}
      onClick={onClick}
      className={`btn ${colorVariant} ${block ? 'w-100' : ''} btn-${size}`}
      data-loading={showLoadingSpinner}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompOrderConfirmation', () => {
  const defaultProps = {
    goToLogin: jest.fn(),
    goToInvoice: jest.fn(),
    increasePageCountHandler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the component successfully', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your purchase.')).toBeInTheDocument();
    });

    it('should render the main heading with correct text', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const heading = screen.getByText('Order Confirmation');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
      expect(heading).toHaveClass('text-start');
    });

    it('should render the success message with correct styling', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const successMessage = screen.getByText('Thank you for your purchase.');
      expect(successMessage).toBeInTheDocument();
      expect(successMessage.tagName).toBe('H6');
      expect(successMessage).toHaveClass('text-green', 'fs-5');
    });

    it('should render video source with correct attributes', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const videoSource = document.querySelector('source');
      expect(videoSource).toBeInTheDocument();
      expect(videoSource).toHaveAttribute('src', './assets/payment-inprogress.mp4');
      expect(videoSource).toHaveAttribute('type', 'video/mp4');
    });
  });

  describe('Buttons', () => {
    it('should render "GO TO LOGIN" button with correct props', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveTextContent('GO TO LOGIN');
      expect(loginButton).toHaveClass('btn', 'primary', 'w-100', 'btn-medium');
      expect(loginButton).toHaveAttribute('data-loading', 'true');
    });

    it('should render "VIEW INVOICE" button with correct props', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      expect(invoiceButton).toBeInTheDocument();
      expect(invoiceButton).toHaveTextContent('VIEW INVOICE');
      expect(invoiceButton).toHaveClass('btn', 'outline-primary', 'w-100', 'btn-medium');
      expect(invoiceButton).toHaveAttribute('data-loading', 'true');
    });

    it('should call goToLogin when "GO TO LOGIN" button is clicked', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      fireEvent.click(loginButton);
      
      expect(defaultProps.goToLogin).toHaveBeenCalledTimes(1);
    });

    it('should call goToInvoice when "VIEW INVOICE" button is clicked', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      fireEvent.click(invoiceButton);
      
      expect(defaultProps.goToInvoice).toHaveBeenCalledTimes(1);
    });
  });

  describe('Props Handling', () => {
    it('should work without optional props', () => {
      render(<RdsCompOrderConfirmation />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your purchase.')).toBeInTheDocument();
    });

    it('should handle undefined callback functions gracefully', () => {
      render(<RdsCompOrderConfirmation goToLogin={undefined} goToInvoice={undefined} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      
      expect(() => {
        fireEvent.click(loginButton);
        fireEvent.click(invoiceButton);
      }).not.toThrow();
    });

    it('should accept increasePageCountHandler prop', () => {
      const mockHandler = jest.fn();
      render(<RdsCompOrderConfirmation increasePageCountHandler={mockHandler} />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('should have correct CSS classes for layout', () => {
      const { container } = render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const headerDiv = container.querySelector('.pb-3');
      expect(headerDiv).toBeInTheDocument();
      
      const videoContainer = container.querySelector('.my-4.py-5');
      expect(videoContainer).toBeInTheDocument();
      
      const buttonContainer = container.querySelector('.mb-4');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should have correct text alignment classes', () => {
      const { container } = render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const videoDiv = container.querySelector('.align-items-center.d-flex.justify-content-center.text-end');
      expect(videoDiv).toBeInTheDocument();
      
      const messageDiv = container.querySelector('.text-center');
      expect(messageDiv).toBeInTheDocument();
    });

    it('should render buttons in correct order', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('GO TO LOGIN');
      expect(buttons[1]).toHaveTextContent('VIEW INVOICE');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Order Confirmation');
      
      const subHeading = screen.getByRole('heading', { level: 6 });
      expect(subHeading).toHaveTextContent('Thank you for your purchase.');
    });

    it('should have accessible button elements', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).toHaveAccessibleName();
      });
    });
  });

  describe('Component Behavior', () => {
    it('should not crash when rendered multiple times', () => {
      const { rerender } = render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      
      rerender(<RdsCompOrderConfirmation {...defaultProps} />);
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
    });

    it('should handle rapid button clicks without issues', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      
      // Simulate rapid clicks
      fireEvent.click(loginButton);
      fireEvent.click(invoiceButton);
      fireEvent.click(loginButton);
      fireEvent.click(invoiceButton);
      
      expect(defaultProps.goToLogin).toHaveBeenCalledTimes(2);
      expect(defaultProps.goToInvoice).toHaveBeenCalledTimes(2);
    });
  });

  describe('Component State', () => {
    it('should maintain consistent UI state after interactions', () => {
      render(<RdsCompOrderConfirmation {...defaultProps} />);
      
      const loginButton = screen.getByTestId('rds-button-go-to-login');
      const invoiceButton = screen.getByTestId('rds-button-view-invoice');
      
      // Interact with buttons
      fireEvent.click(loginButton);
      fireEvent.click(invoiceButton);
      
      // UI should remain the same
      expect(screen.getByText('Order Confirmation')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your purchase.')).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(invoiceButton).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle null props gracefully', () => {
      expect(() => {
        render(<RdsCompOrderConfirmation goToLogin={null} goToInvoice={null} />);
      }).not.toThrow();
    });
  });
});