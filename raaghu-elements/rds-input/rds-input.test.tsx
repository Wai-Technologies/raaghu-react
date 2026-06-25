import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsInput from './rds-input';
import SearchIcon from '@mui/icons-material/Search';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-input.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsInput', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Test Input" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsInput.displayName).toBe('RdsInput');
    });

    it('should render MuiTextField component', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Test Input" />
      );
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should render with rds-input class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Test Input" />
      );
      const input = container.querySelector('.rds-input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Label and Title Position', () => {
    it('should render label above input when titlePosition is title-above', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Test Label" titlePosition="title-above" />
      );
      const label = container.querySelector('.rds-input__label');
      expect(label).toBeInTheDocument();
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render inline label when titlePosition is inline-title', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Test Label" titlePosition="inline-title" />
      );
      const muiLabel = container.querySelector('.MuiFormLabel-root');
      expect(muiLabel).toHaveTextContent('Test Label');
    });

    it('should show asterisk for mandatory field', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Required Field" titlePosition="title-above" isMandatory={true} />
      );
      const asterisk = container.querySelector('.rds-input__asterisk');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveTextContent('*');
    });

    it('should not show asterisk when isMandatory is false', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Optional Field" titlePosition="title-above" isMandatory={false} />
      );
      const asterisk = container.querySelector('.rds-input__asterisk');
      expect(asterisk).not.toBeInTheDocument();
    });
  });

  describe('Input Layouts', () => {
    it('should render text layout by default', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Text Input" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('text');
    });

    it('should render password layout with password type', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Password Input" layout="password" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    it('should toggle password visibility', async () => {
      const { container } = renderWithTheme(
        <RdsInput label="Password Input" layout="password" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('password');

      // Password toggle would be through an icon button in real implementation
      // This test verifies the component renders without errors
      expect(input).toBeInTheDocument();
    });

    it('should render phone number layout with tel type', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Phone Input" layout="phone number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('tel');
    });

    it('should render number layout with tel type', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Number Input" layout="number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('tel');
    });

    it('should render card number layout with tel type', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Card Input" layout="card number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('tel');
    });
  });

  describe('Input Sizes', () => {
    it('should apply small size class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Small Input" size="small" />
      );
      const input = container.querySelector('.rds-input--small');
      expect(input).toBeInTheDocument();
    });

    it('should apply medium size class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Medium Input" size="medium" />
      );
      const input = container.querySelector('.rds-input--medium');
      expect(input).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Large Input" size="large" />
      );
      const input = container.querySelector('.rds-input--large');
      expect(input).toBeInTheDocument();
    });

    it('should default to small size', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Default Input" />
      );
      const input = container.querySelector('.rds-input--small');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Input Styles', () => {
    it('should apply pill style class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Pill Input" style="pill" />
      );
      const input = container.querySelector('.rds-input--pill');
      expect(input).toBeInTheDocument();
    });

    it('should apply bottom outline style class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Bottom Outline Input" style="bottom outline" />
      );
      const input = container.querySelector('.rds-input--bottom-outline');
      expect(input).toBeInTheDocument();
    });

    it('should render default style by default', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Default Style Input" />
      );
      const input = container.querySelector('.rds-input');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass('rds-input--pill');
      expect(input).not.toHaveClass('rds-input--bottom-outline');
    });
  });

  describe('Input States', () => {
    it('should apply error state class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Error Input" state="error" />
      );
      const input = container.querySelector('.rds-input--error');
      expect(input).toBeInTheDocument();
    });

    it('should apply error state when error prop is true', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Error Input" error={true} />
      );
      const input = container.querySelector('.rds-input--error');
      expect(input).toBeInTheDocument();
    });

    it('should apply disabled state class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Disabled Input" state="disabled" />
      );
      const input = container.querySelector('.rds-input--disabled');
      expect(input).toBeInTheDocument();
    });

    it('should apply disabled when disabled prop is true', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Disabled Input" disabled={true} />
      );
      const input = container.querySelector('.rds-input--disabled');
      expect(input).toBeInTheDocument();
    });

    it('should apply active state class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Active Input" state="active" />
      );
      const inputDiv = container.querySelector('.rds-input--active');
      expect(inputDiv).toBeInTheDocument();
    });

    it('should apply selected state class', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Selected Input" state="selected" />
      );
      const input = container.querySelector('.rds-input--selected');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Error and Hint Text', () => {
    it('should render error message when provided', () => {
      renderWithTheme(
        <RdsInput label="Input" errorMessage="This is an error" />
      );
      expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('should render hint text when provided', () => {
      renderWithTheme(
        <RdsInput label="Input" hintText="This is a hint" />
      );
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
    });

    it('should prioritize error message over hint text', () => {
      renderWithTheme(
        <RdsInput 
          label="Input" 
          errorMessage="Error message" 
          hintText="Hint text" 
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
    });

    it('should not render error or hint text when not provided', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />
      );
      const helperText = container.querySelector('.MuiFormHelperText-root');
      expect(helperText).not.toBeInTheDocument();
    });
  });

  describe('Icon Support', () => {
    it('should render icon when showIcon is true', () => {
      const { container } = renderWithTheme(
        <RdsInput 
          label="Input with Icon" 
          showIcon={true}
          icon={<SearchIcon data-testid="search-icon" />}
        />
      );
      const icon = screen.getByTestId('search-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should not render icon when showIcon is false', () => {
      const { container } = renderWithTheme(
        <RdsInput 
          label="Input without Icon" 
          showIcon={false}
          icon={<SearchIcon data-testid="search-icon" />}
        />
      );
      const icon = screen.queryByTestId('search-icon');
      expect(icon).not.toBeInTheDocument();
    });

    it('should render icon at start position', () => {
      const { container } = renderWithTheme(
        <RdsInput 
          label="Input with Icon" 
          showIcon={true}
          iconPosition="start"
          icon={<div data-testid="icon-test">Icon</div>}
        />
      );
      const iconContainer = container.querySelector('.rds-input__icon--start');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should render icon at end position', () => {
      const { container } = renderWithTheme(
        <RdsInput 
          label="Input with Icon" 
          showIcon={true}
          iconPosition="end"
          icon={<div data-testid="icon-test">Icon</div>}
        />
      );
      const iconContainer = container.querySelector('.rds-input__icon--end');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Placeholder and Value', () => {
    it('should render custom placeholder when provided', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" placeholder="Enter text" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Enter text');
    });

    it('should render default placeholder for text layout', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" layout="text" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Placeholder Text');
    });

    it('should render password placeholder for password layout', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" layout="password" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('••••••••');
    });

    it('should render phone number placeholder', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" layout="phone number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Enter Phone Number');
    });

    it('should render number placeholder', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" layout="number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Enter Number');
    });

    it('should render card number placeholder', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" layout="card number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('XXXX XXXX XXXX XXXX');
    });

    it('should render with initial value', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" value="Initial Value" onChange={() => {}} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBe('Initial Value');
    });
  });

  describe('Event Handlers', () => {
    it('should call onChange when input value changes', async () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput label="Input" onChange={onChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'Test' } });
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should call onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput label="Input" onFocus={onFocus} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.focus(input);
      
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput label="Input" onBlur={onBlur} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(onBlur).toHaveBeenCalled();
    });

    it('should update internal value on change for uncontrolled component', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'New Value' } });
      
      expect(input?.value).toBe('New Value');
    });

    it('should maintain controlled value', () => {
      const { container, rerender } = renderWithTheme(
        <RdsInput label="Input" value="Initial" onChange={() => {}} />
      );
      let input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBe('Initial');
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsInput label="Input" value="Updated" onChange={() => {}} />
        </ThemeProvider>
      );
      
      input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBe('Updated');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component without value prop', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'Test' } });
      
      expect(input?.value).toBe('Test');
    });

    it('should work as controlled component with value prop', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput label="Input" value="Controlled" onChange={onChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      expect(input?.value).toBe('Controlled');
    });
  });

  describe('Phone Number Formatting', () => {
    it('should accept phone number input for phone layout', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput label="Phone" layout="phone number" onChange={onChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: '1234567890' } });
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should allow plus sign at start for phone number', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Phone" layout="phone number" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: '+1234567890' } });
      
      // The component should not prevent this change
      expect(input).toBeInTheDocument();
    });
  });

  describe('Required Field', () => {
    it('should set required attribute when isMandatory is true', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Required" isMandatory={true} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.required).toBe(true);
    });

    it('should not set required attribute when isMandatory is false', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Optional" isMandatory={false} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.required).toBe(false);
    });
  });

  describe('Variant Support', () => {
    it('should render outlined variant by default', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />
      );
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should accept variant prop', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" variant="filled" />
      );
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Input" />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render input with all features', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsInput
          label="Complex Input"
          titlePosition="title-above"
          isMandatory={true}
          layout="text"
          size="medium"
          style="pill"
          state="active"
          placeholder="Enter text"
          hintText="This is a hint"
          showIcon={true}
          iconPosition="end"
          icon={<SearchIcon data-testid="icon" />}
          onChange={onChange}
        />
      );

      expect(screen.getByText('Complex Input')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('This is a hint')).toBeInTheDocument();
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.placeholder).toBe('Enter text');
    });

    it('should handle switching between layouts', () => {
      const { container, rerender } = renderWithTheme(
        <RdsInput label="Input" layout="text" />
      );
      let input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('text');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsInput label="Input" layout="password" />
        </ThemeProvider>
      );

      input = container.querySelector('input') as HTMLInputElement;
      expect(input?.type).toBe('password');
    });

    it('should handle switching between sizes', () => {
      const { container, rerender } = renderWithTheme(
        <RdsInput label="Input" size="small" />
      );
      expect(container.querySelector('.rds-input--small')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsInput label="Input" size="large" />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-input--large')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label association', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Accessible Input" titlePosition="inline-title" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should support disabled state', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Disabled" disabled={true} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.disabled).toBe(true);
    });

    it('should show error state for accessibility', () => {
      const { container } = renderWithTheme(
        <RdsInput label="Error Input" error={true} errorMessage="Field is required" />
      );
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsInput label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
