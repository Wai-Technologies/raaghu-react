import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsInput from './rds-input';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import SearchIcon from '@mui/icons-material/Search';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-input.scss', () => ({}));

const wrap = (ui: React.ReactElement, isDark = false) => (
  <ThemeProvider theme={createTheme({ palette: { mode: isDark ? 'dark' : 'light' } })}>{ui}</ThemeProvider>
);
const renderWithTheme = (component: React.ReactElement, isDark = false) => render(wrap(component, isDark));
const setup = (props: Record<string, any> = {}) => renderWithTheme(<RdsInput label="Input" {...props} />);
const getInput = (container: HTMLElement) => container.querySelector('input') as HTMLInputElement;

describe('RdsInput', () => {
  describe('Basic Rendering', () => {
    it('should render MuiTextField with rds-input class', () => {
      const { container } = setup({ label: 'Test Input' });
      expect(container).toBeInTheDocument();
      expect(container.querySelector('.MuiTextField-root')).toBeInTheDocument();
      expect(container.querySelector('.rds-input')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsInput.displayName).toBe('RdsInput');
    });
  });

  describe('Label and Title Position', () => {
    it('should render label above input when titlePosition is title-above', () => {
      const { container } = setup({ label: 'Test Label', titlePosition: 'title-above' });
      expect(container.querySelector('.rds-input__label')).toBeInTheDocument();
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render inline label when titlePosition is inline-title', () => {
      const { container } = setup({ label: 'Test Label', titlePosition: 'inline-title' });
      expect(container.querySelector('.MuiFormLabel-root')).toHaveTextContent('Test Label');
    });

    it('should show asterisk for mandatory field', () => {
      const { container } = setup({ label: 'Required Field', titlePosition: 'title-above', required: true });
      const asterisk = container.querySelector('.rds-input__asterisk');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveTextContent('*');
    });

    it('should not show asterisk when required is false', () => {
      const { container } = setup({ label: 'Optional Field', titlePosition: 'title-above', required: false });
      expect(container.querySelector('.rds-input__asterisk')).not.toBeInTheDocument();
    });
  });

  describe('Input Layouts', () => {
    it.each([
      [undefined, 'text'],
      ['password', 'password'],
      ['phone number', 'tel'],
      ['number', 'tel'],
      ['card number', 'tel'],
    ])('should render layout %s with %s type', (layout, type) => {
      const { container } = setup({ layout });
      expect(getInput(container)?.type).toBe(type);
    });
  });

  describe('Input Sizes', () => {
    it.each([
      ['small', 'small'],
      ['medium', 'medium'],
      ['large', 'large'],
      [undefined, 'small'],
    ])('should apply size %s -> .rds-input--%s', (size, cls) => {
      const { container } = setup({ size });
      expect(container.querySelector(`.rds-input--${cls}`)).toBeInTheDocument();
    });
  });

  describe('Input Styles', () => {
    it.each([
      ['pill', 'rds-input--pill'],
      ['bottom outline', 'rds-input--bottom-outline'],
    ])('should apply %s style class', (shape, cls) => {
      const { container } = setup({ shape });
      expect(container.querySelector(`.${cls}`)).toBeInTheDocument();
    });

    it('should render default style by default', () => {
      const { container } = setup();
      const input = container.querySelector('.rds-input');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass('rds-input--pill');
      expect(input).not.toHaveClass('rds-input--bottom-outline');
    });

    it('should apply CSSProperties style to the input wrapper', () => {
      const { container } = setup({ style: { marginTop: '12px' } });
      expect(container.querySelector('.rds-input')).toHaveStyle('margin-top: 12px');
    });
  });

  describe('Input States', () => {
    it.each([
      [{ error: true }, 'error'],
      [{ disabled: true }, 'disabled'],
      [{ selected: true }, 'selected'],
    ])('should apply state class for %j', (props, cls) => {
      const { container } = setup(props);
      expect(container.querySelector(`.rds-input--${cls}`)).toBeInTheDocument();
    });
  });

  describe('Error and Hint Text', () => {
    it('should render error message when provided', () => {
      setup({ errorMessage: 'This is an error' });
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('should render hint text when provided', () => {
      setup({ hintText: 'This is a hint' });
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
    });

    it('should prioritize error message over hint text', () => {
      setup({ errorMessage: 'Error message', hintText: 'Hint text' });
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
    });

    it('should not render error or hint text when not provided', () => {
      const { container } = setup();
      expect(container.querySelector('.MuiFormHelperText-root')).not.toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('should render icon when showIcon is true', () => {
      setup({ showIcon: true, icon: <SearchIcon data-testid="search-icon" /> });
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('should not render icon when showIcon is false', () => {
      setup({ showIcon: false, icon: <SearchIcon data-testid="search-icon" /> });
      expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
    });

    it.each(['start', 'end'])('should render icon at %s position', position => {
      const { container } = setup({
        showIcon: true,
        iconPosition: position,
        icon: <div data-testid="icon-test">Icon</div>,
      });
      expect(container.querySelector(`.rds-input__icon--${position}`)).toBeInTheDocument();
    });
  });

  describe('Placeholder and Value', () => {
    it.each([
      [{ placeholder: 'Enter text' }, 'Enter text'],
      [{ layout: 'text' }, 'Placeholder Text'],
      [{ layout: 'password' }, '••••••••'],
      [{ layout: 'phone number' }, 'Enter Phone Number'],
      [{ layout: 'number' }, 'Enter Number'],
      [{ layout: 'card number' }, 'XXXX XXXX XXXX XXXX'],
    ])('should render placeholder for %j', (props, placeholder) => {
      const { container } = setup(props);
      expect(getInput(container)?.placeholder).toBe(placeholder);
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange when input value changes', () => {
      const onChange = jest.fn();
      const { container } = setup({ onChange });
      fireEvent.change(getInput(container), { target: { value: 'Test' } });
      expect(onChange).toHaveBeenCalled();
    });

    it('should call onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const { container } = setup({ onFocus });
      fireEvent.focus(getInput(container));
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      const { container } = setup({ onBlur });
      const input = getInput(container);
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalled();
    });

    it('should update internal value on change for uncontrolled component', () => {
      const { container } = setup();
      const input = getInput(container);
      fireEvent.change(input, { target: { value: 'New Value' } });
      expect(input?.value).toBe('New Value');
    });

    it('should maintain controlled value', () => {
      const { container, rerender } = setup({ value: 'Initial Value', onChange: () => {} });
      expect(getInput(container)?.value).toBe('Initial Value');
      rerender(wrap(<RdsInput label="Input" value="Updated" onChange={() => {}} />));
      expect(getInput(container)?.value).toBe('Updated');
    });
  });

  describe('Phone Number Formatting', () => {
    it('should accept phone number input for phone layout', () => {
      const onChange = jest.fn();
      const { container } = setup({ layout: 'phone number', onChange });
      const input = getInput(container);
      fireEvent.change(input, { target: { value: '1234567890' } });
      expect(onChange).toHaveBeenCalled();
      fireEvent.change(input, { target: { value: '+1234567890' } });
      expect(input).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it.each([true, false])('should set required attribute to %s', required => {
      const { container } = setup({ required });
      expect(getInput(container)?.required).toBe(required);
    });
  });

  describe('Input Variant Support', () => {
    it('should accept the MUI variant prop', () => {
      const { container } = setup({ variant: 'filled' });
      expect(container.querySelector('.MuiFilledInput-root')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it.each([false, true])('should render with dark=%s theme', isDark => {
      const { container } = renderWithTheme(<RdsInput label="Input" />, isDark);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render input with all features', () => {
      const { container } = setup({
        label: 'Complex Input',
        titlePosition: 'title-above',
        required: true,
        layout: 'text',
        size: 'medium',
        shape: 'pill',
        placeholder: 'Enter text',
        hintText: 'This is a hint',
        showIcon: true,
        iconPosition: 'end',
        icon: <SearchIcon data-testid="icon" />,
        onChange: jest.fn(),
      });
      expect(screen.getByText('Complex Input')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
      expect(getInput(container)?.placeholder).toBe('Enter text');
    });

    it('should handle switching between layouts', () => {
      const { container, rerender } = setup({ layout: 'text' });
      expect(getInput(container)?.type).toBe('text');
      rerender(wrap(<RdsInput label="Input" layout="password" />));
      expect(getInput(container)?.type).toBe('password');
    });

    it('should handle switching between sizes', () => {
      const { container, rerender } = setup({ size: 'small' });
      expect(container.querySelector('.rds-input--small')).toBeInTheDocument();
      rerender(wrap(<RdsInput label="Input" size="large" />));
      expect(container.querySelector('.rds-input--large')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      const { container } = setup({ label: 'Accessible Input', titlePosition: 'inline-title' });
      expect(getInput(container)).toBeInTheDocument();
    });

    it('should support disabled state', () => {
      const { container } = setup({ disabled: true });
      expect(getInput(container)?.disabled).toBe(true);
    });

    it('should show error state for accessibility', () => {
      setup({ error: true, errorMessage: 'Field is required' });
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup({ label: 'Email' });
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('RdsInput audit fixes', () => {
  it('uses defaultValue as the initial uncontrolled value (G2-029)', () => {
    render(<RdsInput label="Name" defaultValue="Ann" />);
    expect(screen.getByRole('textbox')).toHaveValue('Ann');
  });

  it('passes the real event for phone input so name survives (G2-030)', () => {
    const onChange = jest.fn();
    render(<RdsInput layout="phone number" name="phone" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: '12ab3' } });
    const event = onChange.mock.calls.at(-1)[0];
    expect(event.target.name).toBe('phone');
    expect(event.target.value).toBe('123');
  });

  it('links the visible label to the input (G2-039)', () => {
    render(<RdsInput label="Email" titlePosition="title-above" />);
    expect(screen.getByLabelText('Email')).toBe(screen.getByRole('textbox'));
  });

  it('names the input from label when the label is not shown (G2-028)', () => {
    render(<RdsInput label="Search term" />);
    expect(screen.getByRole('textbox', { name: 'Search term' })).toBeInTheDocument();
  });

  it('shows the label inside the field when titlePosition is undefined (G2-028)', () => {
    const { container } = render(<RdsInput label="Search term" required />);
    const muiLabel = container.querySelector('.MuiInputLabel-root');
    expect(muiLabel).toHaveTextContent('Search term');
    expect(muiLabel?.querySelector('.MuiFormLabel-asterisk')).toBeInTheDocument();
    expect(container.querySelector('.rds-input__label')).not.toBeInTheDocument();
  });

  it('does not render a second MUI label for title-above (G2-028)', () => {
    const { container } = render(<RdsInput label="City" titlePosition="title-above" />);
    expect(container.querySelector('.MuiInputLabel-root')).not.toBeInTheDocument();
    expect(container.querySelector('.rds-input__label')).toHaveTextContent('City');
  });

  it('accepts helperText and required as the new names (G2-035)', () => {
    render(<RdsInput label="City" titlePosition="title-above" helperText="Where you live" required />);
    expect(screen.getByText('Where you live')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('reports deprecated props to the deprecation helper', () => {
    render(<RdsInput hintText="Old hint" isMandatory />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsInput', 'hintText', expect.any(String));
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsInput', 'isMandatory', expect.any(String));
  });

  it('shows helperText as the error text when error is set (453)', () => {
    render(<RdsInput label="Name" error helperText="Required field" />);
    expect(screen.getByText('Required field')).toHaveClass('Mui-error');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders startIcon and endIcon (457)', () => {
    const { container } = render(<RdsInput startIcon={<span data-testid="s" />} endIcon={<span data-testid="e" />} />);
    expect(container.querySelector('.rds-input__icon--start')).toContainElement(screen.getByTestId('s'));
    expect(container.querySelector('.rds-input__icon--end')).toContainElement(screen.getByTestId('e'));
  });

  it('prefers shape over the deprecated style string and forwards style objects (459)', () => {
    const { container } = render(<RdsInput shape="pill" style="bottom outline" />);
    expect(container.querySelector('.rds-input')).toHaveClass('rds-input--pill');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsInput', 'style', expect.any(String));
    const { container: c2 } = render(<RdsInput style={{ marginTop: '12px' }} />);
    expect(c2.querySelector('.rds-input')).toHaveStyle({ marginTop: '12px' });
  });

  it('places the label with labelPlacement (460)', () => {
    const { container } = render(<RdsInput label="Email" labelPlacement="top" titlePosition="inline-title" />);
    expect(container.querySelector('.rds-input__label')).toHaveTextContent('Email');
  });

  it('warns for the renamed props', () => {
    render(<RdsInput errorMessage="x" titlePosition="title-above" showIcon iconPosition="start" icon={<span />} />);
    ['errorMessage', 'titlePosition', 'showIcon', 'iconPosition', 'icon'].forEach((name) =>
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsInput', name, expect.any(String)),
    );
  });

  it('forwards data-testid to the root .rds-input', () => {
    const { container } = render(<RdsInput data-testid="email-field" label="Email" />);
    const root = screen.getByTestId('email-field');
    expect(root).toHaveClass('rds-input');
    expect(container.querySelector('.MuiTextField-root')).not.toHaveAttribute('data-testid');
  });
});
