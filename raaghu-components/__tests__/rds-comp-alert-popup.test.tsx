import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompAlertPopup from '../src/rds-comp-alert-popup/rds-comp-alert-popup';

// Define interfaces for mock components
interface RdsCompIconProps {
  name: string;
  colorVariant: string;
  height?: string;
  width?: string;
  classes?: string;
  fill?: boolean;
  stroke?: boolean;
}

interface RdsButtonProps {
  label: string;
  colorVariant: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isOutline?: boolean;
  class?: string;
  size?: string;
  type?: "submit" | "reset" | "button";
  tooltipTitle?: string;
  databsdismiss?: string;
  'aria-label'?: string;
}

interface RdsLabelProps {
  label: string;
  class?: string;
}

// Mock the child components
jest.mock('../src/rds-elements', () => ({
  RdsModal: ({ children, modalId, ...props }: { children: React.ReactNode; modalId: string; [key: string]: any }) => (
    <div data-testid="rds-modal" id={modalId} data-modal-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
  RdsCompIcon: ({ name, colorVariant, height, width, classes, fill, stroke, ...props }: RdsCompIconProps) => (
    <div 
      data-testid="rds-icon" 
      data-icon-name={name} 
      data-color-variant={colorVariant}
      data-height={height}
      data-width={width}
      data-classes={classes}
      data-fill={fill ? 'true' : 'false'}
      data-stroke={stroke ? 'true' : 'false'}
      data-props={JSON.stringify(props)}
    >
      Icon: {name}
    </div>
  ),
  RdsButton: ({ label, colorVariant, onClick, isOutline, class: className, ...props }: RdsButtonProps) => (
    <button
      data-testid={`rds-button-${label}`}
      data-color-variant={colorVariant}
      data-is-outline={isOutline ? 'true' : 'false'}
      data-class={className}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  ),
  RdsLabel: ({ label, class: className, ...props }: RdsLabelProps) => (
    <span 
      data-testid="rds-label" 
      data-class={className}
      data-props={JSON.stringify(props)}
    >
      {label}
    </span>
  ),
}));

describe('RdsCompAlertPopup Component', () => {
  const defaultProps = {
    alertID: 'test-alert',
    onSuccess: jest.fn(),
    onCancel: jest.fn(),
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Check default rendering with default type
  it('renders correctly with default props', () => {
    render(<RdsCompAlertPopup {...defaultProps} />);
    
    // Check if modal is rendered
    expect(screen.getByTestId('rds-modal')).toBeInTheDocument();
    
    // Check icon
    const icon = screen.getByTestId('rds-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-icon-name', 'delete');
    expect(icon).toHaveAttribute('data-color-variant', 'danger');
    
    // Check confirmation text
    const labels = screen.getAllByTestId('rds-label');
    expect(labels[0]).toHaveTextContent('Are You Sure?');
    expect(labels[1]).toHaveTextContent('This record will be deleted permanently.');
    
    // Check buttons
    expect(screen.getByTestId('rds-button-Cancel')).toBeInTheDocument();
    expect(screen.getByTestId('rds-button-Delete')).toBeInTheDocument();
  });

  // Test 2: Check custom rendering with custom props
  it('renders correctly with custom props', () => {
    const customProps = {
      ...defaultProps,
      iconUrl: 'warning',
      colorVariant: 'warning',
      alertConfirmation: 'Custom Confirmation',
      messageAlert: 'Custom Message',
      cancelBtnLabel: 'No',
      deleteBtnLabel: 'Yes'
    };
    
    render(<RdsCompAlertPopup {...customProps} />);
    
    // Check icon
    const icon = screen.getByTestId('rds-icon');
    expect(icon).toHaveAttribute('data-icon-name', 'warning');
    expect(icon).toHaveAttribute('data-color-variant', 'warning');
    
    // Check confirmation text
    const labels = screen.getAllByTestId('rds-label');
    expect(labels[0]).toHaveTextContent('Custom Confirmation');
    expect(labels[1]).toHaveTextContent('Custom Message');
    
    // Check buttons
    expect(screen.getByTestId('rds-button-No')).toBeInTheDocument();
    expect(screen.getByTestId('rds-button-Yes')).toBeInTheDocument();
  });

  // Test 3: Check confirm type rendering
  it('renders correctly with confirm type', () => {
    const confirmProps = {
      ...defaultProps,
      type: 'confirm',
      buttonlabel: 'Confirm',
      colorVariant: 'primary'
    };
    
    render(<RdsCompAlertPopup {...confirmProps} />);
    
    // Check if only one button is present for confirm type
    expect(screen.getByTestId('rds-button-Confirm')).toBeInTheDocument();
    expect(screen.queryByTestId('rds-button-Cancel')).not.toBeInTheDocument();
    
    // Check if icon size is larger for confirm type
    const icon = screen.getByTestId('rds-icon');
    expect(icon).toHaveAttribute('data-height', '65px');
    expect(icon).toHaveAttribute('data-width', '65px');
  });

  // Test 4: Check transfer_ownership type rendering
  it('renders correctly with transfer_ownership type', () => {
    const transferProps = {
      ...defaultProps,
      type: 'transfer_ownership',
      buttonlabel: 'Transfer',
      colorVariant: 'primary'
    };
    
    render(<RdsCompAlertPopup {...transferProps} />);
    
    // Check buttons for transfer type
    expect(screen.getByTestId('rds-button-Cancel')).toBeInTheDocument();
    expect(screen.getByTestId('rds-button-Transfer')).toBeInTheDocument();
    
    // Check button colors
    expect(screen.getByTestId('rds-button-Transfer')).toHaveAttribute('data-color-variant', 'primary');
    expect(screen.getByTestId('rds-button-Cancel')).toHaveAttribute('data-color-variant', 'primary');
  });

  // Test 5: Check otpvalidation type rendering
  it('renders correctly with otpvalidation type', () => {
    const otpProps = {
      ...defaultProps,
      type: 'otpvalidation',
      children: <div data-testid="otp-content">OTP Content</div>
    };
    
    render(<RdsCompAlertPopup {...otpProps} />);
    
    // Check for the absence of icons and buttons
    expect(screen.queryByTestId('rds-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rds-button-Cancel')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rds-button-Delete')).not.toBeInTheDocument();
    
    // Check if children are rendered
    expect(screen.getByTestId('otp-content')).toBeInTheDocument();
  });

  // Test 6: Check button click handlers
  it('calls the appropriate handlers when buttons are clicked', () => {
    render(<RdsCompAlertPopup {...defaultProps} />);
    
    // Click cancel button
    fireEvent.click(screen.getByTestId('rds-button-Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    
    // Click delete button
    fireEvent.click(screen.getByTestId('rds-button-Delete'));
    expect(defaultProps.onSuccess).toHaveBeenCalledTimes(1);
  });

  // Test 7: Check custom children rendering
  it('renders children correctly', () => {
    const childrenProps = {
      ...defaultProps,
      children: <div data-testid="custom-children">Custom Content</div>
    };
    
    render(<RdsCompAlertPopup {...childrenProps} />);
    
    // Check if children are rendered
    expect(screen.getByTestId('custom-children')).toBeInTheDocument();
  });
});