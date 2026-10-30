import React, { StrictMode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsButtonDropdown, { RdsButtonDropdownProps, RdsButtonDropdownOption } from './rds-button-dropdown';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-button-dropdown.scss', () => ({}));

jest.mock('../shared/utils/deprecation', () => {
  const warnDeprecatedProp = jest.fn();
  return {
    warnDeprecatedProp,
    invokeValueFirstOnChange: (
      onChange: ((value: unknown, event: unknown) => void) | undefined,
      value: unknown,
      event: unknown,
    ) => {
      onChange?.(value, event);
    },
    resolveDeprecatedProp: (
      canonical: unknown,
      legacy: unknown,
      component: string,
      legacyName: string,
      replacement: string,
    ) => {
      if (legacy !== undefined) warnDeprecatedProp(component, legacyName, replacement);
      return canonical !== undefined ? canonical : legacy;
    },
  };
});

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
  return function MockCheckbox({ checked, onChange, labelText, isDisabled }: any) {
    return (
      <label data-testid="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
        />
        {labelText}
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
        onChange={(e) => onChange(e.target.value, e)}
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

  const setup = (p: Partial<RdsButtonDropdownProps> = {}) => render(<RdsButtonDropdown {...defaultProps} {...p} />);
  const openMenu = (p: Partial<RdsButtonDropdownProps> = {}, text = 'Button') => {
    const result = setup(p);
    fireEvent.click(screen.getByText(text));
    return result;
  };
  const radioGroups = () => screen.getAllByTestId('radio-group');

  describe('Basic Rendering', () => {
    it('should render component without crashing and with default text', () => {
      setup();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsButtonDropdown.displayName).toBe('RdsButtonDropdown');
    });

    it('should render button with custom button text', () => {
      setup({ buttonText: 'Custom Button' });
      expect(screen.getByText('Custom Button')).toBeInTheDocument();
    });

    it('should render button element', () => {
      setup();
      expect(screen.getByText('Button').tagName).toBe('BUTTON');
    });
  });

  describe('Dropdown Toggle', () => {
    it('should open dropdown on button click', () => {
      openMenu();
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('should close dropdown on button click when open', () => {
      openMenu();
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('rds-menu'));
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });

    it('should not show dropdown initially', () => {
      setup();
      expect(screen.queryByTestId('rds-menu')).not.toBeInTheDocument();
    });
  });

  describe('Single Select Mode', () => {
    it('should render radio buttons in single select mode by default', () => {
      openMenu({ multiSelect: false });
      expect(radioGroups().length).toBeGreaterThan(0);
    });

    it.each([0, 1])('should call onChange when radio %i is selected', (index) => {
      const onChange = jest.fn();
      openMenu({ multiSelect: false, onChange });
      fireEvent.click(screen.getAllByRole('radio')[index]);
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Multi Select Mode', () => {
    it('should render checkboxes in multi select mode', () => {
      openMenu({ multiSelect: true });
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });

    it('should select multiple options', () => {
      const onChange = jest.fn();
      openMenu({ multiSelect: true, onChange });
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      fireEvent.click(checkboxes[1]);
      expect(onChange).toHaveBeenCalled();
    });

    it('should keep dropdown open after selection in multi select', () => {
      openMenu({ multiSelect: true });
      expect(screen.queryByTestId('rds-menu')).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('checkbox')[0]);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });

    it('should deselect option in multi select', () => {
      const onChange = jest.fn();
      openMenu({ multiSelect: true, onChange });
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(1);
      fireEvent.click(checkboxes[0]);
    });
  });

  describe('Search Functionality', () => {
    it('should show search input when showSearch is true', () => {
      openMenu({ showSearch: true });
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('should not show search input when showSearch is false', () => {
      openMenu({ showSearch: false });
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('should filter options based on search input', () => {
      openMenu({ showSearch: true });
      const searchInput = screen.getByTestId('search-input') as HTMLInputElement;
      fireEvent.change(searchInput, { target: { value: 'Option 1' } });
      expect(searchInput.value).toBe('Option 1');
    });

    it('should show all options when search is empty', () => {
      openMenu({ showSearch: true });
      expect(radioGroups().length).toBeGreaterThan(0);
    });
  });

  describe('Options Rendering', () => {
    it.each<[string, typeof defaultOptions, number]>([
      ['all options', defaultOptions, 3],
      ['single option', [{ id: 1, label: 'Only Option' }], 1],
      ['many options', Array.from({ length: 20 }, (_, i) => ({ id: i + 1, label: `Option ${i + 1}` })), 20],
      ['empty labels', [{ id: 1, label: '' }, { id: 2, label: 'Option 2' }], 2],
      ['very long labels', [{ id: 1, label: 'This is a very long option label that should wrap properly' }], 1],
      ['special characters', [{ id: 1, label: 'Option & More' }, { id: 2, label: 'Option @ Test' }], 2],
      ['unicode characters', [{ id: 1, label: '🏠 Home' }, { id: 2, label: '❤️ Favorites' }], 2],
    ])('should render %s', (_n, options, count) => {
      openMenu({ options });
      expect(radioGroups().length).toBe(count);
    });

    it('should render empty options array', () => {
      openMenu({ options: [] });
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });

    it('should render options with avatars', () => {
      openMenu({
        options: [
          { id: 1, label: 'Option 1', avatarSrc: '/avatar1.jpg' },
          { id: 2, label: 'Option 2', avatarSrc: '/avatar2.jpg' },
        ],
        showUserAvatar: true,
      });
      expect(screen.getAllByTestId('avatar').length).toBe(2);
    });

    it('should handle component re-render with different options', () => {
      const { rerender } = setup({ options: [{ id: 1, label: 'Option 1' }] });
      rerender(<RdsButtonDropdown options={[{ id: 2, label: 'Option 2' }, { id: 3, label: 'Option 3' }]} />);
      fireEvent.click(screen.getByText('Button'));
      expect(radioGroups().length).toBe(2);
    });
  });

  describe('Disabled State', () => {
    it('should disable option when disabled is true and not disable others', () => {
      openMenu({ options: [{ id: 1, label: 'Option 1' }, { id: 2, label: 'Option 2', disabled: true }], onChange: jest.fn() });
      const radios = screen.getAllByRole('radio');
      expect(radios[1]).toHaveAttribute('disabled');
      expect(radios[0]).not.toHaveAttribute('disabled');
    });
  });

  describe('Pre-selected Options', () => {
    it('should pre-select options with checked property', () => {
      openMenu({ options: [{ id: 1, label: 'Option 1', checked: true }, { id: 2, label: 'Option 2' }], multiSelect: true });
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    });
  });

  describe('Avatar Display', () => {
    it.each([[true, 1], [false, 0]])('showUserAvatar=%p renders %i avatars', (showUserAvatar, count) => {
      openMenu({ options: [{ id: 1, label: 'Option 1', avatarSrc: '/avatar.jpg' }], showUserAvatar });
      expect(screen.queryAllByTestId('avatar')).toHaveLength(count);
    });
  });

  describe('Button Props', () => {
    it.each([
      [{ size: 'large' }],
      [{ layout: 'text-only' }],
      [{ styleType: 'secondary' }],
      [{ shape: 'pill' }],
      [{ disabled: true }],
      [{ isShowLeftIcon: true, isShowRightIcon: true, leftIcon: <span>Left</span>, rightIcon: <span>Right</span> }],
      [{ multiSelect: true }],
      [{ showSearch: true }],
      [{ selected: true }],
      [{ size: 'small', layout: 'icon-only', styleType: 'outline', shape: 'pill' }],
      [{ onChange: jest.fn() }],
    ])('should accept %p', (props) => {
      setup(props as any);
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Disabled and selected props', () => {
    it('should disable the trigger when disabled is true', () => {
      render(<RdsButtonDropdown {...defaultProps} disabled />);
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
  });

  describe('Radio vs Simple Options', () => {
    it('should render radio buttons when showRadio is true', () => {
      openMenu({ multiSelect: false, showRadio: true });
      expect(radioGroups().length).toBeGreaterThan(0);
    });

    it('should render simple options when showRadio is false and multiSelect is false', () => {
      openMenu({ multiSelect: false, showRadio: false });
      expect(screen.getByTestId('rds-menu')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid state changes', () => {
      const { rerender } = setup({ buttonText: 'Button 1' });
      rerender(<RdsButtonDropdown {...defaultProps} buttonText="Button 2" />);
      rerender(<RdsButtonDropdown {...defaultProps} buttonText="Button 3" />);
      expect(screen.getByText('Button 3')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all customization props together', () => {
      const options = [
        { id: 1, label: 'Option 1', avatarSrc: '/avatar1.jpg' },
        { id: 2, label: 'Option 2', avatarSrc: '/avatar2.jpg', disabled: true },
        { id: 3, label: 'Option 3', avatarSrc: '/avatar3.jpg', checked: true },
      ];
      openMenu(
        {
          options,
          buttonText: 'Custom Button',
          multiSelect: true,
          showSearch: true,
          showUserAvatar: true,
          size: 'large',
          layout: 'icon+text',
          styleType: 'secondary',
          shape: 'pill',
          onChange: jest.fn(),
        },
        'Custom Button'
      );
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getAllByTestId('avatar').length).toBeGreaterThan(0);
    });
  });

  describe('Default Props', () => {
    it('should have multiSelect as false by default', () => {
      openMenu();
      expect(radioGroups().length).toBeGreaterThan(0);
    });

    it('should have showSearch as false by default', () => {
      openMenu();
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should have proper checkbox roles for multi select', () => {
      openMenu({ multiSelect: true });
      expect(screen.getAllByRole('checkbox').length).toBe(3);
    });

    it('should have proper radio roles for single select', () => {
      openMenu({ multiSelect: false });
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
      expect(onChange.mock.calls.map((call) => call[0])).toEqual([[1], [1, 2], [2]]);
      onChange.mock.calls.forEach((call) => expect(call[1]).toEqual(expect.anything()));
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
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('2', expect.anything());
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

    it('G1-149 defaults the closed trigger to a chevron, not Add/Save', () => {
      render(<RdsButtonDropdown options={options} />);
      const props = lastButtonProps();
      expect(props.showLeftIcon).toBe(false);
      expect(props.showRightIcon).toBe(true);
      expect(props.changeLeftIcon).toBeUndefined();
      expect(React.isValidElement(props.changeRightIcon)).toBe(true);
      expect((props.changeRightIcon as React.ReactElement).type).toBe(
        jest.requireActual('@mui/icons-material/KeyboardArrowDown').default,
      );
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
      expect(onChange).toHaveBeenCalledWith([2, 1], expect.anything());
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
      expect(warnDeprecatedProp).toHaveBeenCalledWith(
        'RdsButtonDropdown',
        'variant="outline"',
        '`variant: "outlined"` (and optional `color`)',
      );
    });

    it('maps RdsButton-aligned variant and color onto the trigger', () => {
      render(<RdsButtonDropdown options={options} variant="filled" color="secondary" />);
      const props = lastButtonProps();
      expect(props.variant).toBe('filled');
      expect(props.color).toBe('secondary');
      expect(screen.getByText('Button')).toHaveClass('rds-button-dropdown--secondary');
      expect(warnDeprecatedProp).not.toHaveBeenCalledWith(
        'RdsButtonDropdown',
        'variant="secondary"',
        expect.any(String),
      );
    });

    it('maps outlined variant without a legacy deprecation warning', () => {
      render(<RdsButtonDropdown options={options} variant="outlined" color="primary" />);
      const props = lastButtonProps();
      expect(props.variant).toBe('outlined');
      expect(props.color).toBe('primary');
      expect(screen.getByText('Button')).toHaveClass('rds-button-dropdown--outline');
      expect(warnDeprecatedProp).not.toHaveBeenCalledWith(
        'RdsButtonDropdown',
        'variant="outline"',
        expect.any(String),
      );
    });
  });
});
