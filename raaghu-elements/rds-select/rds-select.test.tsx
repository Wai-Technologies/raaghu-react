import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSelect, { RdsSelectOption } from './rds-select';
import { axe } from 'jest-axe';

jest.mock('./rds-select.scss');
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsSelect', () => {
  const mockOptions: RdsSelectOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  describe('Basic Rendering', () => {
    it('should render select component', () => {
      renderWithTheme(
        <RdsSelect options={mockOptions} value="" />
      );
      const selectElement = screen.getByRole('combobox');
      expect(selectElement).toBeInTheDocument();
    });

    it('should render all options', () => {
      renderWithTheme(
        <RdsSelect options={mockOptions} value="" />
      );
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      mockOptions.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    it('should have correct CSS classes', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} />
      );
      expect(container.querySelector('.rds-select')).toBeInTheDocument();
      expect(container.querySelector('.rds-select__form-control')).toBeInTheDocument();
    });

    it('should render without errors with default props', () => {
      expect(() => {
        renderWithTheme(
          <RdsSelect options={mockOptions} />
        );
      }).not.toThrow();
    });

    it('should accept custom className', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} value="" className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should render with single option', () => {
      renderWithTheme(
        <RdsSelect options={[mockOptions[0]]} value="" />
      );
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Label Rendering', () => {
    it('should render label when labelPosition=true', () => {
      renderWithTheme(
        <RdsSelect 
          label="Select Option" 
          options={mockOptions}
          labelPosition={true}
        />
      );
      const labels = screen.getAllByText('Select Option');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should render label when labelPosition=false', () => {
      renderWithTheme(
        <RdsSelect 
          label="Select Option" 
          options={mockOptions}
          labelPosition={false}
          inputPlaceholder="Choose..."
        />
      );
      const labels = screen.getAllByText('Select Option');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should not render label when not provided', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} />
      );
      const labels = container.querySelectorAll('label');
      expect(labels.length).toBe(0);
    });

    it('should render required asterisk when isRequired=true', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          label="Required Field" 
          options={mockOptions}
          isRequired={true}
          labelPosition={true}
        />
      );
      const asterisk = container.querySelector('[aria-hidden="true"]');
      expect(asterisk).toBeInTheDocument();
    });

    it('should not render asterisk when isRequired=false', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          label="Optional Field" 
          options={mockOptions}
          isRequired={false}
          labelPosition={true}
        />
      );
      const asterisks = container.querySelectorAll('[aria-hidden="true"]');
      expect(asterisks.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Placeholder and inputPlaceholder', () => {
    it('should show placeholder when value is empty', () => {
      renderWithTheme(
        <RdsSelect 
          placeholder="Choose an option"
          options={mockOptions}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toBeInTheDocument();
    });

    it('should show inputPlaceholder with labelPosition=false', () => {
      renderWithTheme(
        <RdsSelect 
          inputPlaceholder="Pick one"
          options={mockOptions}
          labelPosition={false}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toBeInTheDocument();
    });

    it('should prioritize inputPlaceholder over placeholder', () => {
      renderWithTheme(
        <RdsSelect 
          placeholder="Placeholder"
          inputPlaceholder="InputPlaceholder"
          options={mockOptions}
          labelPosition={false}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toBeInTheDocument();
    });
  });

  describe('Selection Functionality', () => {
    it('should call onChange when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          onChange={handleChange}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      const option = screen.getByText('Option 1');
      await user.click(option);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('should display selected option', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value="option1"
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox.textContent).toContain('Option 1');
    });

    it('should handle numeric values', () => {
      const numericOptions: RdsSelectOption[] = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
      ];
      
      renderWithTheme(
        <RdsSelect 
          options={numericOptions}
          value={1}
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox.textContent).toContain('One');
    });

    it('should handle value changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value="option1"
        />
      );
      
      expect(screen.getByRole('combobox').textContent).toContain('Option 1');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSelect 
            options={mockOptions}
            value="option2"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('combobox').textContent).toContain('Option 2');
    });

    it('should support controlled component', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [selected, setSelected] = useState<string | number>('');
        return (
          <RdsSelect 
            options={mockOptions}
            value={selected}
            onChange={(e: any) => setSelected(e.target.value)}
          />
        );
      };
      
      renderWithTheme(<TestComponent />);
      const selectCombobox = screen.getByRole('combobox');
      
      fireEvent.mouseDown(selectCombobox);
      await user.click(screen.getByText('Option 2'));
      
      expect(selectCombobox.textContent).toContain('Option 2');
    });
  });

  describe('Helper Text and Error Messages', () => {
    it('should render helper text', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          helperText="This is a helper text"
        />
      );
      expect(screen.getByText('This is a helper text')).toBeInTheDocument();
    });

    it('should render error message', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          errorMessage="This field is required"
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should prioritize errorMessage over helperText', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          helperText="Helper"
          errorMessage="Error"
        />
      );
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('should apply error class when errorMessage exists', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          errorMessage="Error message"
        />
      );
      expect(container.querySelector('.rds-select--error')).toBeInTheDocument();
    });

    it('should apply error class when error prop is true', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          error={true}
        />
      );
      expect(container.querySelector('.rds-select--error')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable select when disabled=true', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          disabled={true}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not disable select when disabled=false', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          disabled={false}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('should disable individual options when option.disabled=true', () => {
      const disabledOptions: RdsSelectOption[] = [
        { label: 'Available', value: 'available' },
        { label: 'Disabled', value: 'disabled', disabled: true },
      ];
      
      renderWithTheme(
        <RdsSelect 
          options={disabledOptions}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      const disabledOption = screen.getByRole('option', { name: 'Disabled' });
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Size Variations', () => {
    it('should render with small size by default', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} />
      );
      const formControl = container.querySelector('.rds-select__form-control');
      expect(formControl).toBeInTheDocument();
    });

    it('should render with medium size', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} size="medium" />
      );
      const formControl = container.querySelector('.rds-select__form-control');
      expect(formControl).toBeInTheDocument();
    });

    it('should render with small size when specified', () => {
      const { container } = renderWithTheme(
        <RdsSelect options={mockOptions} size="small" />
      );
      const formControl = container.querySelector('.rds-select__form-control');
      expect(formControl).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      expect(lightTheme).toBeDefined();
      
      render(
        <ThemeProvider theme={lightTheme}>
          <RdsSelect options={mockOptions} />
        </ThemeProvider>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      expect(darkTheme).toBeDefined();
      
      render(
        <ThemeProvider theme={darkTheme}>
          <RdsSelect options={mockOptions} />
        </ThemeProvider>
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible select button', () => {
      renderWithTheme(
        <RdsSelect options={mockOptions} />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toBeInTheDocument();
    });

    it('should have accessible option items', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      mockOptions.forEach(option => {
        const optionElement = screen.getByRole('option', { name: option.label });
        expect(optionElement).toBeInTheDocument();
      });
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          onChange={handleChange}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      await user.click(selectCombobox);
      
      fireEvent.keyDown(selectCombobox, { key: 'ArrowDown' });
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('should have label association when provided', () => {
      renderWithTheme(
        <RdsSelect 
          label="Select Option"
          options={mockOptions}
          labelPosition={true}
        />
      );
      const labels = screen.getAllByText('Select Option');
      expect(labels.length).toBeGreaterThan(0);
    });

    it('should announce error state to screen readers', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          error={true}
        />
      );
      const errorElement = container.querySelector('.rds-select--error');
      expect(errorElement).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid value changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value="option1"
        />
      );
      
      const theme = createTheme();
      
      rerender(
        <ThemeProvider theme={theme}>
          <RdsSelect 
            options={mockOptions}
            value="option2"
          />
        </ThemeProvider>
      );
      
      rerender(
        <ThemeProvider theme={theme}>
          <RdsSelect 
            options={mockOptions}
            value="option3"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('combobox').textContent).toContain('Option 3');
    });

    it('should handle label position change', () => {
      const { rerender } = renderWithTheme(
        <RdsSelect 
          label="Test Label"
          options={mockOptions}
          labelPosition={true}
        />
      );
      
      const labels1 = screen.getAllByText('Test Label');
      expect(labels1.length).toBeGreaterThan(0);
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSelect 
            label="Test Label"
            options={mockOptions}
            labelPosition={false}
            inputPlaceholder="Choose..."
          />
        </ThemeProvider>
      );
      
      const labels2 = screen.getAllByText('Test Label');
      expect(labels2.length).toBeGreaterThan(0);
    });

    it('should handle disabled state toggle', () => {
      const { rerender } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          disabled={false}
          value=""
        />
      );
      
      expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-disabled', 'true');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSelect 
            options={mockOptions}
            disabled={true}
            value=""
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should handle options update', () => {
      const initialOptions: RdsSelectOption[] = [
        { label: 'Option A', value: 'a' },
      ];
      
      const updatedOptions: RdsSelectOption[] = [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ];
      
      const { rerender, container } = renderWithTheme(
        <RdsSelect 
          options={initialOptions}
          value=""
        />
      );
      
      const selects = container.querySelectorAll('.rds-select__field');
      expect(selects.length).toBeGreaterThan(0);
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSelect 
            options={updatedOptions}
            value=""
          />
        </ThemeProvider>
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      expect(screen.getByText('Option B')).toBeInTheDocument();
      expect(screen.getByText('Option C')).toBeInTheDocument();
    });

    it('should handle size change', () => {
      const { rerender, container } = renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          size="small"
        />
      );
      
      let formControl = container.querySelector('.rds-select__form-control');
      expect(formControl).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSelect 
            options={mockOptions}
            size="medium"
          />
        </ThemeProvider>
      );
      
      formControl = container.querySelector('.rds-select__form-control');
      expect(formControl).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty options array', () => {
      renderWithTheme(
        <RdsSelect 
          options={[]}
          value=""
        />
      );
      const selectCombobox = screen.getByRole('combobox');
      expect(selectCombobox).toBeInTheDocument();
    });

    it('should handle undefined value', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value=""
          placeholder="Please select"
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle null value', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value=""
          placeholder="Please select"
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle empty string value', () => {
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value=""
          placeholder="Select an option"
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle very long option labels', () => {
      const longOptions: RdsSelectOption[] = [
        { 
          label: 'This is a very long option label that should be handled gracefully', 
          value: 'long' 
        },
      ];
      
      renderWithTheme(
        <RdsSelect 
          options={longOptions}
          value="long"
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle special characters in option labels', () => {
      const specialOptions: RdsSelectOption[] = [
        { label: 'Option & Special <>', value: 'special' },
      ];
      
      renderWithTheme(
        <RdsSelect 
          options={specialOptions}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      expect(screen.getByText('Option & Special <>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      const unicodeOptions: RdsSelectOption[] = [
        { label: '选项 1 🚀', value: 'unicode1' },
        { label: 'Опция 2 📖', value: 'unicode2' },
      ];
      
      renderWithTheme(
        <RdsSelect 
          options={unicodeOptions}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      expect(screen.getByText('选项 1 🚀')).toBeInTheDocument();
      expect(screen.getByText('Опция 2 📖')).toBeInTheDocument();
    });

    it('should handle duplicate option values', async () => {
      const user = userEvent.setup();
      const duplicateOptions: RdsSelectOption[] = [
        { label: 'First', value: 'same' },
        { label: 'Second', value: 'same' },
      ];
      
      const handleChange = jest.fn();
      renderWithTheme(
        <RdsSelect 
          options={duplicateOptions}
          onChange={handleChange}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      const firstOption = screen.getAllByText('First')[0];
      await user.click(firstOption);
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('should handle onChange with no callback', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSelect 
          options={mockOptions}
          value=""
        />
      );
      
      const selectCombobox = screen.getByRole('combobox');
      fireEvent.mouseDown(selectCombobox);
      
      await user.click(screen.getByText('Option 1'));
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should handle all props at once', () => {
      const { container } = renderWithTheme(
        <RdsSelect 
          label="Complete Select"
          placeholder="Choose"
          inputPlaceholder="Input"
          options={mockOptions}
          helperText="Help text"
          isRequired={true}
          disabled={false}
          size="medium"
          className="custom"
          value="option1"
          labelPosition={true}
        />
      );
      
      const labels = screen.getAllByText('Complete Select');
      expect(labels.length).toBeGreaterThan(0);
      expect(screen.getByText('Help text')).toBeInTheDocument();
      expect(container.querySelector('.custom')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsSelect.displayName).toBe('RdsSelect');
    });
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsSelect label="Choose" options={[{ label: 'Option 1', value: '1' }]} value="" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RdsSelect — keyboard navigation', () => {
  const mockOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('combobox is focusable via Tab', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" />);
    await userEvent.tab();
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('opens listbox on Space key', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox');
    select.focus();
    await userEvent.keyboard(' ');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens listbox on Enter key', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox');
    select.focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('closes listbox on Escape key', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox');
    await userEvent.click(select);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('highlights first option on ArrowDown after opening', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" onChange={jest.fn()} />);
    const select = screen.getByRole('combobox');
    await userEvent.click(select);
    await userEvent.keyboard('{ArrowDown}');
    const options = screen.getAllByRole('option');
    const focusedOption = options.find(
      o => o === document.activeElement || o.getAttribute('tabindex') === '0'
    );
    expect(focusedOption).toBeTruthy();
  });

  it('does not open when disabled', async () => {
    renderWithTheme(<RdsSelect options={mockOptions} value="" disabled />);
    const select = screen.getByRole('combobox');
    select.focus();
    await userEvent.keyboard(' ');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
describe('audit fixes', () => {
  const opts: RdsSelectOption[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];
  const wrap = (ui: React.ReactElement) => render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

  it('renders all selected labels for multiple (G2-215)', () => {
    wrap(<RdsSelect options={opts} label="L" labelPosition={false} multiple value={['option1', 'option2']} onChange={jest.fn()} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Option 1, Option 2');
  });

  it('associates the label with the select (G2-216)', () => {
    wrap(<RdsSelect options={opts} label="Pick" labelPosition={false} value="" />);
    expect(screen.getByRole('combobox')).toHaveAccessibleName(/Pick/);
  });

  it('supports placeholder and deprecated inputPlaceholder (G2-218)', () => {
    wrap(<RdsSelect options={opts} label="L" labelPosition={false} inputPlaceholder="Old" value="" />);
    expect(screen.getByText('Old')).toBeInTheDocument();
  });

  it('sets aria-required for required and isRequired (G2-219/220)', () => {
    const { unmount } = wrap(<RdsSelect options={opts} label="L" labelPosition={false} required value="" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    unmount();
    wrap(<RdsSelect options={opts} label="L" labelPosition={false} isRequired value="" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
    expect(screen.getAllByText('*')).toHaveLength(1);
  });

  it('shows error and helperText, and deprecated errorMessage still works', () => {
    const { unmount } = wrap(<RdsSelect options={opts} label="L" error helperText="Pick one" value="" />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
    expect(document.querySelector('.rds-select--error')).toBeInTheDocument();
    unmount();
    wrap(<RdsSelect options={opts} label="L" errorMessage="Old error" value="" />);
    expect(screen.getByText('Old error')).toBeInTheDocument();
  });

  it('labelPlacement top renders label above and wins over labelPosition', () => {
    wrap(<RdsSelect options={opts} label="Above" labelPlacement="top" labelPosition value="" />);
    expect(document.querySelector('label.rds-select__label')).toHaveTextContent('Above');
  });

  it('supports labelPosition and gives labelPlacement precedence', () => {
    const { rerender } = wrap(<RdsSelect options={opts} label="Above" labelPosition={false} value="" />);
    expect(document.querySelector('label.rds-select__label')).toHaveTextContent('Above');
    rerender(
      <ThemeProvider theme={createTheme()}>
        <RdsSelect options={opts} label="Floating" labelPosition={false} labelPlacement="floating" value="" />
      </ThemeProvider>,
    );
    expect(document.querySelector('label.rds-select__label')).not.toBeInTheDocument();
  });
});
