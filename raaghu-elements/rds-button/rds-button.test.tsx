import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsButton from './rds-button';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

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
  render(<RdsButton text="Primary" variant="filled" />);
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
    const { container } = render(<RdsButton text="Axe Test Button" color="primary" variant="filled" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('RdsButton — keyboard navigation', () => {
  it('is focusable via Tab', async () => {
    render(<RdsButton text="Focus Me" />);
    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('activates on Enter key', async () => {
    const handleClick = jest.fn();
    render(<RdsButton text="Press Enter" onClick={handleClick} />);
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('activates on Space key', async () => {
    const handleClick = jest.fn();
    render(<RdsButton text="Press Space" onClick={handleClick} />);
    screen.getByRole('button').focus();
    await userEvent.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not activate when disabled', async () => {
    const handleClick = jest.fn();
    render(<RdsButton text="Disabled" disabled onClick={handleClick} />);
    screen.getByRole('button').focus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is not reachable via Tab when disabled', async () => {
    render(<RdsButton text="Disabled Tab" disabled />);
    await userEvent.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });
});

describe('RdsButton audit fixes', () => {
  it('applies the selected treatment when selected is true', () => {
    const { rerender } = render(<RdsButton selected={false}>A</RdsButton>);
    expect(screen.getByRole('button')).not.toHaveClass('rds-button--selected');
    rerender(<RdsButton selected>A</RdsButton>);
    expect(screen.getByRole('button')).toHaveClass('rds-button--selected');
  });

  it('keeps its own classes when a consumer passes className (G1-134)', () => {
    render(<RdsButton className="my-button">Save</RdsButton>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('rds-button');
    expect(button).toHaveClass('my-button');
  });

  it('converts theme-scaled sx numbers the way sx does instead of raw px (G1-136)', () => {
    render(<RdsButton sx={{ padding: 2, minWidth: '120px' }}>Pad</RdsButton>);
    const button = screen.getByRole('button', { name: 'Pad' });
    expect(button.style.padding).toBe('16px');
    expect(button.style.minWidth).toBe('120px');
  });

  it('does not copy shorthands or nested selectors into the inline style (G1-136)', () => {
    render(<RdsButton sx={{ mr: 2, '&:hover': { color: 'red' } }}>Short</RdsButton>);
    const button = screen.getByRole('button', { name: 'Short' });
    expect(button.getAttribute('style')).not.toContain('mr');
    expect(button.getAttribute('style')).not.toContain('hover');
  });

  it('accepts an array sx without crashing (G1-136)', () => {
    render(<RdsButton sx={[{ m: 1 }, { p: 1 }]}>Array</RdsButton>);
    expect(screen.getByRole('button', { name: 'Array' })).toBeInTheDocument();
  });

  it('supports loading as the replacement for isLoading (G1-138)', () => {
    render(<RdsButton loading>Busy</RdsButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('rds-button__loading');
  });

  it('renders MUI startIcon and endIcon (G1-139/G1-140)', () => {
    render(
      <RdsButton startIcon={<span data-testid="start" />} endIcon={<span data-testid="end" />}>
        Icons
      </RdsButton>
    );
    expect(screen.getByTestId('start')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  it('gives icon-only buttons an accessible name from text (G1-144)', () => {
    render(<RdsButton layout="icon-only" showLeftIcon changeLeftIcon="add" text="Add item" />);
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
  });

  it('keeps the Raaghu icon props working', () => {
    const { container } = render(<RdsButton showLeftIcon changeLeftIcon="delete" text="Remove" />);
    expect(container.querySelector('.MuiButton-startIcon svg')).toBeInTheDocument();
    expect(container.querySelector('.MuiButton-root')).toHaveClass('rds-button--has-icon');
  });

  it('reports deprecated props to the deprecation helper', () => {
    render(<RdsButton text="Old" isLoading={false} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButton', 'text', expect.any(String));
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButton', 'isLoading', expect.any(String));
  });

  it('does not warn for the supported API', () => {
    (warnDeprecatedProp as jest.Mock).mockClear();
    render(
      <RdsButton variant="filled" selected layout="icon+text" showLeftIcon changeLeftIcon="add" showRightIcon changeRightIcon="save">
        New
      </RdsButton>
    );
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('warns when a variant string is passed to deprecated style', () => {
    render(<RdsButton style="filled">Old</RdsButton>);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButton', 'style', '`variant`');
  });
});
