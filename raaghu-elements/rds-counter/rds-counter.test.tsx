import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCounter from './rds-counter';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-counter.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsCounter', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCounter />);
      const counter = container.querySelector('.rds-counter');
      expect(counter).toBeInTheDocument();
    });

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
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('should render input field with showInput=true', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render value as text when showInput=false', () => {
      render(<RdsCounter showInput={false} defaultValue={5} />);
      const typography = screen.getByText('5');
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Props and Default Values', () => {
    it('should set default value correctly', () => {
      render(<RdsCounter showInput={true} defaultValue={10} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('10');
    });

    it('should use controlled value when provided', () => {
      const { rerender } = render(
        <RdsCounter showInput={true} value={5} onChange={jest.fn()} />
      );
      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('5');

      rerender(<RdsCounter showInput={true} value={20} onChange={jest.fn()} />);
      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('20');
    });

    it('should apply correct size class', () => {
      const { container } = render(<RdsCounter size="small" />);
      expect(container.querySelector('.rds-counter--small')).toBeInTheDocument();
    });

    it('should apply correct variant class', () => {
      const { container } = render(<RdsCounter variant="compact" />);
      expect(container.querySelector('.rds-counter--compact')).toBeInTheDocument();
    });

    it('should apply correct layout class', () => {
      const { container } = render(<RdsCounter layout="bottom" />);
      expect(container.querySelector('.rds-counter--layout-bottom')).toBeInTheDocument();
    });

    it('should render placeholder correctly', () => {
      render(<RdsCounter showInput={true} placeholder="Enter value" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.placeholder).toBe('Enter value');
    });
  });

  describe('User Interactions', () => {
    it('should increment value on increment button click', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={0} max={10} />);
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('6');
    });

    it('should decrement value on decrement button click', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={0} max={10} />);
      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('4');
    });

    it('should respect step value on increment', () => {
      render(<RdsCounter showInput={true} defaultValue={0} step={5} max={100} />);
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('5');
    });

    it('should respect step value on decrement', () => {
      render(<RdsCounter showInput={true} defaultValue={10} step={3} min={0} />);
      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('7');
    });

    it('should handle input change events', () => {
      render(<RdsCounter showInput={true} min={0} max={100} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '42' } });

      expect(input.value).toBe('42');
    });

    it('should clear input when empty string is entered', () => {
      render(<RdsCounter showInput={true} defaultValue={5} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '' } });

      expect(input.value).toBe('');
    });

    it('should not accept invalid input (non-numeric)', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={0} max={100} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'abc' } });

      expect(input.value).toBe('5');
    });
  });

  describe('Min and Max Constraints', () => {
    it('should not decrement below minimum value', () => {
      render(<RdsCounter showInput={true} defaultValue={0} min={0} />);
      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('0');
    });

    it('should not increment above maximum value', () => {
      render(<RdsCounter showInput={true} defaultValue={10} max={10} />);
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('10');
    });

    it('should reject input value below minimum', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={5} max={10} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '3' } });

      expect(input.value).toBe('5');
    });

    it('should reject input value above maximum', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={0} max={10} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '15' } });

      expect(input.value).toBe('5');
    });

    it('should accept valid input within min and max range', () => {
      render(<RdsCounter showInput={true} defaultValue={5} min={0} max={100} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '50' } });

      expect(input.value).toBe('50');
    });
  });

  describe('Disabled State', () => {
    it('should disable buttons when disabled prop is true', () => {
      render(<RdsCounter disabled={true} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it('should disable input when disabled prop is true', () => {
      render(<RdsCounter showInput={true} disabled={true} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should apply disabled class to container', () => {
      const { container } = render(<RdsCounter disabled={true} />);
      expect(container.querySelector('.rds-counter--disabled')).toBeInTheDocument();
    });

    it('should respect state="disabled" prop', () => {
      render(<RdsCounter state="disabled" />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it('should disable decrement button when at minimum value', () => {
      render(<RdsCounter defaultValue={0} min={0} />);
      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];
      expect(decrementButton).toBeDisabled();
    });

    it('should disable increment button when at maximum value', () => {
      render(<RdsCounter defaultValue={10} max={10} />);
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];
      expect(incrementButton).toBeDisabled();
    });
  });

  describe('Controlled Component', () => {
    it('should call onChange when value changes via button click', () => {
      const handleChange = jest.fn();
      render(
        <RdsCounter
          value={5}
          onChange={handleChange}
          min={0}
          max={10}
        />
      );
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      expect(handleChange).toHaveBeenCalledWith(6);
    });

    it('should call onChange when value changes via input', () => {
      const handleChange = jest.fn();
      render(
        <RdsCounter
          showInput={true}
          value={5}
          onChange={handleChange}
          min={0}
          max={100}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '42' } });

      expect(handleChange).toHaveBeenCalledWith(42);
    });

    it('should handle clearing input in uncontrolled mode', () => {
      render(
        <RdsCounter
          showInput={true}
          defaultValue={5}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '' } });

      expect(input.value).toBe('');
    });
  });

  describe('Selected and Mandatory States', () => {
    it('should apply selected class when selected prop is true', () => {
      const { container } = render(<RdsCounter selected={true} />);
      expect(container.querySelector('.rds-counter--selected')).toBeInTheDocument();
    });

    it('should apply selected class when state="selected"', () => {
      const { container } = render(<RdsCounter state="selected" />);
      expect(container.querySelector('.rds-counter--selected')).toBeInTheDocument();
    });

    it('should show mandatory indicator when isMandatory is true', () => {
      const { container } = render(
        <RdsCounter titleText="Items" isMandatory={true} showTitle={true} />
      );
      const mandatory = container.querySelector('.rds-counter__mandatory');
      expect(mandatory).toBeInTheDocument();
      expect(mandatory).toHaveStyle('visibility: visible');
    });

    it('should hide mandatory indicator when isMandatory is false', () => {
      const { container } = render(
        <RdsCounter titleText="Items" isMandatory={false} showTitle={true} />
      );
      const mandatory = container.querySelector('.rds-counter__mandatory');
      expect(mandatory).toHaveStyle('visibility: hidden');
    });
  });

  describe('Layout Options', () => {
    it('should apply right-side layout class', () => {
      const { container } = render(<RdsCounter layout="right-side" />);
      expect(container.querySelector('.rds-counter--layout-right-side')).toBeInTheDocument();
    });

    it('should apply side-to-side layout class', () => {
      const { container } = render(<RdsCounter layout="side-to-side" />);
      expect(container.querySelector('.rds-counter--layout-side-to-side')).toBeInTheDocument();
    });

    it('should apply bottom layout class', () => {
      const { container } = render(<RdsCounter layout="bottom" />);
      expect(container.querySelector('.rds-counter--layout-bottom')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(<RdsCounter size="small" />);
      expect(container.querySelector('.rds-counter--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsCounter />);
      expect(container.querySelector('.rds-counter--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<RdsCounter size="large" />);
      expect(container.querySelector('.rds-counter--large')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should set aria-label for input element', () => {
      render(
        <RdsCounter showInput={true} titleText="Quantity" />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Quantity value');
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCounter />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should set generic aria-label when titleText is not provided', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'counter value');
    });

    it('should have inputMode numeric for input field', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('inputMode', 'numeric');
    });

    it('should have pattern attribute for input validation', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('pattern', '[0-9]*');
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom controlsClassName', () => {
      const { container } = render(
        <RdsCounter controlsClassName="custom-controls" />
      );
      const controls = container.querySelector('.rds-counter__controls');
      expect(controls).toHaveClass('custom-controls');
    });

    it('should have centered text alignment in input', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input).toHaveStyle('textAlign: center');
    });
  });

  describe('Variant Display', () => {
    it('should render with default variant', () => {
      const { container } = render(<RdsCounter />);
      expect(container.querySelector('.rds-counter--default')).toBeInTheDocument();
    });

    it('should render with compact variant', () => {
      const { container } = render(<RdsCounter variant="compact" />);
      expect(container.querySelector('.rds-counter--compact')).toBeInTheDocument();
    });

    it('should apply correct input class for variant', () => {
      const { container } = render(<RdsCounter showInput={true} variant="compact" />);
      expect(container.querySelector('.rds-counter__input--compact')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined current value gracefully', () => {
      render(<RdsCounter showInput={true} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should increment from min value when current value is undefined', () => {
      render(<RdsCounter showInput={true} min={0} />);
      const buttons = screen.getAllByRole('button');
      const incrementButton = buttons[1];

      fireEvent.click(incrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('1');
    });

    it('should handle decrement with undefined current value', () => {
      render(<RdsCounter showInput={true} min={0} max={10} />);
      const buttons = screen.getAllByRole('button');
      const decrementButton = buttons[0];

      fireEvent.click(decrementButton);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('0');
    });

    it('should trim whitespace from input', () => {
      render(<RdsCounter showInput={true} min={0} max={100} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '  42  ' } });

      expect(input.value).toBe('42');
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
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.click(screen.getByLabelText('Increase value'));
      expect(input.value).toBe('3');
      fireEvent.change(input, { target: { value: '7' } });
      expect(input.value).toBe('3');
    });

    it('follows value changes without onChange', () => {
      const { rerender } = render(<RdsCounter value={3} />);
      rerender(<RdsCounter value={8} />);
      expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('8');
    });
  });

  describe('G1-223: intermediate values while typing, clamp on blur', () => {
    it('allows typing "10" when min is 5', () => {
      render(<RdsCounter defaultValue={5} min={5} max={20} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '1' } });
      expect(input.value).toBe('1');
      fireEvent.change(input, { target: { value: '10' } });
      expect(input.value).toBe('10');
    });

    it('never emits out-of-range values while typing (controlled)', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} min={5} max={20} onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '1' } });
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.value).toBe('1');
      fireEvent.change(input, { target: { value: '12' } });
      expect(handleChange).toHaveBeenCalledWith(12);
    });

    it('clamps an intermediate value on blur and emits it when it changed', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={8} min={5} max={20} onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.blur(input);
      expect(handleChange).toHaveBeenCalledWith(5);
      expect(input.value).toBe('8');
    });

    it('does not emit on blur when the clamped value equals the current value', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={5} min={5} max={20} onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.blur(input);
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.value).toBe('5');
    });

    it('clamps on blur in uncontrolled mode', () => {
      render(<RdsCounter defaultValue={9} min={5} max={20} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '2' } });
      expect(input.value).toBe('2');
      fireEvent.blur(input);
      expect(input.value).toBe('5');
    });

    it('allows a leading minus sign when min is negative', () => {
      const handleChange = jest.fn();
      render(<RdsCounter value={0} min={-10} max={10} onChange={handleChange} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
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
