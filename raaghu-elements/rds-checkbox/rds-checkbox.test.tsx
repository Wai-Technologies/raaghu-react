import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCheckbox, { RdsCheckboxProps } from './rds-checkbox';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
import { axe } from 'jest-axe';

jest.mock('./rds-checkbox.scss', () => ({}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsCheckboxProps = {
  labelText: 'Test Checkbox',
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

    it('should render with label when labelText is provided', () => {
      renderWithTheme(<RdsCheckbox labelText="Test Label" showText={true} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render without label when labelText is not provided', () => {
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

    it('should apply CSSProperties from style to the wrapper', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} style={{ marginTop: '12px' }} />
      );
      expect(container.querySelector('.rds-checkbox')).toHaveStyle('margin-top: 12px');
    });
  });

  describe('Shape Variants', () => {
    it('should apply the square variant by default', () => {
      const { container } = renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should apply the square variant when explicitly set', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} variant="square" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should apply the circular variant when set', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} variant="circular" />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__circular');
    });

    it('should not apply variant class when variant is undefined', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} variant={undefined} />
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

    it('should apply disabled class when disabled is true', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} disabled />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__disabled');
    });

    it('does not add a state class for hover interactions', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} />
      );
      fireEvent.mouseEnter(screen.getByRole('checkbox'));
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).not.toHaveClass('rds-checkbox__hover');
    });

    it('should disable checkbox when disabled is true', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} disabled />);
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
        <RdsCheckbox labelText="Visible Label" showText={true} />
      );
      expect(screen.getByText('Visible Label')).toBeInTheDocument();
    });

    it('should hide label text when showText is false', () => {
      renderWithTheme(
        <RdsCheckbox labelText="Hidden Label" showText={false} />
      );
      expect(screen.queryByText('Hidden Label')).not.toBeInTheDocument();
    });

    it('should apply text-hidden class when labelText exists but showText is false', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox labelText="Test" showText={false} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__text-hidden');
    });

    it('should show text by default when showText is not specified', () => {
      renderWithTheme(<RdsCheckbox labelText="Default Text" />);
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
        <RdsCheckbox labelText="Test" isDisabled={true} />
      );
      const label = screen.getByText('Test').closest('label');
      expect(label).toHaveAttribute('class');
    });

    it('should support the deprecated isDisabled prop', () => {
      renderWithTheme(
        <RdsCheckbox {...defaultProps} isDisabled />
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
          variant="square"
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
          variant="circular"
          disabled
        />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__circular');
      expect(checkboxContainer).toHaveClass('rds-checkbox__disabled');
    });

    it('should handle multiple states and styles together', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox
          labelText="Complex"
          variant="circular"
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
          labelText="Complete"
          variant="square"
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
    it('should handle empty labelText', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} labelText="" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should handle labelText with special characters', () => {
      renderWithTheme(
        <RdsCheckbox labelText="Test & Special <Characters>" />
      );
      expect(screen.getByText('Test & Special <Characters>')).toBeInTheDocument();
    });

    it('should handle very long labelText', () => {
      const longText = 'A'.repeat(100);
      renderWithTheme(<RdsCheckbox labelText={longText} />);
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

    it('should handle checkbox without FormControlLabel when no labelText', () => {
      const { container } = renderWithTheme(<RdsCheckbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      const formLabel = container.querySelector('label');
      expect(formLabel).not.toBeInTheDocument();
    });

    it('should handle checkbox with FormControlLabel when labelText provided', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox labelText="With Label" />
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

    it('should support label association when labelText provided', () => {
      renderWithTheme(
        <RdsCheckbox labelText="Associated Label" />
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
          labelText="Test"
          variant="circular"
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
    it('should accept string labelText', () => {
      renderWithTheme(<RdsCheckbox labelText="String Label" />);
      expect(screen.getByText('String Label')).toBeInTheDocument();
    });

    it('should accept boolean isDisabled', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} isDisabled={true} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('should accept valid variant values', () => {
      const { container: container1 } = renderWithTheme(
        <RdsCheckbox {...defaultProps} variant="square" />
      );
      expect(container1.querySelector('.rds-checkbox__square')).toBeInTheDocument();

      const { container: container2 } = renderWithTheme(
        <RdsCheckbox {...defaultProps} variant="circular" />
      );
      expect(container2.querySelector('.rds-checkbox__circular')).toBeInTheDocument();
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
        <RdsCheckbox labelText="Test" showText={true} />
      );
      expect(screen.getByText('Test')).toBeInTheDocument();

      renderWithTheme(
        <RdsCheckbox labelText="Test2" showText={false} />
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

    it('should have variant as square by default', () => {
      const { container } = renderWithTheme(
        <RdsCheckbox {...defaultProps} />
      );
      const checkboxContainer = container.querySelector('.rds-checkbox');
      expect(checkboxContainer).toHaveClass('rds-checkbox__square');
    });

    it('should render by default without a visual state prop', () => {
      renderWithTheme(<RdsCheckbox {...defaultProps} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
    });

    it('should have showText as true by default', () => {
      renderWithTheme(
        <RdsCheckbox labelText="Default Text" />
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
    renderWithTheme(<RdsCheckbox labelText="Focus Test" showText />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('toggles checked state on Space key', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<RdsCheckbox labelText="Toggle" showText onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not toggle when disabled', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<RdsCheckbox labelText="Disabled" showText disabled onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    await userEvent.keyboard(' ');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('sets focus on the underlying checkbox input', async () => {
    renderWithTheme(<RdsCheckbox labelText="Input Focus" showText />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });
});
describe('RdsCheckbox audit fixes', () => {
  it('keeps the checked class in sync with a controlled checked prop (G1-197)', () => {
    const { container, rerender } = render(<RdsCheckbox checked onChange={() => {}} />);
    expect(container.querySelector('.rds-checkbox')).toHaveClass('rds-checkbox__checked');
    rerender(<RdsCheckbox checked={false} onChange={() => {}} />);
    expect(container.querySelector('.rds-checkbox')).not.toHaveClass('rds-checkbox__checked');
  });

  it('honours defaultChecked (G1-197)', () => {
    render(<RdsCheckbox label="Accept" defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('accepts label and disabled as the new names (G1-199/G1-200)', () => {
    render(<RdsCheckbox label="Terms" disabled />);
    expect(screen.getByLabelText('Terms')).toBeDisabled();
  });

  it('keeps an accessible name when the label text is hidden (G1-202)', () => {
    render(<RdsCheckbox label="Hidden label" showText={false} />);
    expect(screen.getByRole('checkbox', { name: 'Hidden label' })).toBeInTheDocument();
  });

  it('reports deprecated props to the deprecation helper', () => {
    render(<RdsCheckbox labelText="Old" isDisabled />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCheckbox', 'isDisabled', expect.any(String));
  });
});

describe('RdsCheckbox additive renames', () => {
  it('supports labelText and gives it precedence over label', () => {
    renderWithTheme(<RdsCheckbox labelText="Canonical" label="Existing" />);
    expect(screen.getByText('Canonical')).toBeInTheDocument();
    expect(screen.queryByText('Existing')).not.toBeInTheDocument();
  });

  it('uses variant over style for the shape', () => {
    const { container } = renderWithTheme(<RdsCheckbox label="A" variant="circular" style="square" />);
    expect(container.firstChild).toHaveClass('rds-checkbox__circular');
    expect(container.firstChild).not.toHaveClass('rds-checkbox__square');
  });

  it('accepts CSSProperties and a legacy variant string through style', () => {
    const { container, rerender } = renderWithTheme(<RdsCheckbox label="A" style={{ marginTop: '12px' }} />);
    expect(container.firstChild).toHaveStyle({ marginTop: '12px' });
    expect(container.firstChild).toHaveClass('rds-checkbox__square');
    rerender(<RdsCheckbox label="A" variant="circular" />);
    expect(container.firstChild).toHaveClass('rds-checkbox__circular');
  });

  it('supports the indeterminate prop', () => {
    const { container } = renderWithTheme(<RdsCheckbox label="A" indeterminate />);
    expect(container.firstChild).toHaveClass('rds-checkbox__indeterminate');
    expect(screen.getByRole('checkbox').getAttribute('data-indeterminate')).toBe('true');
  });

  it('forwards data-testid to the root .rds-checkbox', () => {
    renderWithTheme(<RdsCheckbox label="Accept" data-testid="terms-checkbox" />);
    expect(screen.getByTestId('terms-checkbox')).toHaveClass('rds-checkbox');
  });
});
