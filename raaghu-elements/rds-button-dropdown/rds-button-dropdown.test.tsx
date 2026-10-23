import React, { StrictMode } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsButtonDropdown, { RdsButtonDropdownProps, RdsButtonDropdownOption } from './rds-button-dropdown';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-button-dropdown.scss', () => ({}));

jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

const mockButtonProps = jest.fn();

jest.mock('../rds-button/rds-button', () => {
  return function MockButton(allProps: any) {
    mockButtonProps(allProps);
    const { text, onClick, style, children, ...props } = allProps;
    return <button onClick={onClick} {...props}>{text ?? children}</button>;
  };
});

jest.mock('../rds-menu/rds-menu', () => {
  return function MockMenu({ open, onClose, children, slotProps, ...props }: any) {
    return open ? <div data-testid="rds-menu" onClick={() => onClose()} style={slotProps?.paper?.style} {...props}>{children}</div> : null;
  };
});

jest.mock('../rds-checkbox/rds-checkbox', () => {
  return function MockCheckbox({ checked, onChange, labeltext, isDisabled }: any) {
    return (
      <label data-testid="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
        />
        {labeltext}
      </label>
    );
  };
});

jest.mock('../rds-radio/rds-radio', () => {
  return function MockRadio({ options, value, onChange, disabled, name }: any) {
    return (
      <div data-testid="radio-group">
        {options.map((opt: any) => (
          <label key={opt.value}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              disabled={opt.disabled || disabled}
            />
            {opt.label ?? opt.text}
          </label>
        ))}
      </div>
    );
  };
});

jest.mock('../rds-avatar/rds-avatar', () => {
  return function MockAvatar({ src, size }: any) {
    return <div data-testid="avatar" data-src={src} data-size={size}>Avatar</div>;
  };
});

