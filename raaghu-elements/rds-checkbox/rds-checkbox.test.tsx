import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCheckbox, { RdsCheckboxProps } from './rds-checkbox';
import { axe } from 'jest-axe';

// Mock SCSS imports
jest.mock('./rds-checkbox.scss', () => ({}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsCheckboxProps = {
  labeltext: 'Test Checkbox',
  showText: true,
};

describe('RdsCheckbox', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsCheckbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCheckbox.displayName).toBe('RdsCheckbox');
    });

    it('should render with label when labeltext is provided', () => {
      renderWithTheme(<RdsCheckbox labeltext="Test Label" showText={true} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render without label when labeltext is not provided', () => {
      renderWithTheme(<RdsCheckbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox className="custom-class" {...defaultProps} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('custom-class');
    });

    it('should apply base rds-checkbox class', () => {
      const { container } = renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox');
    });

    it('should render with custom CSS styles', () => {
      const customStyle = { marginTop: '16px', padding: '8px' };
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} cssStyle={customStyle} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveStyle('margin-top: 16px');
      expect(checkboxContainer).toHaveStyle('padding: 8px');
    });
  });

  describe('Style Variants', () => {
    it('should apply square style by default', () => {
      const { container } = renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should apply square style when explicitly set', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style="square" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should apply circular style when set', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style="circular" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__circular');
    });

    it('should not apply style class when style is undefined', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style={undefined} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).not.toHaveClass('rds-checkbox__undefined');
    });
  });

  describe('State Variants', () => {
    it('should render with default state by default', () => {
      const { container } = renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toBeInTheDocument();
    });

    it('should apply disabled state class when state is disabled', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} state="disabled" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__disabled');
    });

    it('should apply hover state class when state is hover', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} state="hover" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__hover');
    });

    it('should apply default state class when state is default', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} state="default" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toBeInTheDocument();
    });

    it('should disable checkbox when state is disabled', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} state="disabled" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  describe('Status Variants', () => {
    it('should render unchecked by default', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should render checked when status is checked', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} status="checked" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should apply checked class when status is checked', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} status="checked" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__checked');
    });

    it('should render unchecked when status is unchecked', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} status="unchecked" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should apply indeterminate state when status is indeterminate', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} status="indeterminate" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-indeterminate')).toBe('true');
    });

    it('should apply indeterminate class when status is indeterminate', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} status="indeterminate" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__indeterminate');
    });

    it('should apply status class to checkbox container', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} status="checked" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__checked');
    });
  });

  describe('Label Text Visibility', () => {
    it('should show label text when showText is true', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Visible Label" showText={true} />
      );
      expect(screen.getByText('Visible Label')).toBeInTheDocument();
    });

    it('should hide label text when showText is false', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Hidden Label" showText={false} />
      );
      expect(screen.queryByText('Hidden Label')).not.toBeInTheDocument();
    });

    it('should apply text-hidden class when labeltext exists but showText is false', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox labeltext="Test" showText={false} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__text-hidden');
    });

    it('should show text by default when showText is not specified', () => {
      renderWithTheme(<RdsCheckbox labeltext="Default Text" />);
      expect(screen.getByText('Default Text')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable checkbox when isDisabled is true', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should not disable checkbox when isDisabled is false', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });

    it('should apply disabled class when isDisabled is true', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} isDisabled={true} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__disabled');
    });

    it('should disable label when isDisabled is true', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Test" isDisabled={true} />
      );
      const label = screen.getByText('Test').closest('label');
      expect(label).toHaveAttribute('class');
    });

    it('should prioritize isDisabled over state', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} isDisabled={true} state="default" />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  describe('onChange Callback', () => {
    it('should call onChange when checkbox is clicked', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsCheckbox {...defaultProps} onChange={onChange} />
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalled();
    });

    it('should pass correct event and checked value to onChange', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsCheckbox {...defaultProps} onChange={onChange} />
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledWith(
        expect.any(Object),
        true
      );
    });

    it('should not call onChange when checkbox is disabled', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsCheckbox {...defaultProps} isDisabled={true} onChange={onChange} />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox).toBeDisabled();
    });

    it('should update checked state when clicked', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} status="unchecked" />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    it('should toggle checked state on multiple clicks', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} status="unchecked" />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Color Prop', () => {
    it('should accept color prop from MuiCheckbox', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} color="primary" />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should apply color class when color is provided', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} color="secondary" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__secondary');
    });

    it('should not apply color class when color is default', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} color="default" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).not.toHaveClass('rds-checkbox__primary');
    });
  });

  describe('Props Integration', () => {
    it('should accept additional MuiCheckbox props', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} inputProps={{ 'data-testid': 'custom-input' } as any} />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should forward props to MuiCheckbox', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} size="small" />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle checked prop from MuiCheckbox props', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle square style with checked status', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          {...defaultProps}
          style="square"
          status="checked"
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
      expect(checkboxContainer).toHaveClass('rds-checkbox__checked');
    });

    it('should handle circular style with disabled state', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          {...defaultProps}
          style="circular"
          state="disabled"
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__circular');
      expect(checkboxContainer).toHaveClass('rds-checkbox__disabled');
    });

    it('should handle multiple states and styles together', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          labeltext="Complex"
          style="circular"
          status="indeterminate"
          showText={true}
          color="primary"
          cssStyle={{ marginBottom: '12px' }}
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__circular');
      expect(checkboxContainer).toHaveClass('rds-checkbox__indeterminate');
      expect(checkboxContainer).toHaveClass('rds-checkbox__primary');
      expect(screen.getByText('Complex')).toBeInTheDocument();
    });

    it('should handle all props together', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsCheckbox
          labeltext="Complete"
          style="square"
          state="default"
          status="checked"
          showText={true}
          isDisabled={false}
          color="secondary"
          className="extra-class"
          cssStyle={{ padding: '10px' }}
          onChange={onChange}
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
      expect(checkboxContainer).toHaveClass('rds-checkbox__checked');
      expect(checkboxContainer).toHaveClass('extra-class');
      expect(screen.getByText('Complete')).toBeInTheDocument();
    });
  });

  describe('Status Changes', () => {
    it('should update checked state when status prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCheckbox {...defaultProps} status="unchecked" />
      );
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);

      rerender(
        <ThemeProvider theme={theme}>
          <RdsCheckbox {...defaultProps} status="checked" />
        </ThemeProvider>
      );
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('should update indeterminate state when status prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCheckbox {...defaultProps} status="checked" />
      );
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-indeterminate')).toBe('false');

      rerender(
        <ThemeProvider theme={theme}>
          <RdsCheckbox {...defaultProps} status="indeterminate" />
        </ThemeProvider>
      );
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-indeterminate')).toBe('true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty labeltext', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} labeltext="" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle labeltext with special characters', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Test & Special <Characters>" />
      );
      expect(screen.getByText('Test & Special <Characters>')).toBeInTheDocument();
    });

    it('should handle very long labeltext', () => {
      const longText = 'A'.repeat(100);
      renderWithTheme(<RdsCheckbox labeltext={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle undefined status', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} status={undefined} />
      );
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('should handle multiple onChange calls rapidly', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <RdsCheckbox {...defaultProps} onChange={onChange} />
      );
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it('should handle checkbox without FormControlLabel when no labeltext', () => {
      const { container } = renderWithTheme(<RdsCheckbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      const formLabel = container.querySelector('label');
      expect(formLabel).not.toBeInTheDocument();
    });

    it('should handle checkbox with FormControlLabel when labeltext provided', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox labeltext="With Label" />
      );
      const formLabel = container.querySelector('label');
      expect(formLabel).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCheckbox {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard accessible', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toHaveAttribute('disabled');
    });

    it('should have proper disabled attribute when disabled', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} isDisabled={true} />
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('disabled');
    });

    it('should support label association when labeltext provided', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Associated Label" />
      );
      const label = screen.getByText('Associated Label');
      expect(label).toBeInTheDocument();
    });

    it('should be focusable when not disabled', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={false} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toHaveAttribute('disabled');
    });

    it('should not be focusable when disabled', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('disabled');
    });
  });

  describe('Class Management', () => {
    it('should combine all classes correctly', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          labeltext="Test"
          style="circular"
          status="checked"
          color="primary"
          className="custom"
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      const classes = checkboxContainer?.className || '';
      expect(classes).toContain('rds-checkbox');
      expect(classes).toContain('rds-checkbox__circular');
      expect(classes).toContain('rds-checkbox__checked');
    });

    it('should not duplicate classes', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} className="custom" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      const classArray = checkboxContainer?.className.split(' ') || [];
      const uniqueClasses = new Set(classArray);
      expect(uniqueClasses.size).toBe(classArray.length);
    });
  });

  describe('Props Validation', () => {
    it('should accept string labeltext', () => {
      renderWithTheme(<RdsCheckbox labeltext="String Label" />);
      expect(screen.getByText('String Label')).toBeInTheDocument();
    });

    it('should accept boolean isDisabled', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should accept valid style values', () => {
      const { container: container1 } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style="square" />
      );
      expect(container1.querySelector('.rds-checkbox__square')).toBeInTheDocument();

      const { container: container2 } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style="circular" />
      );
      expect(container2.querySelector('.rds-checkbox__circular')).toBeInTheDocument();
    });

    it('should accept valid state values', () => {
      const { unmount } = renderWithTheme(<RdsCheckbox {...defaultProps} state="default" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      unmount();

      const { unmount: unmount2 } = renderWithTheme(<RdsCheckbox {...defaultProps} state="disabled" />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[checkboxes.length - 1]).toBeDisabled();
      unmount2();

      renderWithTheme(<RdsCheckbox {...defaultProps} state="hover" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should accept valid status values', () => {
      const { unmount } = renderWithTheme(<RdsCheckbox {...defaultProps} status="checked" />);
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
      unmount();

      const { unmount: unmount2 } = renderWithTheme(<RdsCheckbox {...defaultProps} status="unchecked" />);
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      unmount2();

      renderWithTheme(<RdsCheckbox {...defaultProps} status="indeterminate" />);
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.getAttribute('data-indeterminate')).toBe('true');
    });

    it('should accept boolean showText', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Test" showText={true} />
      );
      expect(screen.getByText('Test')).toBeInTheDocument();

      renderWithTheme(
        <RdsCheckbox labeltext="Test2" showText={false} />
      );
      expect(screen.queryByText('Test2')).not.toBeInTheDocument();
    });

    it('should accept CSSProperties for cssStyle', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          {...defaultProps}
          cssStyle={{ color: 'red', fontSize: '14px' }}
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveStyle('color: red');
      expect(checkboxContainer).toHaveStyle('font-size: 14px');
    });
  });

  describe('Default Props', () => {
    it('should have isDisabled as false by default', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeDisabled();
    });

    it('should have style as square by default', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should have state as default by default', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have showText as true by default', () => {
      renderWithTheme(
        <RdsCheckbox labeltext="Default Text" />
      );
      expect(screen.getByText('Default Text')).toBeInTheDocument();
    });

    it('should have status as undefined by default', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });
  });
});

describe('RdsCheckbox — keyboard navigation', () => {
  it('is focusable via Tab', async () => {
    renderWithTheme(<RdsCheckbox labeltext="Focus Test" showText />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('toggles checked state on Space key', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<RdsCheckbox labeltext="Toggle" showText onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not toggle when disabled', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<RdsCheckbox labeltext="Disabled" showText disabled onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await userEvent.keyboard(' ');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('sets focus on the underlying checkbox input', async () => {
    renderWithTheme(<RdsCheckbox labeltext="Input Focus" showText />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });
});