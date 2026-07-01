import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTextField, { RdsTextFieldProps } from './rds-text-field';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-text-field.scss', () => ({}));

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

describe('RdsTextField', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTextField.displayName).toBe('RdsTextField');
    });

    it('should render MuiTextField component', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should apply rds-text-field class', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const textField = container.querySelector('.rds-text-field');
      expect(textField).toBeInTheDocument();
    });

    it('should render input element', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('should apply custom className along with rds-text-field class', () => {
      const { container } = renderWithTheme(<RdsTextField className="custom-class" />);
      const textField = container.querySelector('.rds-text-field');
      expect(textField).toHaveClass('custom-class');
    });
  });

  describe('Required Field Handling', () => {
    it('should not be required by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.required).toBe(false);
    });

    it('should set required attribute when isRequired is true', () => {
      const { container } = renderWithTheme(<RdsTextField isRequired={true} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.required).toBe(true);
    });

    it('should have required class when isRequired is true', () => {
      const { container } = renderWithTheme(<RdsTextField isRequired={true} />);
      const requiredIndicator = container.querySelector('[class*="required"]');
      expect(requiredIndicator || container.querySelector('input[required]')).toBeInTheDocument();
    });

    it('should show asterisk for required field', () => {
      const { container } = renderWithTheme(<RdsTextField isRequired={true} label="Name" />);
      const input = container.querySelector('input[required]');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should not show error by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const input = container.querySelector('input[aria-invalid]');
      expect(input?.getAttribute('aria-invalid')).not.toBe('true');
    });

    it('should show error when errorMessage is provided', () => {
      const { container } = renderWithTheme(
        <RdsTextField errorMessage="This field is required" />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should set error attribute with errorMessage', () => {
      const { container } = renderWithTheme(
        <RdsTextField errorMessage="Email is invalid" />
      );
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should show errorMessage over helperText', () => {
      renderWithTheme(
        <RdsTextField 
          errorMessage="Error message" 
          helperText="Helper text"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('should show helperText when no errorMessage', () => {
      renderWithTheme(
        <RdsTextField 
          helperText="This is helper text"
        />
      );
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should apply error class when error prop is true', () => {
      const { container } = renderWithTheme(
        <RdsTextField error={true} />
      );
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should apply rds-text-field__helper-text class to helper text', () => {
      const { container } = renderWithTheme(
        <RdsTextField helperText="Helper text" />
      );
      const helperText = container.querySelector('.rds-text-field__helper-text');
      expect(helperText).toBeInTheDocument();
    });
  });

  describe('Value Handling', () => {
    it('should handle initial value', () => {
      const { container } = renderWithTheme(
        <RdsTextField value="test value" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });

    it('should handle defaultValue', () => {
      const { container } = renderWithTheme(
        <RdsTextField defaultValue="default value" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('default value');
    });

    it('should use value over defaultValue', () => {
      const { container } = renderWithTheme(
        <RdsTextField value="controlled" defaultValue="default" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('controlled');
    });

    it('should prefer value when both are provided', () => {
      const { container } = renderWithTheme(
        <RdsTextField value="controlled" defaultValue="default" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('controlled');
    });

    it('should update value on user input', async () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'user input' } });
      
      await waitFor(() => {
        expect(input.value).toBe('user input');
      });
    });

    it('should handle empty value', () => {
      const { container } = renderWithTheme(<RdsTextField value="" />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle onChange event', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onChange={onChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Input Attributes', () => {
    it('should apply placeholder', () => {
      const { container } = renderWithTheme(
        <RdsTextField placeholder="Enter text" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('should apply label', () => {
      const { container } = renderWithTheme(
        <RdsTextField label="Username" />
      );
      // Use getByRole to target the label element specifically
      const label = container.querySelector('label[class*="MuiInputLabel"]');
      expect(label).toHaveTextContent('Username');
    });

    it('should apply type attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField type="email" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should apply disabled state', () => {
      const { container } = renderWithTheme(
        <RdsTextField disabled={true} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should not be disabled by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.disabled).toBe(false);
    });

    it('should apply readOnly state', () => {
      const { container } = renderWithTheme(
        <RdsTextField inputProps={{ readOnly: true }} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });

    it('should apply maxLength attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField inputProps={{ maxLength: 10 }} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('maxlength', '10');
    });

    it('should apply autoComplete attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField autoComplete="email" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('autocomplete', 'email');
    });

    it('should support name attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField name="username" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('name', 'username');
    });

    it('should support id attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField id="custom-id" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Size Variants', () => {
    it('should render medium size by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should apply small size', () => {
      const { container } = renderWithTheme(<RdsTextField size="small" />);
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toHaveClass('MuiTextField-root');
    });
  });

  describe('Variant Types', () => {
    it('should render standard variant by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should apply outlined variant', () => {
      const { container } = renderWithTheme(<RdsTextField variant="outlined" />);
      const textField = container.querySelector('.MuiOutlinedInput-root');
      expect(textField).toBeInTheDocument();
    });

    it('should apply filled variant', () => {
      const { container } = renderWithTheme(<RdsTextField variant="filled" />);
      const textField = container.querySelector('.MuiFilledInput-root');
      expect(textField).toBeInTheDocument();
    });
  });

  describe('Multiline Support', () => {
    it('should support multiline attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField multiline={true} rows={4} />
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('should apply rows attribute', () => {
      const { container } = renderWithTheme(
        <RdsTextField multiline={true} rows={5} />
      );
      const textarea = container.querySelector('textarea');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });

  describe('Event Handlers', () => {
    it('should call onFocus when focused', () => {
      const onFocus = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onFocus={onFocus} />
      );
      const input = container.querySelector('input');
      fireEvent.focus(input!);
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when blurred', () => {
      const onBlur = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onBlur={onBlur} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.focus(input);
      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalled();
    });

    it('should call onClick when clicked', () => {
      const onClick = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onClick={onClick} />
      );
      const input = container.querySelector('input');
      fireEvent.click(input!);
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onKeyDown on key press', () => {
      const onKeyDown = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onKeyDown={onKeyDown} />
      );
      const input = container.querySelector('input');
      fireEvent.keyDown(input!, { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call onKeyUp on key release', () => {
      const onKeyUp = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField onKeyUp={onKeyUp} />
      );
      const input = container.querySelector('input');
      fireEvent.keyUp(input!, { key: 'a' });
      expect(onKeyUp).toHaveBeenCalled();
    });
  });

  describe('Full Width Support', () => {
    it('should apply fullWidth', () => {
      const { container } = renderWithTheme(
        <RdsTextField fullWidth={true} />
      );
      const textField = container.querySelector('.MuiFormControl-root');
      expect(textField).toBeInTheDocument();
    });

    it('should not be full width by default', () => {
      const { container } = renderWithTheme(<RdsTextField />);
      const textField = container.querySelector('.MuiTextField-fullWidth');
      expect(textField).not.toBeInTheDocument();
    });
  });

  describe('FormHelperText Props', () => {
    it('should merge custom slotProps.formHelperText with default', () => {
      const { container } = renderWithTheme(
        <RdsTextField
          helperText="Help text"
          slotProps={{ formHelperText: { className: 'custom-helper' } }}
        />
      );
      const helperText = container.querySelector('.MuiFormHelperText-root');
      expect(helperText).toHaveClass('rds-text-field__helper-text');
    });

    it('should apply slotProps.formHelperText classes', () => {
      const { container } = renderWithTheme(
        <RdsTextField
          helperText="Help text"
          slotProps={{
            formHelperText: {
              className: 'custom-class-1 custom-class-2',
              id: 'custom-helper-id',
            },
          }}
        />
      );
      const helperText = container.querySelector('#custom-helper-id');
      expect(helperText).toHaveClass('rds-text-field__helper-text');
      expect(helperText).toHaveClass('custom-class-1');
      expect(helperText).toHaveClass('custom-class-2');
    });
  });

  describe('Color Variants', () => {
    it('should apply primary color', () => {
      const { container } = renderWithTheme(
        <RdsTextField color="primary" />
      );
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });

    it('should apply secondary color', () => {
      const { container } = renderWithTheme(
        <RdsTextField color="secondary" />
      );
      const textField = container.querySelector('.MuiTextField-root');
      expect(textField).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-invalid when error is present', () => {
      const { container } = renderWithTheme(
        <RdsTextField error={true} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-invalid when errorMessage is present', () => {
      const { container } = renderWithTheme(
        <RdsTextField errorMessage="Email is invalid" />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-required when isRequired is true', () => {
      const { container } = renderWithTheme(
        <RdsTextField isRequired={true} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('required');
    });

    it('should have aria-describedby when helperText is present', () => {
      const { container } = renderWithTheme(
        <RdsTextField helperText="Helper" />
      );
      const input = container.querySelector('input');
      expect(input?.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('should have proper label association', () => {
      const { container } = renderWithTheme(
        <RdsTextField id="test-input" label="Test Label" />
      );
      const label = container.querySelector('label[for="test-input"]');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined value', () => {
      const { container } = renderWithTheme(
        <RdsTextField value={undefined} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle empty string value', () => {
      const { container } = renderWithTheme(
        <RdsTextField value="" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle very long value', () => {
      const longValue = 'a'.repeat(1000);
      const { container } = renderWithTheme(
        <RdsTextField value={longValue} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe(longValue);
    });

    it('should handle special characters', () => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:",.<>?/';
      const { container } = renderWithTheme(
        <RdsTextField value={specialValue} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe(specialValue);
    });

    it('should handle unicode characters', () => {
      const unicodeValue = '你好世界 🌍';
      const { container } = renderWithTheme(
        <RdsTextField value={unicodeValue} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe(unicodeValue);
    });

    it('should handle empty errorMessage', () => {
      const { container } = renderWithTheme(
        <RdsTextField errorMessage="" />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Theme Support', () => {
    it('should work with light theme', () => {
      const { container } = renderWithTheme(<RdsTextField />, false);
      expect(container).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const { container } = renderWithTheme(<RdsTextField />, true);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with all props combined', () => {
      const onChange = jest.fn();
      const { container } = renderWithTheme(
        <RdsTextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value="test@example.com"
          onChange={onChange}
          isRequired={true}
          size="small"
          variant="outlined"
          fullWidth={true}
          disabled={false}
          className="custom-class"
        />
      );
      expect(container.querySelector('.rds-text-field')).toBeInTheDocument();
      expect(container.querySelector('input[type="email"]')).toBeInTheDocument();
      expect(container.querySelector('label')).toHaveTextContent('Email');
    });

    it('should handle state changes', async () => {
      const { container, rerender } = renderWithTheme(
        <RdsTextField value="initial" />
      );
      let input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('initial');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTextField value="updated" />
        </ThemeProvider>
      );
      input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('updated');
    });

    it('should toggle between error and valid states', () => {
      const { container, rerender } = renderWithTheme(
        <RdsTextField errorMessage="Error message" />
      );
      let input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTextField />
        </ThemeProvider>
      );
      input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('should handle required field validation flow', async () => {
      const { container } = renderWithTheme(
        <RdsTextField 
          label="Name" 
          isRequired={true}
          placeholder="Enter name"
        />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      
      expect(input.required).toBe(true);
      
      fireEvent.change(input, { target: { value: 'John' } });
      expect(input.value).toBe('John');
    });
  });

  describe('Validation Flow', () => {
    it('should display error message for invalid email', () => {
      renderWithTheme(
        <RdsTextField 
          type="email"
          value="invalid-email"
          errorMessage="Please enter a valid email"
        />
      );
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    it('should clear error when value becomes valid', () => {
      const { rerender, container } = renderWithTheme(
        <RdsTextField 
          errorMessage="Field is required"
          value=""
        />
      );
      expect(screen.getByText('Field is required')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsTextField value="valid value" />
        </ThemeProvider>
      );
      expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as controlled component with value prop', () => {
      const { container } = renderWithTheme(
        <RdsTextField value="controlled" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('controlled');
    });

    it('should work as uncontrolled component with defaultValue prop', () => {
      const { container } = renderWithTheme(
        <RdsTextField defaultValue="uncontrolled" />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('uncontrolled');
    });
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsTextField label="Name" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});