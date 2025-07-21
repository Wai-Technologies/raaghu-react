import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsButton from './rds-button';

describe('RdsButton', () => {
  it('renders with label', () => {
    render(<RdsButton label="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with children when no label provided', () => {
    render(<RdsButton>Child Content</RdsButton>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<RdsButton label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    render(<RdsButton label="Loading" isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when disabled prop is true', () => {
    render(<RdsButton label="Disabled" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
    render(<RdsButton label="Primary" variant="contained" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');
  });

  it('applies correct size', () => {
    render(<RdsButton label="Large" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('has proper accessibility attributes', () => {
    render(<RdsButton label="Accessible Button" aria-label="Custom aria label" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom aria label');
  });
});