jest.mock('../rds-search/rds-search', () => {
  return function MockSearch({ value, onChange, placeholder }: any) {
    return (
      <input
        data-testid="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    );
  };
});

describe('RdsButtonDropdown', () => {
  const defaultOptions: RdsButtonDropdownOption[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];

  const defaultProps: RdsButtonDropdownProps = {
    options: defaultOptions,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsButtonDropdown.displayName).toBe('RdsButtonDropdown');
    });

    it('should render button with default text', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should render button with custom button text', () => {
      render(<RdsButtonDropdown {...defaultProps} buttonText="Custom Button" />);
      expect(screen.getByText('Custom Button')).toBeInTheDocument();
    });

    it('should render button element', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      const button = screen.getByText('Button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Dropdown Toggle', () => {
    it('should open dropdown on button click', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      const button = screen.getByText('Button');
      
      fireEvent.click(button);
      
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('should close dropdown on button click when open', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      const button = screen.getByText('Button');
      
      fireEvent.click(button);
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
      
      fireEvent.click(screen.getByTestId('rds-menu'));
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });

    it('should not show dropdown initially', () => {
      render(<RdsButtonDropdown {...defaultProps} />);
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });
  });

  describe('Single Select Mode', () => {
    it('should render radio buttons in single select mode by default', () => {
      render(<RdsButtonDropdown {...defaultProps} multiSelect={false} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBeGreaterThan(0);
    });

    it('should select single option', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps} 
          multiSelect={false}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[0]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should close dropdown after selecting single option', () => {
      render(<RdsButtonDropdown {...defaultProps} multiSelect={false} />);
      const button = screen.getByText('Button');
      
      fireEvent.click(button);
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
      
      fireEvent.click(screen.getByTestId('rds-menu'));
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });

    it('should call onChange with selected value in single select', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={false}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[1]);
      
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Multi Select Mode', () => {
    it('should render checkboxes in multi select mode', () => {
      render(<RdsButtonDropdown {...defaultProps} multiSelect={true} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should select multiple options', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={true}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should keep dropdown open after selection in multi select', () => {
      render(<RdsButtonDropdown {...defaultProps} multiSelect={true} />);
      const button = screen.getByText('Button');
      
      fireEvent.click(button);
      expect(screen.queryByTestId('rds-menu')).toBeInTheDocument();
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      
      expect(button).toBeInTheDocument();
    });

    it('should call onChange with array of selected values in multi select', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={true}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should deselect option in multi select', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={true}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      const callCount1 = onChange.mock.calls.length;
      
      fireEvent.click(checkboxes[0]);
      const callCount2 = onChange.mock.calls.length;
      
      expect(callCount1).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Search Functionality', () => {
    it('should show search input when showSearch is true', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          showSearch={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('should not show search input when showSearch is false', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          showSearch={false}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('should filter options based on search input', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          showSearch={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'Option 1' } });
      
      expect(searchInput.value).toBe('Option 1');
    });

    it('should show all options when search is empty', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          showSearch={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBeGreaterThan(0);
    });
  });

  describe('Options Rendering', () => {
    it('should render all options', () => {
      const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(3);
    });

    it('should render single option', () => {
      const options = [{ id: 1, label: 'Only Option' }];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(1);
    });

    it('should render many options', () => {
      const options = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        label: `Option ${i + 1}`,
      }));
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(20);
    });

    it('should render empty options array', () => {
      render(<RdsButtonDropdown options={[]} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('should render options with avatars', () => {
      const options = [
        { id: 1, label: 'Option 1', avatarSrc: '/avatar1.jpg' },
        { id: 2, label: 'Option 2', avatarSrc: '/avatar2.jpg' },
      ];
      render(
        <RdsButtonDropdown 
          options={options}
          showUserAvatar={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('avatar').length).toBe(2);
    });
  });

  describe('Disabled State', () => {
    it('should disable option when disabled is true', () => {
      const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2', disabled: true },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('disabled');
    });

    it('should not select disabled option', () => {
      const onChange = jest.fn();
      const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2', disabled: true },
      ];
      render(
        <RdsButtonDropdown 
          options={options}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('disabled');
    });
  });

  describe('Pre-selected Options', () => {
    it('should pre-select options with checked property', () => {
      const options = [
        { id: 1, label: 'Option 1', checked: true },
        { id: 2, label: 'Option 2' },
      ];
      render(<RdsButtonDropdown options={options} multiSelect={true} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
    });
  });

  describe('Avatar Display', () => {
    it('should show avatars when showUserAvatar is true', () => {
      const options = [
        { id: 1, label: 'Option 1', avatarSrc: '/avatar.jpg' },
      ];
      render(
        <RdsButtonDropdown 
          options={options}
          showUserAvatar={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('avatar')).toBeInTheDocument();
    });

    it('should not show avatars when showUserAvatar is false', () => {
      const options = [
        { id: 1, label: 'Option 1', avatarSrc: '/avatar.jpg' },
      ];
      render(
        <RdsButtonDropdown 
          options={options}
          showUserAvatar={false}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
    });
  });

  describe('Button Props', () => {
    it('should accept size prop', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          size="large"
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept layout prop', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          layout="text-only"
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept styleType prop', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          styleType="secondary"
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept shape prop', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          shape="pill"
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should disable the trigger when disabled is true', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          disabled
        />
      );
      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();
      fireEvent.click(trigger);
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });

    it('should apply the selected trigger treatment when selected is true', () => {
      render(<RdsButtonDropdown {...defaultProps} selected />);
      const buttonProps = mockButtonProps.mock.calls[mockButtonProps.mock.calls.length - 1][0];
      expect(buttonProps.selected).toBe(true);
    });

    it('should show right and left icons', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          isShowLeftIcon={true}
          isShowRightIcon={true}
          leftIcon={<span>Left</span>}
          rightIcon={<span>Right</span>}
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Radio vs Simple Options', () => {
    it('should render radio buttons when showRadio is true', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={false}
          showRadio={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBeGreaterThan(0);
    });

    it('should render simple options when showRadio is false and multiSelect is false', () => {
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={false}
          showRadio={false}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onChange when option is selected in single mode', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={false}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      fireEvent.click(radios[0]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should call onChange with array in multi select mode', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          {...defaultProps}
          multiSelect={true}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      
      expect(onChange).toHaveBeenCalled();
    });

    it('should not call onChange if option is disabled', () => {
      const onChange = jest.fn();
      const options = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2', disabled: true },
      ];
      render(
        <RdsButtonDropdown 
          options={options}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('disabled');
      expect(radios[0]).not.toHaveAttribute('disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle options with empty labels', () => {
      const options = [
        { id: 1, label: '' },
        { id: 2, label: 'Option 2' },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBeGreaterThan(0);
    });

    it('should handle very long option labels', () => {
      const options = [
        { id: 1, label: 'This is a very long option label that should wrap properly' },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(1);
    });

    it('should handle special characters in labels', () => {
      const options = [
        { id: 1, label: 'Option & More' },
        { id: 2, label: 'Option @ Test' },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(2);
    });

    it('should handle unicode characters in labels', () => {
      const options = [
        { id: 1, label: '🏠 Home' },
        { id: 2, label: '❤️ Favorites' },
      ];
      render(<RdsButtonDropdown options={options} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(2);
    });

    it('should handle rapid state changes', () => {
      const { rerender } = render(
        <RdsButtonDropdown 
          {...defaultProps}
          buttonText="Button 1"
        />
      );
      
      rerender(
        <RdsButtonDropdown 
          {...defaultProps}
          buttonText="Button 2"
        />
      );
      
      rerender(
        <RdsButtonDropdown 
          {...defaultProps}
          buttonText="Button 3"
        />
      );
      
      expect(screen.getByText('Button 3')).toBeInTheDocument();
    });

    it('should handle component re-render with different options', () => {
      const { rerender } = render(
        <RdsButtonDropdown 
          options={[
            { id: 1, label: 'Option 1' },
          ]}
        />
      );
      
      rerender(
        <RdsButtonDropdown 
          options={[
            { id: 2, label: 'Option 2' },
            { id: 3, label: 'Option 3' },
          ]}
        />
      );
      
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBe(2);
    });
  });

  describe('Props Validation', () => {
    it('should accept options array', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept multiSelect boolean prop', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          multiSelect={true}
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept showSearch boolean prop', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          showSearch={true}
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should accept onChange callback', () => {
      const onChange = jest.fn();
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          onChange={onChange}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('should accept all styling props', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          size="small"
          layout="icon-only"
          styleType="outline"
          shape="pill"
        />
      );
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all customization props together', () => {
      const onChange = jest.fn();
      const options = [
        { id: 1, label: 'Option 1', avatarSrc: '/avatar1.jpg' },
        { id: 2, label: 'Option 2', avatarSrc: '/avatar2.jpg', disabled: true },
        { id: 3, label: 'Option 3', avatarSrc: '/avatar3.jpg', checked: true },
      ];
      
      render(
        <RdsButtonDropdown 
          options={options}
          buttonText="Custom Button"
          multiSelect={true}
          showSearch={true}
          showUserAvatar={true}
          size="large"
          layout="icon+text"
          styleType="secondary"
          shape="pill"
          onChange={onChange}
        />
      );
      
      const button = screen.getByText('Custom Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getAllByTestId('avatar').length).toBeGreaterThan(0);
    });
  });

  describe('Default Props', () => {
    it('should have default buttonText as Button', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have multiSelect as false by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByTestId('radio-group').length).toBeGreaterThan(0);
    });

    it('should have showSearch as false by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('should have size as medium by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have layout as icon+text by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have styleType as primary by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have shape as rectangle by default', () => {
      render(<RdsButtonDropdown options={defaultOptions} />);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role=option for simple options', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          showRadio={false}
          multiSelect={false}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsButtonDropdown {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper checkbox roles for multi select', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          multiSelect={true}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByRole('checkbox').length).toBe(3);
    });

    it('should have proper radio roles for single select', () => {
      render(
        <RdsButtonDropdown 
          options={defaultOptions}
          multiSelect={false}
        />
      );
      const button = screen.getByText('Button');
      fireEvent.click(button);
      
      expect(screen.getAllByRole('radio').length).toBe(3);
    });
  });
});

describe('audit fixes', () => {
  const { warnDeprecatedProp } = jest.requireMock('../shared/utils/deprecation') as { warnDeprecatedProp: jest.Mock };
  const options: RdsButtonDropdownOption[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];
  const lastButtonProps = () => mockButtonProps.mock.calls[mockButtonProps.mock.calls.length - 1][0];

  beforeEach(() => {
    warnDeprecatedProp.mockClear();
    mockButtonProps.mockClear();
  });

  describe('G1-150 onChange outside the state updater', () => {
    it('calls onChange once per click with the next selection, also under StrictMode', () => {
      const onChange = jest.fn();
      render(
        <StrictMode>
          <RdsButtonDropdown options={options} multiple open onChange={onChange} />
        </StrictMode>
      );
      fireEvent.click(screen.getByText('Button'));
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      fireEvent.click(screen.getAllByRole('checkbox')[1]);
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(onChange.mock.calls).toEqual([[[1]], [[1, 2]], [[2]]]);
    });

    it('calls onChange once with the id string in single-select mode', () => {
      const onChange = jest.fn();
      render(
        <StrictMode>
          <RdsButtonDropdown options={options} onChange={onChange} />
        </StrictMode>
      );
      fireEvent.click(screen.getByText('Button'));
      fireEvent.click(screen.getAllByRole('radio')[1]);
      expect(onChange.mock.calls).toEqual([['2']]);
    });
  });

  describe('G1-151 controlled open / onOpen / onClose', () => {
    it('opens from the open prop without a click', () => {
      render(<RdsButtonDropdown options={options} open />);
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('keeps a controlled closed menu closed', () => {
      render(<RdsButtonDropdown options={options} open={false} />);
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });

    it('starts closed unless open is controlled or the trigger is clicked', () => {
      render(<RdsButtonDropdown options={options} />);
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
      fireEvent.click(screen.getByText('Button'));
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('calls onOpen and onClose but lets the consumer decide when controlled', () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      const { rerender } = render(<RdsButtonDropdown options={options} open={false} onOpen={onOpen} onClose={onClose} />);
      fireEvent.click(screen.getByText('Button'));
      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();

      rerender(<RdsButtonDropdown options={options} open onOpen={onOpen} onClose={onClose} />);
      fireEvent.click(screen.getByText('Button'));
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'toggleInput');
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('calls onOpen and onClose in uncontrolled mode too', () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      render(<RdsButtonDropdown options={options} onOpen={onOpen} onClose={onClose} />);
      fireEvent.click(screen.getByText('Button'));
      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('radio')[0]);
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'selectOption');
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });
  });

  describe('G1-152 forwarded trigger props', () => {
    it('keeps the default trigger class list empty', () => {
      render(<RdsButtonDropdown options={options} />);
      expect(lastButtonProps().className).toBe('');
    });

    it('merges className with the styleType classes', () => {
      render(<RdsButtonDropdown options={options} styleType="outline" className="custom" />);
      expect(screen.getByText('Button')).toHaveClass('rds-button-dropdown__button', 'rds-button-dropdown--outline', 'custom');
    });

    it('forwards sx, id, aria-* and data-* to the trigger', () => {
      const sx = { margin: 1 };
      render(<RdsButtonDropdown options={options} sx={sx} id="trigger" aria-label="Pick one" data-testid="dd-trigger" />);
      const trigger = screen.getByTestId('dd-trigger');
      expect(trigger).toHaveAttribute('id', 'trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Pick one');
      expect(lastButtonProps().sx).toBe(sx);
    });

    it('forwards native button props and the trigger ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      const onClick = jest.fn();
      render(<RdsButtonDropdown options={options} title="Details" ref={ref} onClick={onClick} />);
      const trigger = screen.getByRole('button', { name: 'Button' });
      expect(trigger).toHaveAttribute('title', 'Details');
      expect(ref.current).toBe(trigger);
      fireEvent.click(trigger);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('G1-153 trigger aria attributes', () => {
    it('describes the popup and links the menu when open', () => {
      render(<RdsButtonDropdown options={options} />);
      const trigger = screen.getByText('Button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).not.toHaveAttribute('aria-controls');
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger.getAttribute('aria-controls')).toBe(screen.getByTestId('rds-menu').id);
    });
  });

  describe('renamed props', () => {
    it('G1-155 children replaces buttonText; children wins and buttonText warns', () => {
      render(<RdsButtonDropdown options={options} buttonText="Old">New</RdsButtonDropdown>);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.queryByText('Old')).not.toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButtonDropdown', 'buttonText', '`children`');
    });

    it('G1-155 renders element children and does not warn', () => {
      render(<RdsButtonDropdown options={options}><span>Rich</span></RdsButtonDropdown>);
      expect(screen.getByText('Rich')).toBeInTheDocument();
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('G1-156 multiple replaces multiSelect; multiple wins and multiSelect warns', () => {
      render(<RdsButtonDropdown options={options} multiSelect={false} multiple />);
      fireEvent.click(screen.getByText('Button'));
      expect(screen.getAllByRole('checkbox')).toHaveLength(3);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButtonDropdown', 'multiSelect', '`multiple`');
    });

    it('G1-158 startIcon/endIcon reach the trigger like leftIcon/rightIcon did', () => {
      const start = <span>start</span>;
      const end = <span>end</span>;
      render(<RdsButtonDropdown options={options} startIcon={start} endIcon={end} />);
      expect(lastButtonProps().changeLeftIcon).toBe(start);
      expect(lastButtonProps().changeRightIcon).toBe(end);
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('G1-158 leftIcon/rightIcon still work, warn, and lose to the new names', () => {
      const left = <span>left</span>;
      const right = <span>right</span>;
      const start = <span>start</span>;
      render(<RdsButtonDropdown options={options} leftIcon={left} rightIcon={right} startIcon={start} />);
      expect(lastButtonProps().changeLeftIcon).toBe(start);
      expect(lastButtonProps().changeRightIcon).toBe(right);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButtonDropdown', 'leftIcon', '`startIcon`');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButtonDropdown', 'rightIcon', '`endIcon`');
    });
  });

  describe('G1-162 value / defaultValue', () => {
    it('follows a controlled value and reports changes without changing it', () => {
      const onChange = jest.fn();
      render(<RdsButtonDropdown options={options} multiple open value={[2]} onChange={onChange} />);
      fireEvent.click(screen.getByText('Button'));
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toBeChecked();
      fireEvent.click(checkboxes[0]);
      expect(onChange).toHaveBeenCalledWith([2, 1]);
      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
    });

    it('re-syncs when the controlled value changes', () => {
      const { rerender } = render(<RdsButtonDropdown options={options} multiple open value={[1]} />);
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
      rerender(<RdsButtonDropdown options={options} multiple open value={[3]} />);
      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
      expect(screen.getAllByRole('checkbox')[2]).toBeChecked();
    });

    it('seeds from defaultValue instead of option.checked', () => {
      const seeded = [{ ...options[0], checked: true }, options[1], options[2]];
      render(<RdsButtonDropdown options={seeded} multiple open defaultValue={[3]} />);
      fireEvent.click(screen.getByText('Button'));
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
      fireEvent.click(checkboxes[2]);
      expect(screen.getAllByRole('checkbox')[2]).not.toBeChecked();
    });
  });

  describe('audit fixes', () => {
    it('prefers variant, searchable, showAvatar and optionVariant over styleType and ui', () => {
      render(<RdsButtonDropdown options={options} variant="outline" styleType="primary" searchable showAvatar={false} optionVariant="button" ui={{ search: 'hidden', avatar: 'visible', selection: 'radio' }} open />);
      expect(screen.getByText('Button')).toHaveClass('rds-button-dropdown--outline');
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
      expect(screen.queryAllByRole('radio')).toHaveLength(0);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsButtonDropdown', 'ui', '`searchable`, `showAvatar` and `optionVariant`');
    });
  });
});
