import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCounter from './rds-counter';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-counter.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

const textbox = () => screen.getByRole('textbox') as HTMLInputElement;
const inc = () => screen.getAllByRole('button')[1];
const dec = () => screen.getAllByRole('button')[0];
const hasClass = (props: any, cls: string) => {
  const { container } = render(<RdsCounter {...props} />);
  expect(container.querySelector(cls)).toBeInTheDocument();
};

describe('RdsCounter', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => hasClass({}, '.rds-counter'));

    it('should have correct displayName', () => {
      expect(RdsCounter.displayName).toBe('RdsCounter');
    });

    it('should render with default title text when provided', () => {
      render(<RdsCounter titleText="Items" />);
      expect(screen.getByText('Items')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(<RdsCounter titleText="Items" showTitle={false} />);
      expect(screen.queryByText('Items')).not.toBeInTheDocument();
    });

    it('should render increment and decrement buttons', () => {
      render(<RdsCounter />);
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render input field with showInput=true', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox()).toBeInTheDocument();
    });

    it('should render value as text when showInput=false', () => {
      render(<RdsCounter showInput={false} defaultValue={5} />);
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('Props and Default Values', () => {
    it('should set default value correctly', () => {
      render(<RdsCounter showInput={true} defaultValue={10} />);
      expect(textbox().value).toBe('10');
    });

    it('should use controlled value when provided', () => {
      const { rerender } = render(<RdsCounter showInput={true} value={5} onChange={jest.fn()} />);
      expect(textbox().value).toBe('5');
      rerender(<RdsCounter showInput={true} value={20} onChange={jest.fn()} />);
      expect(textbox().value).toBe('20');
    });

    it.each([
      [{ size: 'small' }, '.rds-counter--small'],
      [{ variant: 'compact' }, '.rds-counter--compact'],
      [{ layout: 'bottom' }, '.rds-counter--layout-bottom'],
      [{ layout: 'right-side' }, '.rds-counter--layout-right-side'],
      [{ layout: 'side-to-side' }, '.rds-counter--layout-side-to-side'],
      [{}, '.rds-counter--medium'],
      [{ size: 'large' }, '.rds-counter--large'],
      [{}, '.rds-counter--default'],
      [{ showInput: true, variant: 'compact' }, '.rds-counter__input--compact'],
      [{ disabled: true }, '.rds-counter--disabled'],
      [{ selected: true }, '.rds-counter--selected'],
      [{ state: 'selected' }, '.rds-counter--selected'],
    ])('applies class for %j -> %s', hasClass);

    it('should render placeholder correctly', () => {
      render(<RdsCounter showInput={true} placeholder="Enter value" />);
      expect(textbox().placeholder).toBe('Enter value');
    });
  });

  describe('User Interactions', () => {
    it.each([
      ['increment', { defaultValue: 5, min: 0, max: 10 }, inc, '6'],
      ['decrement', { defaultValue: 5, min: 0, max: 10 }, dec, '4'],
      ['step increment', { defaultValue: 0, step: 5, max: 100 }, inc, '5'],
      ['step decrement', { defaultValue: 10, step: 3, min: 0 }, dec, '7'],
      ['not below min', { defaultValue: 0, min: 0 }, dec, '0'],
      ['not above max', { defaultValue: 10, max: 10 }, inc, '10'],
      ['increment from undefined', { min: 0 }, inc, '1'],
      ['decrement from undefined', { min: 0, max: 10 }, dec, '0'],
    ])('button click: %s', (_n, props, btn, expected) => {
      render(<RdsCounter showInput={true} {...props} />);
      fireEvent.click(btn());
      expect(textbox().value).toBe(expected);
    });

    it.each([
      ['42', {}, '42'],
      ['', { defaultValue: 5 }, ''],
      ['abc', { defaultValue: 5, min: 0, max: 100 }, '5'],
      ['3', { defaultValue: 5, min: 5, max: 10 }, '5'],
      ['15', { defaultValue: 5, min: 0, max: 10 }, '5'],
      ['50', { defaultValue: 5, min: 0, max: 100 }, '50'],
      ['  42  ', { min: 0, max: 100 }, '42'],
    ])('input change %j with %j gives %j', (entered, props, expected) => {
      render(<RdsCounter showInput={true} min={0} max={100} {...props} />);
      fireEvent.change(textbox(), { target: { value: entered } });
      expect(textbox().value).toBe(expected);
    });
  });

  describe('Disabled State', () => {
    it.each([{ disabled: true }, { state: 'disabled' }])('disables buttons for %j', (props) => {
      render(<RdsCounter {...(props as any)} />);
      screen.getAllByRole('button').forEach(button => expect(button).toBeDisabled());
    });

    it('should disable input when disabled prop is true', () => {
      render(<RdsCounter showInput={true} disabled={true} />);
      expect(textbox()).toBeDisabled();
    });

    it('should disable decrement button when at minimum value', () => {
      render(<RdsCounter defaultValue={0} min={0} />);
      expect(dec()).toBeDisabled();
    });

    it('should disable increment button when at maximum value', () => {
      render(<RdsCounter defaultValue={10} max={10} />);
      expect(inc()).toBeDisabled();
    });
  });

  describe('Controlled Component', () => {
    it('should call onChange when value changes via button click', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} onChange={handleChange} min={0} max={10} />);
      fireEvent.click(inc());
      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('should call onChange when value changes via input', () => {
      const handleChange = jest.fn();
      render(<RdsCounter showInput={true} value={5} onChange={handleChange} min={0} max={100} />);
      fireEvent.change(textbox(), { target: { value: '42' } });
      expect(handleChange).toHaveBeenCalledWith(42);
    });
  });

  describe('Mandatory State', () => {
    it('should show mandatory indicator when isMandatory is true', () => {
      const { container } = render(<RdsCounter titleText="Items" isMandatory={true} showTitle={true} />);
      const mandatory = container.querySelector('.rds-counter__mandatory');
      expect(mandatory).toBeInTheDocument();
      expect(mandatory).toHaveStyle('visibility: visible');
    });

    it('should hide mandatory indicator when isMandatory is false', () => {
      const { container } = render(<RdsCounter titleText="Items" isMandatory={false} showTitle={true} />);
      expect(container.querySelector('.rds-counter__mandatory')).toHaveStyle('visibility: hidden');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-label for input element', () => {
      render(<RdsCounter showInput={true} titleText="Quantity" />);
      expect(textbox()).toHaveAttribute('aria-label', 'Quantity value');
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCounter />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should set generic aria-label when titleText is not provided', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox()).toHaveAttribute('aria-label', 'counter value');
    });

    it('should have inputMode numeric for input field', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox()).toHaveAttribute('inputMode', 'numeric');
    });

    it('should have pattern attribute for input validation', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox()).toHaveAttribute('pattern', '[0-9]*');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom controlsClassName', () => {
      const { container } = render(<RdsCounter controlsClassName="custom-controls" />);
      expect(container.querySelector('.rds-counter__controls')).toHaveClass('custom-controls');
    });

    it('should have centered text alignment in input', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox()).toHaveStyle('textAlign: center');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined current value gracefully', () => {
      render(<RdsCounter showInput={true} />);
      expect(textbox().value).toBe('');
    });

    it('should display placeholder when value is undefined', () => {
      render(<RdsCounter showInput={false} placeholder="N/A" />);
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  describe('G1-222: controlled when value is set', () => {
    it('treats value without onChange as read-only', () => {
      render(<RdsCounter value={3} min={0} max={10} />);
      const input = textbox();
      fireEvent.click(screen.getByLabelText('Increase value'));
      expect(input.value).toBe('3');
      fireEvent.change(input, { target: { value: '7' } });
      expect(input.value).toBe('3');
    });

    it('follows value changes without onChange', () => {
      const { rerender } = render(<RdsCounter value={3} />);
      rerender(<RdsCounter value={8} />);
      expect(textbox().value).toBe('8');
    });
  });

  describe('G1-223: intermediate values while typing, clamp on blur', () => {
    it('allows typing "10" when min is 5', () => {
      render(<RdsCounter defaultValue={5} min={5} max={20} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '1' } });
      expect(input.value).toBe('1');
      fireEvent.change(input, { target: { value: '10' } });
      expect(input.value).toBe('10');
    });

    it('never emits out-of-range values while typing (controlled)', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} min={5} max={20} onChange={handleChange} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '1' } });
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.value).toBe('1');
      fireEvent.change(input, { target: { value: '12' } });
      expect(handleChange).toHaveBeenCalledWith(12);
    });

    it('clamps an intermediate value on blur and emits it when it changed', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={8} min={5} max={20} onChange={handleChange} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith(5);
      expect(input.value).toBe('8');
    });

    it('does not emit on blur when the clamped value equals the current value', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} min={5} max={20} onChange={handleChange} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.blur(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.value).toBe('5');
    });

    it('clamps on blur in uncontrolled mode', () => {
      render(<RdsCounter defaultValue={9} min={5} max={20} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '2' } });
      expect(input.value).toBe('2');
      fireEvent.blur(input);
      expect(input.value).toBe('5');
    });

    it('allows a leading minus sign when min is negative', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={0} min={-10} max={10} onChange={handleChange} />);
      const input = textbox();
      fireEvent.change(input, { target: { value: '-' } });
      expect(input.value).toBe('-');
      fireEvent.change(input, { target: { value: '-3' } });
      expect(handleChange).toHaveBeenCalledWith(-3);
    });
  });

  describe('G1-224: root props forwarding', () => {
    it('forwards className, sx, ref and rest props to the root', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(
        <RdsCounter ref={ref} className="extra" id="ctr" data-testid="root" sx={{ marginTop: '7px' }} />
      );
      const root = container.firstElementChild as HTMLElement;
      expect(root).toHaveClass('rds-counter', 'rds-counter--default', 'extra');
      expect(root).toHaveAttribute('id', 'ctr');
      expect(root).toHaveAttribute('data-testid', 'root');
      expect(root).toHaveStyle('margin-top: 7px');
      expect(ref.current).toBe(root);
    });
  });

  describe('G1-226: label replaces titleText', () => {
    it('renders label and links it to the input', () => {
      render(<RdsCounter label="Guests" />);
      const labelEl = screen.getByText('Guests');
      const input = screen.getByRole('textbox');
      expect(labelEl.tagName).toBe('LABEL');
      expect(labelEl).toHaveAttribute('for', input.id);
      expect(input).toHaveAttribute('aria-label', 'Guests value');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('keeps titleText working with a deprecation warning; label wins', () => {
      render(<RdsCounter titleText="Old" label="New" />);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.queryByText('Old')).not.toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCounter', 'titleText', '`label`');
    });

    it('does not render the label as <label> when there is no input', () => {
      render(<RdsCounter label="Score" showInput={false} />);
      expect(screen.getByText('Score').tagName).not.toBe('LABEL');
    });
  });

  describe('G1-227: required replaces isMandatory', () => {
    it('shows the asterisk and sets aria-required', () => {
      const { container } = render(<RdsCounter label="Items" required />);
      expect(container.querySelector('.rds-counter__mandatory')).toHaveStyle('visibility: visible');
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('renders isMandatory identically and warns', () => {
      const { container } = render(<RdsCounter label="Items" isMandatory />);
      expect(container.querySelector('.rds-counter__mandatory')).toHaveStyle('visibility: visible');
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCounter', 'isMandatory', '`required`');
    });

    it('required wins over isMandatory', () => {
      const { container } = render(<RdsCounter label="Items" required={false} isMandatory />);
      expect(container.querySelector('.rds-counter__mandatory')).toHaveStyle('visibility: hidden');
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-required');
    });
  });

  describe('G1-229: keyboard stepping', () => {
    it('ArrowUp/ArrowDown step the value within range', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} min={0} max={6} step={1} onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(handleChange).toHaveBeenLastCalledWith(6);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(handleChange).toHaveBeenLastCalledWith(4);
    });

    it('does not step past max/min', () => {
      const handleChange = jest.fn();
      const { rerender } = render(<RdsCounter value={6} min={0} max={6} onChange={handleChange} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowUp' });
      rerender(<RdsCounter value={0} min={0} max={6} onChange={handleChange} />);
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowDown' });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('keeps labelled +/- buttons', () => {
      render(<RdsCounter />);
      expect(screen.getByLabelText('Increase value')).toBeInTheDocument();
      expect(screen.getByLabelText('Decrease value')).toBeInTheDocument();
    });
  });

  describe('G1-230: infinite bounds', () => {
    it('omits min/max attributes when infinite and keeps finite bounds', () => {
      const { rerender } = render(<RdsCounter />);
      let input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('max');
      expect(input).toHaveAttribute('min', '0');
      rerender(<RdsCounter min={-Infinity} max={9} />);
      input = screen.getByRole('textbox');
      expect(input).not.toHaveAttribute('min');
      expect(input).toHaveAttribute('max', '9');
    });
  });

  it('has no axe violations with label and required', async () => {
    const { container } = render(<RdsCounter label="Guests" required />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('RdsCounter additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('applies slotProps.controls and warns for controlsClassName', () => {
    const { container } = render(
      <RdsCounter controlsClassName="old" slotProps={{ controls: { className: 'new', id: 'ctl' } }} />
    );
    const controls = container.querySelector('.rds-counter__controls');
    expect(controls).toHaveClass('old', 'new');
    expect(controls).toHaveAttribute('id', 'ctl');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCounter', 'controlsClassName', '`slotProps.controls.className`');
  });
});
