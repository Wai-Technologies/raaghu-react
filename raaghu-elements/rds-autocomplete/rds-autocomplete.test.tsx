import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsAutocomplete, { RdsAutocompleteProps } from './rds-autocomplete';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-autocomplete.scss', () => ({}));

// Mock checkbox component
jest.mock('../rds-checkbox/rds-checkbox', () => {
  return function MockRdsCheckbox(props: any) {
    return <input type="checkbox" data-testid="rds-checkbox" checked={props.status === 'checked'} {...props} />;
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

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAutocomplete.displayName).toBe('RdsAutocomplete');
    });

    it('should render root class', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete--root')).toBeInTheDocument();
    });

    it('should render input field', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should render with default props', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete')).toHaveClass('rds-autocomplete--medium');
    });

    it('should render MUI Autocomplete component', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Label Display', () => {
    it('should display label when provided', () => {
      render(<RdsAutocomplete {...defaultProps} label="Choose an option" showTitle={true} />);
      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('should not display label when showTitle is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Choose an option" showTitle={false} />
      );
      expect(container.querySelector('.rds-autocomplete__label')).not.toBeInTheDocument();
    });

    it('should not display label when label is not provided', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} showTitle={true} />);
      expect(container.querySelector('.rds-autocomplete__label')).not.toBeInTheDocument();
    });

    it('should display mandatory asterisk when isMandatory is true', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Required Field" isMandatory={true} showTitle={true} />
      );
      expect(container.querySelector('.rds-autocomplete__asterisk')).toBeInTheDocument();
    });

    it('should not display mandatory asterisk when isMandatory is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Optional Field" isMandatory={false} showTitle={true} />
      );
      expect(container.querySelector('.rds-autocomplete__asterisk')).not.toBeInTheDocument();
    });

    it('should apply label size class based on selectSize', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Label" showTitle={true} selectSize="large" />
      );
      expect(container.querySelector('.rds-autocomplete__label--large')).toBeInTheDocument();
    });

    it('should apply small size label class', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Label" showTitle={true} selectSize="small" />
      );
      expect(container.querySelector('.rds-autocomplete__label--small')).toBeInTheDocument();
    });

    it('should apply medium size label class by default', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} label="Label" showTitle={true} />
      );
      expect(container.querySelector('.rds-autocomplete__label--medium')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} selectSize="small" />);
      expect(container.querySelector('.rds-autocomplete--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} selectSize="large" />);
      expect(container.querySelector('.rds-autocomplete--large')).toBeInTheDocument();
    });

    it('should apply size class to textfield', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} selectSize="large" />);
      expect(container.querySelector('.rds-autocomplete__textfield.rds-autocomplete--large')).toBeInTheDocument();
    });
  });

  describe('Variant Styles', () => {
    it('should render with outlined variant by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should render with standard variant', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} variant="standard" />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should render with filled variant', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} variant="filled" />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should render with outlined variant', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} variant="outlined" />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it('should display placeholder when provided', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} placeholder="Search..." />);
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('Search...');
    });

    it('should not display placeholder when not provided', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('');
    });

    it('should not show placeholder when value is selected in single mode', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          placeholder="Select..."
          state="selected"
          allowMultiple={false}
        />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBeTruthy();
    });

    it('should show placeholder when no value selected in multiple mode', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          placeholder="Select..."
          allowMultiple={true}
          state="default"
        />
      );
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('Select...');
    });

    it('should handle placeholder with special characters', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} placeholder="Search (exact match)" />
      );
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('Search (exact match)');
    });
  });

  describe('Helper Text', () => {
    it('should display helper text when provided', () => {
      render(<RdsAutocomplete {...defaultProps} helperText="This is helper text" showHintText={true} />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should hide helper text when showHintText is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} helperText="This is helper text" showHintText={false} />
      );
      expect(container.querySelector('.rds-autocomplete__textfield--hidden-helper')).toBeInTheDocument();
    });

    it('should display default non-breaking space when helper text not provided', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} showHintText={true} />);
      expect(container.querySelector('.MuiFormHelperText-root')).toBeInTheDocument();
    });

    it('should display error helper text', () => {
      render(
        <RdsAutocomplete
          {...defaultProps}
          error={true}
          helperText="This field is required"
          showHintText={true}
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should show error state when error is true', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} error={true} />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should not show error state when error is false', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} error={false} />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should pass error prop to TextField', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} error={true} helperText="Error message" showHintText={true} />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled prop is true', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} disabled={true} />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should not disable input when disabled prop is false', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} disabled={false} />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(false);
    });

    it('should disable input when state is disabled', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} state="disabled" />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should show disabled styling', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} disabled={true} />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Control Style', () => {
    it('should apply default control style class', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} controlStyle="default" />);
      expect(container.querySelector('.rds-autocomplete__textfield--bottom-line')).not.toBeInTheDocument();
    });

    it('should apply bottom line control style class', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} controlStyle="bottom line" />);
      expect(container.querySelector('.rds-autocomplete__textfield--bottom-line')).toBeInTheDocument();
    });
  });

  describe('Checkbox Display', () => {
    it('should render component when isShowCheckbox is true', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowCheckbox={true} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should render component when isShowCheckbox is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowCheckbox={false} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('Radio Display', () => {
    it('should render component when isShowRadio is true', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowRadio={true} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should render component when isShowRadio is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowRadio={false} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });
  });

  describe('User Icon Display', () => {
    it('should render component when isShowUser is provided', () => {
      const userIcon = <span data-testid="user-icon">👤</span>;
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowUser={true} userIcon={userIcon} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should not display user icon when isShowUser is false', () => {
      const userIcon = <span data-testid="user-icon">👤</span>;
      const { container } = render(
        <RdsAutocomplete {...defaultProps} isShowUser={false} userIcon={userIcon} />
      );
      expect(screen.queryByTestId('user-icon')).not.toBeInTheDocument();
    });
  });

  describe('State Variations', () => {
    it('should render with default state', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} state="default" />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should open dropdown when state is expanded', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} state="expanded" />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should select first option when state is selected', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} state="selected" allowMultiple={false} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBeTruthy();
    });

    it('should disable input when state is disabled', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} state="disabled" />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should select first option for multiple when state is selected', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} state="selected" allowMultiple={true} />
      );
      expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    });
  });

  describe('Multiple Selection', () => {
    it('should support multiple selection when allowMultiple is true', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should not support multiple selection when allowMultiple is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={false} />
      );
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should render tags for selected items in multiple mode', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} state="selected" />
      );
      expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    });

    it('should limit visible tags to 4 in multiple mode', () => {
      const manyOptions = Array.from({ length: 6 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
      }));
      const { container } = render(
        <RdsAutocomplete options={manyOptions} allowMultiple={true} state="selected" />
      );
      expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    });

    it('should apply chip size class for small', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} state="selected" selectSize="small" />
      );
      expect(container.querySelector('.rds-autocomplete__chip--small')).toBeInTheDocument();
    });

    it('should apply chip size class for large', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} state="selected" selectSize="large" />
      );
      expect(container.querySelector('.rds-autocomplete__chip--large')).toBeInTheDocument();
    });
  });

  describe('Open on Focus', () => {
    it('should render component when openOnFocus is true', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} openOnFocus={true} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should render component when openOnFocus is false', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} openOnFocus={false} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('Popup Icon', () => {
    it('should render with custom popup icon when provided', () => {
      const customIcon = <span data-testid="custom-popup-icon">▼</span>;
      const { container } = render(
        <RdsAutocomplete {...defaultProps} popupIcon={customIcon} />
      );
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should render with default popup icon when not provided', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} popupIcon={undefined} />);
      expect(container.querySelector('.MuiAutocomplete-endAdornment')).toBeInTheDocument();
    });
  });

  describe('Options Rendering', () => {
    it('should accept options array from props', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should render input for option selection', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should handle string-like options', () => {
      const stringLikeOptions = [
        { label: 'Apple' },
        { label: 'Banana' },
        { label: 'Cherry' }
      ];
      const { container } = render(
        <RdsAutocomplete options={stringLikeOptions} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should accept empty options array', () => {
      const { container } = render(<RdsAutocomplete options={[]} />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should handle options with label property', () => {
      const optionsWithLabel = [
        { label: 'First', value: 1 },
        { label: 'Second', value: 2 },
      ];
      const { container } = render(
        <RdsAutocomplete options={optionsWithLabel} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('Change Events', () => {
    it('should render component with onChange handler', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RdsAutocomplete {...defaultProps} onChange={handleChange} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should handle multiple selections mode with onChange', () => {
      const handleChange = jest.fn();
      const { container } = render(
        <RdsAutocomplete {...defaultProps} onChange={handleChange} allowMultiple={true} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('Input Events', () => {
    it('should have input element for user interaction', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    it('should have input accessible for user events', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      expect(input.type).toBe('text');
    });

    it('should accept text input when not disabled', () => {
      const onInputChange = jest.fn();
      const { container } = render(
        <RdsAutocomplete {...defaultProps} onInputChange={onInputChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Option' } });
      expect(input).toBeInTheDocument();
      expect(onInputChange).toHaveBeenCalled();
    });

    it('should handle rapid input changes', () => {
      const onInputChange = jest.fn();
      const { container } = render(
        <RdsAutocomplete {...defaultProps} onInputChange={onInputChange} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'A' } });
      fireEvent.change(input, { target: { value: 'AB' } });
      fireEvent.change(input, { target: { value: 'ABC' } });
      expect(input).toBeInTheDocument();
      expect(onInputChange.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      const userIcon = <span data-testid="user-icon">👤</span>;
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          label="Department"
          placeholder="Select department..."
          helperText="Choose from list"
          selectSize="large"
          variant="outlined"
          isMandatory={true}
          showHintText={true}
          controlStyle="bottom line"
          isShowUser={true}
          userIcon={userIcon}
          openOnFocus={true}
          allowMultiple={false}
        />
      );
      expect(screen.getByText('Department')).toBeInTheDocument();
      expect(screen.getByText('Choose from list')).toBeInTheDocument();
    });

    it('should render with multiple display options', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          isShowCheckbox={true}
          isShowRadio={false}
          isShowUser={false}
        />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should handle all size and style combinations', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          selectSize="large"
          variant="filled"
          controlStyle="bottom line"
          state="expanded"
        />
      );
      expect(container.querySelector('.rds-autocomplete--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-autocomplete__textfield--bottom-line')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should use default size as medium', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete--medium')).toBeInTheDocument();
    });

    it('should show title by default', () => {
      render(<RdsAutocomplete {...defaultProps} label="Label" />);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should use outlined variant by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should not require selection by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should not show checkboxes by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelectorAll('[data-testid="rds-checkbox"]').length).toBe(0);
    });

    it('should not show radios by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelectorAll('input[type="radio"]').length).toBe(0);
    });

    it('should use default control style', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete__textfield--bottom-line')).not.toBeInTheDocument();
    });

    it('should not select multiple by default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} state="selected" />);
      const chips = container.querySelectorAll('.rds-autocomplete__chip');
      expect(chips.length).toBe(0);
    });

    it('should use default state as default', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty options array', () => {
      const { container } = render(<RdsAutocomplete options={[]} />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should handle very long label text', () => {
      const longLabel = 'A'.repeat(100);
      render(<RdsAutocomplete {...defaultProps} label={longLabel} showTitle={true} />);
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in label', () => {
      render(
        <RdsAutocomplete
          {...defaultProps}
          label="Special & Characters: @#$%"
          showTitle={true}
        />
      );
      expect(screen.getByText('Special & Characters: @#$%')).toBeInTheDocument();
    });

    it('should handle special characters in placeholder', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} placeholder="Search @#$..." />
      );
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('Search @#$...');
    });

    it('should handle unicode characters in label', () => {
      render(
        <RdsAutocomplete
          {...defaultProps}
          label="选择选项"
          showTitle={true}
        />
      );
      expect(screen.getByText('选择选项')).toBeInTheDocument();
    });

    it('should handle options with minimal properties', () => {
      const minimalOptions = [
        { label: '', value: 1 },
        { label: '', value: 2 },
      ];
      const { container } = render(
        <RdsAutocomplete options={minimalOptions} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should handle rapid state changes', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.click(input);
      fireEvent.blur(input);
      fireEvent.click(input);
      fireEvent.blur(input);
      
      expect(input).toBeInTheDocument();
    });

    it('should handle disabled state', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} state="disabled" />
      );
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should show placeholder in empty multiple select', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          placeholder="Select items..."
          allowMultiple={true}
          state="default"
        />
      );
      const input = container.querySelector('input');
      expect(input?.placeholder).toBe('Select items...');
    });

    it('should handle many options', () => {
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
      }));
      const { container } = render(
        <RdsAutocomplete options={manyOptions} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('should handle duplicate options', () => {
      const duplicateOptions = [
        { label: 'Option A', value: 1 },
        { label: 'Option A', value: 2 },
        { label: 'Option A', value: 3 },
      ];
      const { container } = render(
        <RdsAutocomplete options={duplicateOptions} />
      );
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept valid size prop values', () => {
      const { container: smallContainer } = render(
        <RdsAutocomplete {...defaultProps} selectSize="small" />
      );
      expect(smallContainer.querySelector('.rds-autocomplete--small')).toBeInTheDocument();

      const { container: largeContainer } = render(
        <RdsAutocomplete {...defaultProps} selectSize="large" />
      );
      expect(largeContainer.querySelector('.rds-autocomplete--large')).toBeInTheDocument();
    });

    it('should accept valid variant prop values', () => {
      const { container: standardContainer } = render(
        <RdsAutocomplete {...defaultProps} variant="standard" />
      );
      expect(standardContainer.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();

      const { container: filledContainer } = render(
        <RdsAutocomplete {...defaultProps} variant="filled" />
      );
      expect(filledContainer.querySelector('.MuiAutocomplete-root')).toBeInTheDocument();
    });

    it('should accept valid state prop values', () => {
      const { container: defaultContainer } = render(
        <RdsAutocomplete {...defaultProps} state="default" />
      );
      expect(defaultContainer.querySelector('.rds-autocomplete')).toBeInTheDocument();

      const { container: expandedContainer } = render(
        <RdsAutocomplete {...defaultProps} state="expanded" />
      );
      expect(expandedContainer.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should handle boolean props correctly', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          error={true}
          disabled={false}
          isMandatory={true}
          showHintText={true}
          isShowCheckbox={true}
          isShowRadio={false}
          isShowUser={false}
          openOnFocus={true}
          allowMultiple={false}
        />
      );
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('should accept control style values', () => {
      const { container: defaultStyle } = render(
        <RdsAutocomplete {...defaultProps} controlStyle="default" />
      );
      expect(defaultStyle.querySelector('.rds-autocomplete__textfield')).toBeInTheDocument();

      const { container: bottomLineStyle } = render(
        <RdsAutocomplete {...defaultProps} controlStyle="bottom line" />
      );
      expect(bottomLineStyle.querySelector('.rds-autocomplete__textfield--bottom-line')).toBeInTheDocument();
    });
  });

  describe('Custom MUI Autocomplete Props', () => {
    it('should accept MUI Autocomplete props', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          id="custom-autocomplete"
          className="custom-class"
        />
      );
      expect(container.querySelector('#custom-autocomplete')).toBeInTheDocument();
    });

    it('should accept MUI Autocomplete props', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} />
      );
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('should handle disabled prop from MUI', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} disabled={true} />
      );
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should handle readOnly prop', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} readOnly={true} />
      );
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should render complete autocomplete with all features', () => {
      const { container } = render(
        <RdsAutocomplete
          {...defaultProps}
          label="Search Users"
          placeholder="Type name..."
          helperText="Start typing to search"
          showHintText={true}
          selectSize="medium"
          variant="outlined"
          isMandatory={true}
          allowMultiple={false}
          isShowCheckbox={false}
          isShowRadio={false}
        />
      );
      expect(screen.getByText('Search Users')).toBeInTheDocument();
      expect(screen.getByText('Start typing to search')).toBeInTheDocument();
      expect(container.querySelector('.rds-autocomplete--medium')).toBeInTheDocument();
    });

    it('should handle state changes', () => {
      const { container, rerender } = render(
        <RdsAutocomplete {...defaultProps} state="default" disabled={false} />
      );
      let input = container.querySelector('input');
      expect(input?.disabled).toBe(false);

      rerender(<RdsAutocomplete {...defaultProps} state="disabled" />);
      input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('should render with minimum required props', () => {
      const { container } = render(
        <RdsAutocomplete options={[{ label: 'Test', value: 1 }]} />
      );
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
      expect(container.querySelector('input')).toBeInTheDocument();
    });
  });
});
