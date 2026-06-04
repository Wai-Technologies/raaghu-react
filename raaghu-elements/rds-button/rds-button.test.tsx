import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsButton from './rds-button';

describe('RdsButton', () => {
  it('renders with text', () => {
    render(<RdsButton text="Test Button" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders with children when no text provided', () => {
    render(<RdsButton>Child Content</RdsButton>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<RdsButton text="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when loading', () => {
    render(<RdsButton text="Loading" isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables button when disabled prop is true', () => {
    render(<RdsButton text="Disabled" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies correct variant styles', () => {
  render(<RdsButton text="Primary" style="filled" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');
  });

  it('applies correct size', () => {
    render(<RdsButton text="Large" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('has proper accessibility attributes', () => {
    render(<RdsButton text="Accessible Button" aria-label="Custom aria label" />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('has no axe accessibility violations', async () => {
    const { container } = render(<RdsButton text="Axe Test Button" color="primary" style="filled" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
