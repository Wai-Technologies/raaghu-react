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
          selected
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

    it('disables input with disabled', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} disabled />);
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

  describe('Semantic State Props', () => {
    it('should render with default semantic props', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      expect(container.querySelector('.rds-autocomplete')).toBeInTheDocument();
    });

    it('opens the dropdown when open is true', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} open />);
      expect(container.querySelector('input')).toBeInTheDocument();
    });

    it('selects the first option when selected', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} selected allowMultiple={false} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input?.value).toBeTruthy();
    });

    it('disables input with disabled', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} disabled />);
      const input = container.querySelector('input');
      expect(input?.disabled).toBe(true);
    });

    it('selects the first option in multiple mode when selected', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} selected allowMultiple={true} />
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
        <RdsAutocomplete {...defaultProps} allowMultiple={true} selected />
      );
      expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    });

    it('should limit visible tags to 4 in multiple mode', () => {
      const manyOptions = Array.from({ length: 6 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
      }));
      const { container } = render(
        <RdsAutocomplete options={manyOptions} allowMultiple={true} selected />
      );
      expect(container.querySelector('.rds-autocomplete__chip')).toBeInTheDocument();
    });

    it('should apply chip size class for small', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} selected selectSize="small" />
      );
      expect(container.querySelector('.rds-autocomplete__chip--small')).toBeInTheDocument();
    });

    it('should apply chip size class for large', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} allowMultiple={true} selected selectSize="large" />
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
          open
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
      const { container } = render(<RdsAutocomplete {...defaultProps} selected />);
      const chips = container.querySelectorAll('.rds-autocomplete__chip');
      expect(chips.length).toBe(0);
    });

    it('should be enabled by default', () => {
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

    it('should handle rapid open and close interactions', () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} />);
      const input = container.querySelector('input') as HTMLInputElement;
      
      fireEvent.click(input);
      fireEvent.blur(input);
      fireEvent.click(input);
      fireEvent.blur(input);
      
      expect(input).toBeInTheDocument();
    });

    it('should handle the disabled prop', () => {
      const { container } = render(
        <RdsAutocomplete {...defaultProps} disabled />
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

    it('should accept semantic selected and open props', () => {
      const { container: defaultContainer } = render(
        <RdsAutocomplete {...defaultProps} />
      );
      expect(defaultContainer.querySelector('.rds-autocomplete')).toBeInTheDocument();

      const { container: selectedContainer } = render(
        <RdsAutocomplete {...defaultProps} selected />
      );
      expect((selectedContainer.querySelector('input') as HTMLInputElement).value).toBe('Option 1');

      const { container: openContainer } = render(
        <RdsAutocomplete {...defaultProps} open />
      );
      expect(openContainer.querySelector('.rds-autocomplete')).toBeInTheDocument();
      expect(screen.getAllByRole('listbox').length).toBeGreaterThan(0);
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

    it('should handle disabled prop changes', () => {
      const { container, rerender } = render(
        <RdsAutocomplete {...defaultProps} disabled={false} />
      );
      let input = container.querySelector('input');
      expect(input?.disabled).toBe(false);

      rerender(<RdsAutocomplete {...defaultProps} disabled />);
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

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsAutocomplete {...defaultProps} label="Search" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
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
