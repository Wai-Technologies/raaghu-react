import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCookiesSection from '../src/rds-comp-cookies-section/rds-comp-cookies-section';

// Mock the RdsButton and RdsCompIcon components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    type, 
    colorVariant, 
    block, 
    dataTestId, 
    size,
    databsdismiss,
    tooltipTitle,
    class: className,
    ...rest 
  }: any) => (
    <button
      data-testid={dataTestId || `button-${label.toLowerCase()}`}
      type={type}
      className={`btn btn-${colorVariant} ${block ? 'btn-block' : ''} ${className || ''}`}
      {...rest}
    >
      {label}
    </button>
  ),
  RdsCompIcon: ({ 
    name,
    fill,
    stroke,
    height,
    width,
    colorVariant,
    ...rest 
  }: any) => (
    <div
      data-testid={`icon-${name}`}
      style={{ 
        height, 
        width,
        fill: fill ? 'currentColor' : 'none',
        stroke: stroke ? 'currentColor' : 'none' 
      }}
      className={`icon-${colorVariant}`}
      {...rest}
    >
      {name}
    </div>
  )
}));

describe('RdsCompCookiesSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<RdsCompCookiesSection />);
    expect(container).toBeTruthy();
  });

  it('displays the cookie alert message', () => {
    render(<RdsCompCookiesSection />);
    
    const alertMessage = "This website uses cookies to ensure you get the best experience on our website.";
    expect(screen.getByText(alertMessage)).toBeInTheDocument();
  });

  it('renders the cookie icon', () => {
    render(<RdsCompCookiesSection />);
    
    // Check if the cookie icon is present
    const cookieIcon = screen.getByTestId('icon-cookies');
    expect(cookieIcon).toBeInTheDocument();
    expect(cookieIcon).toHaveClass('icon-primary');
  });

  it('renders close button', () => {
    render(<RdsCompCookiesSection />);
    
    // Check if the close button is present
    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('btn-close');
  });

  it('renders a single Accept button when showDeclineButton is false', () => {
    render(<RdsCompCookiesSection showDeclineButton={false} />);
    
    // Check if the Accept button is present
    const acceptButton = screen.getByTestId('accept');
    expect(acceptButton).toBeInTheDocument();
    expect(acceptButton).toHaveTextContent('Accept');
    
    // Decline button should not be present
    expect(screen.queryByTestId('decline')).not.toBeInTheDocument();
  });

  it('renders both Accept and Decline buttons when showDeclineButton is true', () => {
    render(<RdsCompCookiesSection showDeclineButton={true} />);
    
    // Check if the Accept button is present
    const acceptButton = screen.getByTestId('show-accept');
    expect(acceptButton).toBeInTheDocument();
    expect(acceptButton).toHaveTextContent('Accept');
    
    // Check if the Decline button is present
    const declineButton = screen.getByTestId('decline');
    expect(declineButton).toBeInTheDocument();
    expect(declineButton).toHaveTextContent('Decline');
  });

  it('renders Accept button with correct styling when showDeclineButton is false', () => {
    render(<RdsCompCookiesSection showDeclineButton={false} />);
    
    const acceptButton = screen.getByTestId('accept');
    expect(acceptButton).toHaveClass('btn-primary');
    expect(acceptButton).not.toHaveClass('btn-block');
  });

  it('renders Accept button with correct styling when showDeclineButton is true', () => {
    render(<RdsCompCookiesSection showDeclineButton={true} />);
    
    const acceptButton = screen.getByTestId('show-accept');
    expect(acceptButton).toHaveClass('btn-primary');
    expect(acceptButton).toHaveClass('btn-block');
  });

  it('renders Decline button with correct styling', () => {
    render(<RdsCompCookiesSection showDeclineButton={true} />);
    
    const declineButton = screen.getByTestId('decline');
    expect(declineButton).toHaveClass('btn-outline-primary');
    expect(declineButton).toHaveClass('btn-block');
  });

  it('uses default showDeclineButton value when not provided', () => {
    render(<RdsCompCookiesSection />);
    
    // By default, showDeclineButton should be false, so only Accept button should be present
    expect(screen.getByTestId('accept')).toBeInTheDocument();
    expect(screen.queryByTestId('decline')).not.toBeInTheDocument();
  });

  it('renders the correct layout with columns', () => {
    const { container } = render(<RdsCompCookiesSection />);
    
    // Check if the layout columns are present
    const columns = container.querySelectorAll('.col-md-2, .col-md-6');
    expect(columns.length).toBe(2); // Should have 2 columns when showDeclineButton is false
  });

  it('renders the correct layout with columns when showDeclineButton is true', () => {
    const { container } = render(<RdsCompCookiesSection showDeclineButton={true} />);
    
    // Check if the layout columns are present
    const columns = container.querySelectorAll('.col-md-2, .col-md-6, .col-md-3');
    expect(columns.length).toBe(3); // Should have 3 columns when showDeclineButton is true
  });

  it('has the correct container styling', () => {
    const { container } = render(<RdsCompCookiesSection />);
    
    // Check if the alert container has the correct classes
    const alertContainer = container.querySelector('.alert.cookies');
    expect(alertContainer).toBeInTheDocument();
    expect(alertContainer).toHaveClass('shadow');
    expect(alertContainer).toHaveClass('w-100');
  });
});