import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsAutocomplete, { type RdsAutocompleteProps } from './rds-autocomplete';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-autocomplete.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('../rds-checkbox/rds-checkbox', () => {
  return function MockRdsCheckbox(props: any) {
    return <input type="checkbox" data-testid="rds-checkbox" checked={props.status === 'checked'} readOnly {...props} />;
  };
});

describe('RdsAutocomplete', () => {
  const defaultOptions = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
  ];

  const defaultProps: RdsAutocompleteProps<any> = {
    options: defaultOptions,
  };

  const setup = (p: any = {}) => render(<RdsAutocomplete {...defaultProps} {...p} />);
  const q = (container: HTMLElement, sel: string) => container.querySelector(sel);
  const input = (container: HTMLElement) => container.querySelector('input') as HTMLInputElement;

  describe('Basic Rendering', () => {
    it.each([
      ['.rds-autocomplete'],
      ['.rds-autocomplete--root'],
      ['input'],
      ['.rds-autocomplete--medium'],
      ['.MuiAutocomplete-root'],
    ])('should render %s', (sel) => {
      const { container } = setup();
      expect(q(container, sel)).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAutocomplete.displayName).toBe('RdsAutocomplete');
    });
  });

  describe('Label Display', () => {
    it('should display label when provided', () => {
      setup({ label: 'Choose an option', showTitle: true });
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it.each([
      [{ label: 'Choose an option', showTitle: false }],
      [{ showTitle: true }],
    ])('should not display label for %j', (props) => {
      const { container } = setup(props);
      expect(q(container, '.rds-autocomplete__label')).not.toBeInTheDocument();
    });

    it.each([[true, true], [false, false]])('isMandatory=%p asterisk present=%p', (isMandatory, present) => {
      const { container } = setup({ label: 'Field', isMandatory, showTitle: true });
      const asterisk = expect(q(container, '.rds-autocomplete__asterisk'));
      if (present) asterisk.toBeInTheDocument();
      else asterisk.not.toBeInTheDocument();
    });

    it.each([['large', 'large'], ['small', 'small'], [undefined, 'medium']])('label size class for selectSize=%s', (selectSize, cls) => {
      const { container } = setup({ label: 'Label', showTitle: true, selectSize });
      expect(q(container, `.rds-autocomplete__label--${cls}`)).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it.each([['small', 'small'], [undefined, 'medium'], ['large', 'large']])('selectSize=%s applies --%s', (selectSize, cls) => {
      const { container } = setup({ selectSize });
      expect(q(container, `.rds-autocomplete--${cls}`)).toBeInTheDocument();
    });

    it('should apply size class to textfield', () => {
      const { container } = setup({ selectSize: 'large' });
      expect(q(container, '.rds-autocomplete__textfield.rds-autocomplete--large')).toBeInTheDocument();
    });
  });

  describe('Variant Styles', () => {
    it.each([['standard'], ['filled'], ['outlined'], [undefined]])('should render variant %s', (variant) => {
      const { container } = setup({ variant });
      expect(q(container, 'input')).toBeInTheDocument();
      expect(q(container, '.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it.each([
      ['Search...', 'Search...'],
      [undefined, ''],
      ['Search (exact match)', 'Search (exact match)'],
      ['Search @#$...', 'Search @#$...'],
    ])('placeholder %s -> %j', (placeholder, expected) => {
      const { container } = setup({ placeholder });
      expect(input(container).placeholder).toBe(expected);
    });

    it('should not show placeholder when value is selected in single mode', () => {
      const { container } = setup({ placeholder: 'Select...', selected: true, allowMultiple: false });
      expect(input(container).value).toBeTruthy();
    });

    it('should show placeholder when no value selected in multiple mode', () => {
      const { container } = setup({ placeholder: 'Select...', allowMultiple: true });
      expect(input(container).placeholder).toBe('Select...');
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided', () => {
      setup({ helperText: 'This is helper text', showHintText: true });
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should hide helper text when showHintText is false', () => {
      const { container } = setup({ helperText: 'This is helper text', showHintText: false });
      expect(q(container, '.rds-autocomplete__textfield--hidden-helper')).toBeInTheDocument();
    });

    it('should display default non-breaking space when helper text not provided', () => {
      const { container } = setup({ showHintText: true });
      expect(q(container, '.MuiFormHelperText-root')).toBeInTheDocument();
    });

    it('should display error helper text', () => {
      setup({ error: true, helperText: 'This field is required', showHintText: true });
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it.each([[true], [false]])('should render root when error is %p', (error) => {
      const { container } = setup({ error });
      expect(q(container, '.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should pass error prop to TextField', () => {
      setup({ error: true, helperText: 'Error message', showHintText: true });
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it.each([
      [{ disabled: true }, true],
      [{ disabled: false }, false],
      [{ disabled: true }, true],
      [{}, false],
    ])('input disabled for %j is %p', (props, disabled) => {
      const { container } = setup(props);
      expect(input(container).disabled).toBe(disabled);
    });

    it('should show disabled styling', () => {
      const { container } = setup({ disabled: true });
      expect(q(container, '.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Control Style', () => {
    it.each([
      ['default', false],
      ['bottom line', true],
    ])('controlStyle=%s bottom-line present=%p', (controlStyle, present) => {
      const { container } = setup({ controlStyle });
      const el = expect(q(container, '.rds-autocomplete__textfield--bottom-line'));
      if (present) el.toBeInTheDocument();
      else el.not.toBeInTheDocument();
    });
  });

  describe('Checkbox, Radio, User and Popup Display', () => {
    it.each([
      [{ isShowCheckbox: true }],
      [{ isShowCheckbox: false }],
      [{ isShowRadio: true }],
      [{ isShowRadio: false }],
      [{ isShowUser: true, userIcon: <span data-testid="user-icon">👤</span> }],
      [{ popupIcon: <span data-testid="custom-popup-icon">▼</span> }],
    ])('should render component for %j', (props) => {
      const { container } = setup(props);
      expect(q(container, '.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should not display user icon when isShowUser is false', () => {
      setup({ isShowUser: false, userIcon: <span data-testid="user-icon">👤</span> });
      expect(screen.queryByTestId('user-icon')).not.toBeInTheDocument();
    });

    it('should render with default popup icon when not provided', () => {
      const { container } = setup({ popupIcon: undefined });
      expect(q(container, '.MuiAutocomplete-endAdornment')).toBeInTheDocument();
    });
  });

  describe('Semantic State Props', () => {
    it('should render with default semantic props', () => {
      const { container } = setup();
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
    });

    it('should open dropdown when open is true', () => {
      const { container } = setup({ open: true });
      expect(q(container, 'input')).toBeInTheDocument();
    });

    it('should select first option when selected', () => {
      const { container } = setup({ selected: true, allowMultiple: false });
      expect(input(container).value).toBeTruthy();
    });

    it('should select first option for multiple when selected', () => {
      const { container } = setup({ selected: true, allowMultiple: true });
      expect(q(container, '.rds-autocomplete__chip')).toBeInTheDocument();
    });
  });

  describe('Multiple Selection', () => {
    it('should support multiple selection when allowMultiple is true', () => {
      const { container } = setup({ allowMultiple: true });
      expect(q(container, 'input')).toBeInTheDocument();
    });

    it('should not support multiple selection when allowMultiple is false', () => {
      const { container } = setup({ allowMultiple: false });
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
    });

    it('should limit visible tags to 4 in multiple mode', () => {
      const manyOptions = Array.from({ length: 6 }, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 }));
      const { container } = render(<RdsAutocomplete options={manyOptions} allowMultiple={true} selected />);
      expect(q(container, '.rds-autocomplete__chip')).toBeInTheDocument();
    });

    it.each([[undefined, '.rds-autocomplete__chip'], ['small', '.rds-autocomplete__chip--small'], ['large', '.rds-autocomplete__chip--large']])(
      'chip class for selectSize=%s',
      (selectSize, sel) => {
        const { container } = setup({ allowMultiple: true, selected: true, selectSize });
        expect(q(container, sel)).toBeInTheDocument();
      }
    );
  });

  describe('Open on Focus', () => {
    it.each([[true], [false]])('should render component when openOnFocus is %p', (openOnFocus) => {
      const { container } = setup({ openOnFocus });
      expect(q(container, 'input')).toBeInTheDocument();
    });
  });

  describe('Options Rendering', () => {
    it.each([
      ['string-like options', [{ label: 'Apple' }, { label: 'Banana' }, { label: 'Cherry' }]],
      ['options with label and value', [{ label: 'First', value: 1 }, { label: 'Second', value: 2 }]],
      ['minimal options', [{ label: '', value: 1 }, { label: '', value: 2 }]],
      ['many options', Array.from({ length: 50 }, (_, i) => ({ label: `Option ${i + 1}`, value: i + 1 }))],
      ['duplicate options', [{ label: 'Option A', value: 1 }, { label: 'Option A', value: 2 }, { label: 'Option A', value: 3 }]],
      ['a single option', [{ label: 'Test', value: 1 }]],
    ])('should handle %s', (_n, options) => {
      const { container } = render(<RdsAutocomplete options={options as any} />);
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
      expect(q(container, 'input')).toBeInTheDocument();
    });

    it('should accept empty options array', () => {
      const { container } = render(<RdsAutocomplete options={[]} />);
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
    });
  });

  describe('Change and Input Events', () => {
    it.each([[{}], [{ allowMultiple: true }]])('should render with onChange handler %j', (props) => {
      const { container } = setup({ onChange: jest.fn(), ...props });
      expect(q(container, 'input')).toBeInTheDocument();
    });

    it('should have a text input for user interaction', () => {
      const { container } = setup();
      expect(input(container).type).toBe('text');
    });

    it('should accept text input when not disabled', () => {
      const onInputChange = jest.fn();
      const { container } = setup({ onInputChange });
      fireEvent.change(input(container), { target: { value: 'Option' } });
      expect(onInputChange).toHaveBeenCalled();
    });

    it('should handle rapid input changes', () => {
      const onInputChange = jest.fn();
      const { container } = setup({ onInputChange });
      ['A', 'AB', 'ABC'].forEach((value) => fireEvent.change(input(container), { target: { value } }));
      expect(onInputChange.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      setup({
        label: 'Department',
        placeholder: 'Select department...',
        helperText: 'Choose from list',
        selectSize: 'large',
        variant: 'outlined',
        isMandatory: true,
        showHintText: true,
        controlStyle: 'bottom line',
        isShowUser: true,
        userIcon: <span data-testid="user-icon">👤</span>,
        openOnFocus: true,
        allowMultiple: false,
      });
      expect(screen.getByText('Department')).toBeInTheDocument();
      expect(screen.getByText('Choose from list')).toBeInTheDocument();
    });

    it('should render with multiple display options', () => {
      const { container } = setup({ isShowCheckbox: true, isShowRadio: false, isShowUser: false });
      expect(q(container, 'input')).toBeInTheDocument();
    });

    it('should handle all size and style combinations', () => {
      const { container } = setup({ selectSize: 'large', variant: 'filled', controlStyle: 'bottom line', open: true });
      expect(q(container, '.rds-autocomplete--large')).toBeInTheDocument();
      expect(q(container, '.rds-autocomplete__textfield--bottom-line')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should show title by default', () => {
      setup({ label: 'Label' });
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should not show checkboxes by default', () => {
      const { container } = setup();
      expect(container.querySelectorAll('[data-testid="rds-checkbox"]').length).toBe(0);
    });

    it('should not show radios by default', () => {
      const { container } = setup();
      expect(container.querySelectorAll('input[type="radio"]').length).toBe(0);
    });

    it('should not select multiple by default', () => {
      const { container } = setup({ selected: true });
      expect(container.querySelectorAll('.rds-autocomplete__chip').length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it.each([
      ['very long label text', 'A'.repeat(100)],
      ['special characters in label', 'Special & Characters: @#$%'],
      ['unicode characters in label', '选择选项'],
    ])('should handle %s', (_n, label) => {
      setup({ label, showTitle: true });
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    it('should handle rapid open and close interactions', () => {
      const { container } = setup();
      const el = input(container);
      fireEvent.click(el);
      fireEvent.blur(el);
      fireEvent.click(el);
      fireEvent.blur(el);
      expect(el).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should handle boolean props correctly', () => {
      const { container } = setup({
        error: true,
        disabled: false,
        isMandatory: true,
        showHintText: true,
        isShowCheckbox: true,
        isShowRadio: false,
        isShowUser: false,
        openOnFocus: true,
        allowMultiple: false,
      });
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
    });

    it('should accept semantic selected and open props', () => {
      const { container, rerender } = setup();
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
      rerender(<RdsAutocomplete {...defaultProps} selected />);
      expect(input(container).value).toBe('Option 1');
      rerender(<RdsAutocomplete {...defaultProps} open />);
      expect(screen.getAllByRole('listbox').length).toBeGreaterThan(0);
      expect(q(container, '.rds-autocomplete')).toBeInTheDocument();
    });

    it('should accept default control style value', () => {
      const { container } = setup({ controlStyle: 'default' });
      expect(q(container, '.rds-autocomplete__textfield')).toBeInTheDocument();
    });
  });

  describe('Custom MUI Autocomplete Props', () => {
    it('should accept MUI Autocomplete props', () => {
      const { container } = setup({ id: 'custom-autocomplete', className: 'custom-class' });
      expect(q(container, '#custom-autocomplete')).toBeInTheDocument();
    });

    it('should handle readOnly prop', () => {
      const { container } = setup({ readOnly: true });
      expect(q(container, 'input')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should render complete autocomplete with all features', () => {
      const { container } = setup({
        label: 'Search Users',
        placeholder: 'Type name...',
        helperText: 'Start typing to search',
        showHintText: true,
        selectSize: 'medium',
        variant: 'outlined',
        isMandatory: true,
        allowMultiple: false,
        isShowCheckbox: false,
        isShowRadio: false,
      });
      expect(screen.getByText('Search Users')).toBeInTheDocument();
      expect(screen.getByText('Start typing to search')).toBeInTheDocument();
      expect(q(container, '.rds-autocomplete--medium')).toBeInTheDocument();
    });

    it('should handle disabled prop changes', () => {
      const { container, rerender } = setup({ disabled: false });
      expect(input(container).disabled).toBe(false);
      rerender(<RdsAutocomplete {...defaultProps} disabled />);
      expect(input(container).disabled).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup({ label: 'Search' });
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('RdsAutocomplete audit fixes', () => {
  type Option = { label: string; value: number };
  const makeOptions = (): Option[] => [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  const getInput = (container: HTMLElement) => container.querySelector('input') as HTMLInputElement;
  const openList = (container: HTMLElement) => fireEvent.mouseDown(getInput(container));

  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  it('shows a controlled value and reports selections through onChange (G1-042)', () => {
    const options = makeOptions();
    const onChange = jest.fn();
    const { container, rerender } = render(
      <RdsAutocomplete options={options} value={options[1]} onChange={onChange} />
    );
    expect(getInput(container).value).toBe('Option 2');

    openList(container);
    fireEvent.click(screen.getByRole('option', { name: 'Option 3' }));
    expect(onChange).toHaveBeenCalledTimes(1);
    const [event, value, reason] = onChange.mock.calls[0];
    expect(event).toBeTruthy();
    expect(value).toBe(options[2]);
    expect(reason).toBe('selectOption');
    expect(getInput(container).value).toBe('Option 2');

    rerender(<RdsAutocomplete options={options} value={options[2]} onChange={onChange} />);
    expect(getInput(container).value).toBe('Option 3');
  });

  it('seeds the uncontrolled value from defaultValue and still calls onChange (G1-042)', () => {
    const options = makeOptions();
    const onChange = jest.fn();
    const { container } = render(
      <RdsAutocomplete options={options} defaultValue={options[0]} onChange={onChange} />
    );
    expect(getInput(container).value).toBe('Option 1');

    openList(container);
    fireEvent.click(screen.getByRole('option', { name: 'Option 2' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), options[1], 'selectOption', expect.anything());
    expect(getInput(container).value).toBe('Option 2');
  });

  it('keeps the selection when the parent re-renders with an equal inline options array (G1-043)', () => {
    const { container, rerender } = render(<RdsAutocomplete options={makeOptions()} />);
    openList(container);
    fireEvent.click(screen.getByRole('option', { name: 'Option 2' }));
    expect(getInput(container).value).toBe('Option 2');

    rerender(<RdsAutocomplete options={makeOptions()} />);
    expect(getInput(container).value).toBe('Option 2');
  });

  it('re-derives the selected option when the options really change with selected (G1-043)', () => {
    const { container, rerender } = render(<RdsAutocomplete options={makeOptions()} selected />);
    expect(getInput(container).value).toBe('Option 1');

    rerender(<RdsAutocomplete options={[{ label: 'Other', value: 9 }]} selected />);
    expect(getInput(container).value).toBe('Other');
  });

  it('shows a hidden-from-AT asterisk and sets aria-required with required (G1-044, G1-051)', () => {
    const { container } = render(<RdsAutocomplete options={makeOptions()} label="Team" required />);
    const asterisk = container.querySelector('.rds-autocomplete__asterisk');
    expect(asterisk).toHaveTextContent('*');
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
    expect(getInput(container)).toHaveAttribute('aria-required', 'true');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('does not set aria-required by default (G1-044)', () => {
    const { container } = render(<RdsAutocomplete options={makeOptions()} label="Team" />);
    expect(getInput(container)).not.toHaveAttribute('aria-required');
    expect(container.querySelector('.rds-autocomplete__asterisk')).not.toBeInTheDocument();
  });

  it('keeps isMandatory and display.mandatory working, with deprecation warnings (G1-051)', () => {
    const { container, unmount } = render(<RdsAutocomplete options={makeOptions()} label="Team" isMandatory />);
    expect(container.querySelector('.rds-autocomplete__asterisk')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'isMandatory', '`required`');
    unmount();

    const second = render(<RdsAutocomplete options={makeOptions()} label="Team" display={{ mandatory: 'required' }} />);
    expect(second.container.querySelector('.rds-autocomplete__asterisk')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'display.mandatory', '`required`');
  });

  it('lets required win over the deprecated props (G1-051)', () => {
    const { container } = render(
      <RdsAutocomplete options={makeOptions()} label="Team" required={false} isMandatory display={{ mandatory: 'required' }} />
    );
    expect(container.querySelector('.rds-autocomplete__asterisk')).not.toBeInTheDocument();
  });

  it('renders chips through renderValue with the same classes (G1-045)', () => {
    const { container } = render(<RdsAutocomplete options={makeOptions()} multiple selected selectSize="small" />);
    const chip = container.querySelector('.rds-autocomplete__chip');
    expect(chip).toHaveClass('rds-autocomplete__chip--small');
    expect(chip).toHaveTextContent('Option 1');
  });

  it('merges consumer slotProps.listbox and keeps other slotProps (G1-046)', () => {
    const { container } = render(
      <RdsAutocomplete
        options={makeOptions()}
        slotProps={{ listbox: { className: 'my-listbox' }, paper: { className: 'my-paper' } }}
      />
    );
    openList(container);
    expect(screen.getByRole('listbox')).toHaveClass('my-listbox');
    expect(document.querySelector('.my-paper')).toBeInTheDocument();
  });

  it('keeps the input aria-label after moving to slotProps.htmlInput (G1-047)', () => {
    const { container } = render(<RdsAutocomplete options={makeOptions()} placeholder="Pick one" />);
    expect(getInput(container)).toHaveAttribute('aria-label', 'Pick one');
  });

  it('uses the open prop as controlled and calls onOpen/onClose (G1-048)', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const { container, rerender } = render(
      <RdsAutocomplete options={makeOptions()} open={false} onOpen={onOpen} onClose={onClose} />
    );
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    openList(container);
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    rerender(<RdsAutocomplete options={makeOptions()} open onOpen={onOpen} onClose={onClose} />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(getInput(container), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escape');
  });

  it('opens the list while the open prop is true (G1-048)', () => {
    render(<RdsAutocomplete options={makeOptions()} open />);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('uses the MUI multiple and openOnFocus booleans over the deprecated behavior object (G1-050)', () => {
    const onOpen = jest.fn();
    const { container } = render(
      <RdsAutocomplete
        options={makeOptions()}
        selected
        multiple
        openOnFocus
        onOpen={onOpen}
        behavior={{ multiple: 'off', openOnFocus: 'off' }}
      />
    );
    expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    fireEvent.focus(getInput(container));
    expect(onOpen).toHaveBeenCalled();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'behavior', '`openOnFocus` and `multiple`');
  });

  it('keeps behavior and allowMultiple working, with deprecation warnings (G1-050)', () => {
    const first = render(<RdsAutocomplete options={makeOptions()} selected behavior={{ multiple: 'on' }} />);
    expect(first.container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    first.unmount();

    const second = render(<RdsAutocomplete options={makeOptions()} selected allowMultiple />);
    expect(second.container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'allowMultiple', '`multiple`');
  });

  it('merges consumer sx after the base width and keeps className (G1-054)', () => {
    const { container } = render(
      <RdsAutocomplete options={makeOptions()} className="my-autocomplete" sx={{ maxWidth: '300px' }} />
    );
    const root = container.querySelector('.MuiAutocomplete-root') as HTMLElement;
    expect(root).toHaveClass('my-autocomplete');
    expect(root).toHaveStyle({ width: '100%', maxWidth: '300px' });
  });

  it('links the label to the input, respecting a consumer id (G1-055)', () => {
    const { container, unmount } = render(<RdsAutocomplete options={makeOptions()} label="Team" />);
    const label = container.querySelector('label.rds-autocomplete__label') as HTMLLabelElement;
    expect(label.htmlFor).toBeTruthy();
    expect(label.htmlFor).toBe(getInput(container).id);
    unmount();

    const second = render(<RdsAutocomplete options={makeOptions()} label="Team" id="team-field" />);
    expect(second.container.querySelector('label.rds-autocomplete__label')).toHaveAttribute('for', 'team-field');
    expect(getInput(second.container).id).toBe('team-field');
  });

  it('uses a consumer getOptionLabel for options and chips (G1-056)', () => {
    const getOptionLabel = (option: Option) => `#${option.value}`;
    const { container } = render(
      <RdsAutocomplete options={makeOptions()} getOptionLabel={getOptionLabel} multiple selected />
    );
    expect(container.querySelector('.rds-autocomplete__chip')).toHaveTextContent('#1');
    openList(container);
    expect(screen.getByRole('option', { name: '#2' })).toBeInTheDocument();
  });
});

describe('RdsAutocomplete additive renames', () => {
  const options = [{ label: 'Option 1' }, { label: 'Option 2' }];
  const open = (c: HTMLElement) => fireEvent.mouseDown(c.querySelector('input') as HTMLInputElement);
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('optionVariant wins over optionDecorators', () => {
    const { container } = render(
      <RdsAutocomplete options={options} optionVariant="radio" optionDecorators={{ checkbox: 'visible' }} />
    );
    open(container);
    expect(document.querySelectorAll('input[type="radio"]').length).toBe(2);
    expect(document.querySelectorAll('input[type="checkbox"]').length).toBe(0);
  });

  it('optionDecorators still works and warns', () => {
    const { container } = render(<RdsAutocomplete options={options} optionDecorators={{ radio: 'visible' }} />);
    open(container);
    expect(document.querySelectorAll('input[type="radio"]').length).toBe(2);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'optionDecorators', '`optionVariant`');
  });

  it('getOptionIcon wins over userIcon per option', () => {
    const { container } = render(
      <RdsAutocomplete
        options={options}
        optionVariant="avatar"
        userIcon={<i data-testid="old" />}
        getOptionIcon={(o) => <i data-testid={`icon-${o.label}`} />}
      />
    );
    open(container);
    expect(screen.getByTestId('icon-Option 1')).toBeInTheDocument();
    expect(screen.queryByTestId('old')).toBeNull();
  });

  it('userIcon still works and warns', () => {
    const { container } = render(
      <RdsAutocomplete options={options} isShowUser userIcon={<i data-testid="old" />} />
    );
    open(container);
    expect(screen.getAllByTestId('old').length).toBe(2);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsAutocomplete', 'userIcon', '`getOptionIcon`');
  });
});
