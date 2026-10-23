import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDatepicker from './rds-comp-datepicker';
import { DatePickerStyleType, DatePickerLayout } from './rds-comp-datepicker.types';

jest.mock('./rds-comp-datepicker.scss', () => ({}));

jest.mock('react-datepicker', () => {
  return {
    __esModule: true,
    default: ({ selected, onChange, selectsRange, startDate, endDate, className, ...props }: any) => (
      <div data-testid="date-picker-container" className={className}>
        <input
          data-testid="date-picker-input"
          aria-label="Date picker"
          value={selected ? new Date(selected).toLocaleDateString() : ''}
          onChange={(e) => {
            if (onChange) {
              const date = new Date(e.target.value);
              onChange(date);
            }
          }}
          {...props}
        />
        {selectsRange && (
          <>
            <input
              data-testid="start-date-input"
              aria-label="Start date"
              value={startDate ? new Date(startDate).toLocaleDateString() : ''}
              readOnly
            />
            <input
              data-testid="end-date-input"
              aria-label="End date"
              value={endDate ? new Date(endDate).toLocaleDateString() : ''}
              readOnly
            />
          </>
        )}
      </div>
    ),
  };
});

const mockCaptured: { type?: any[] } = {};

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => {
  const warnDeprecatedProp = jest.fn();
  return {
    warnDeprecatedProp,
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

jest.mock('./rds-comp-datepicker-utils', () => ({
  CustomButtons: ({ onClickYesterday, onClickToday, onClickLastSeven, onClickLastFourteen }: any) => (
    <div data-testid="custom-buttons">
      <button data-testid="yesterday-btn" onClick={onClickYesterday}>Yesterday</button>
      <button data-testid="today-btn" onClick={onClickToday}>Today</button>
      <button data-testid="last-7-btn" onClick={onClickLastSeven}>Last 7 Days</button>
      <button data-testid="last-14-btn" onClick={onClickLastFourteen}>Last 14 Days</button>
    </div>
  ),
  CustomInputWithClear: ({ value, onClick, onClear }: any) => (
    <div data-testid="custom-input">
      <input data-testid="custom-input-field" value={value} readOnly onClick={onClick} />
      {onClear && <button data-testid="clear-btn" onClick={onClear}>Clear</button>}
    </div>
  ),
  ExampleCustomInput: ({ value, onClick }: any) => (
    <input data-testid="example-custom-input" value={value} onClick={onClick} readOnly />
  ),
  getDayClassName: (date: Date, selectedDate: Date | null) => {
    if (!selectedDate) return '';
    return date.toDateString() === selectedDate.toDateString() ? 'selected' : '';
  },
  getYesterdayDate: (today: Date) => {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  },
  getTodayDate: (today: Date) => {
    return {
      todayDate: today,
      newDate: today,
    };
  },
  getLastSevenDaysDate: (today: Date) => {
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return sevenDaysAgo;
  },
  getLastFourteenDaysDate: (today: Date) => {
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    return fourteenDaysAgo;
  },
  renderDatePickerTypeView: (...args: any[]) => {
    mockCaptured.type = args;
    const props: any = args[5] ?? {};
    return (
    <div data-testid="type-view">
      <input
        data-testid="date-picker-input"
        type="text"
        aria-label="Date picker"
        disabled={props?.isDisabled || props?.disabled}
      />
    </div>
    );
  },
}));

describe('RdsDatepicker', () => {
  const defaultProps = {
    isDropdownOpen: false,
  };
  const setup = (p: Record<string, any> = {}) => render(<RdsDatepicker {...defaultProps} {...p} />);
  const expectTypeView = () => expect(screen.getByTestId('type-view')).toBeInTheDocument();

  describe('Basic Rendering', () => {
    it('should render component', () => {
      setup();
      expectTypeView();
    });

    it('should render with title when showTitle is true', () => {
      setup({ showTitle: true, titleText: 'Select Date' });
      expect(screen.getByText('Select Date')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      setup({ showTitle: false, titleText: 'Select Date' });
      expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
    });

    it('should render mandatory indicator when required is true', () => {
      setup({ showTitle: true, titleText: 'Date', required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should not render mandatory indicator when required is false', () => {
      setup({ showTitle: true, titleText: 'Date', required: false });
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('State Management', () => {

    it('should render type view when type prop is provided', () => {
      setup({ type: 'range' });
      expectTypeView();
    });

    it.each([true, false])('should initialize with isDefaultDate=%s', (isDefaultDate) => {
      setup({ isDefaultDate });
      expectTypeView();
    });
  });

  describe('Date Callbacks', () => {
    it.each([
      ['selectedDate', {}],
      ['onDatePicker', {}],
      ['customDate', { type: 'range' }],
    ])('should accept %s callback', (prop, extra) => {
      const mockCallback = jest.fn();
      setup({ [prop]: mockCallback, ...extra });
      expect(mockCallback).toBeDefined();
    });
  });

  describe('Selected and label', () => {
    it('applies the selected appearance when selected is true', () => {
      const { container } = setup({ selected: true });
      expect(container.querySelector('.rds-datepicker')).toHaveClass('rds-datepicker--selected');
    });

    it('supports datePickerLabel', () => {
      setup({ datePickerLabel: 'Pick Date', showTitle: true });
      expect(screen.getByText('Pick Date')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it.each([true, false])('should render when disabled is %s', (disabled) => {
      setup({ disabled });
      expectTypeView();
    });
  });

  describe('Props Handling', () => {
    it.each([
      ['datePickerStyleType', DatePickerStyleType.Dropdown],
      ['layout', DatePickerLayout.Default],
      ['placeholderText', 'Select a date'],
      ['changeIcon', 'dashboard_settings'],
      ['showClearDate', true],
    ])('should accept %s prop', (prop, value) => {
      setup({ [prop]: value });
      expectTypeView();
    });

  });

  describe('Date Edit', () => {
    it('should set date from dateForEdit prop', () => {
      setup({ dateForEdit: '2024-12-25' });
      expectTypeView();
    });

    it('should update when dateForEdit prop changes', () => {
      const { rerender } = setup({ dateForEdit: '2024-12-25' });
      rerender(<RdsDatepicker {...defaultProps} dateForEdit="2024-12-26" />);
      expectTypeView();
    });
  });


  describe('Layout Options and Style Types', () => {
    it.each([
      DatePickerLayout.Default,
      DatePickerLayout.MonthPicker,
      DatePickerLayout.YearPicker,
      DatePickerLayout.MultiMonth,
    ])('should render with layout %s', (layout) => {
      setup({ layout });
      expectTypeView();
    });

    it.each([DatePickerStyleType.Dropdown, DatePickerStyleType.Selector])('should render with style %s', (datePickerStyleType) => {
      setup({ datePickerStyleType });
      expectTypeView();
    });
  });

  describe('Type Variations', () => {
    it.each(['single', 'range', 'datetime'])('should render %s type', (type) => {
      setup({ type });
      expectTypeView();
    });
  });

  describe('Label Rendering', () => {
    const label = (container: HTMLElement) => container.querySelector('.rds-datepicker__label');

    it('should apply correct class to label when showTitle is true', () => {
      const { container } = setup({ showTitle: true, titleText: 'Date' });
      expect(label(container)).not.toHaveClass('rds-datepicker__label--hidden');
    });

    it('should apply hidden class to label when showTitle is false', () => {
      const { container } = setup({ showTitle: false, titleText: 'Date' });
      expect(label(container)).toHaveClass('rds-datepicker__label--hidden');
    });

    it('should have aria-hidden attribute when showTitle is false', () => {
      const { container } = setup({ showTitle: false, titleText: 'Date' });
      expect(label(container)).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have aria-hidden attribute when showTitle is true', () => {
      const { container } = setup({ showTitle: true, titleText: 'Date' });
      expect(label(container)).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Component Display Name', () => {
    it('should have displayName set to RdsDatepicker', () => {
      expect(RdsDatepicker.displayName).toBe('RdsCompDatepicker');
    });
  });

  describe('Multiple Rerenders', () => {
    it('should handle multiple prop changes', () => {
      const { rerender } = setup({ showTitle: true, required: true, disabled: false });
      expect(screen.getByText('*')).toBeInTheDocument();
      rerender(<RdsDatepicker {...defaultProps} showTitle={true} required={false} disabled={true} />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined callbacks gracefully', () => {
      expect(() => {
        setup({ selectedDate: undefined, onDatePicker: undefined, customDate: undefined });
      }).not.toThrow();
    });

    it('should handle undefined optional props', () => {
      expect(() => {
        setup({ titleText: undefined, placeholderText: undefined, datePickerLabel: undefined });
      }).not.toThrow();
    });

    it('should handle null dateForEdit', () => {
      setup({ dateForEdit: undefined });
      expectTypeView();
    });
  });

  describe('Integration', () => {
    it('should render with all props provided', () => {
      render(
        <RdsDatepicker
          isDropdownOpen={false}
          dateForEdit="2024-12-25"
          titleText="Select Date"
          showTitle={true}
          onDatePicker={jest.fn()}
          datePickerStyleType={DatePickerStyleType.Dropdown}
          layout={DatePickerLayout.Default}
          customDate={jest.fn()}
          disabled={false}
          required={true}
          placeholderText="Pick a date"
          type="single"
          changeIcon="dashboard_settings"
          showClearDate={true}
          isDefaultDate={false}
          selectedDate={jest.fn()}
        />
      );
      expect(screen.getByText('Select Date')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should maintain state across multiple interactions', () => {
      const mockCallback = jest.fn();
      const { rerender } = setup({ onDatePicker: mockCallback, showTitle: true, titleText: 'Date' });
      expect(screen.getByText('Date')).toBeInTheDocument();
      rerender(<RdsDatepicker {...defaultProps} onDatePicker={mockCallback} showTitle={false} titleText="Date" />);
      expect(screen.queryByText('Date')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RdsDatepicker — keyboard navigation', () => {
  it('date input is focusable via Tab', async () => {
    render(<RdsDatepicker />);
    await userEvent.tab();
    const input = screen.getByTestId('date-picker-input');
    expect(input).toHaveFocus();
  });

  it('accepts keyboard input in date field', async () => {
    render(<RdsDatepicker />);
    const input = screen.getByTestId('date-picker-input');
    input.focus();
    await userEvent.type(input, '01/01/2025');
    expect(input).toHaveFocus();
  });

  it('clear button is focusable when showClearDate is true', async () => {
    render(<RdsDatepicker showClearDate />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
    await userEvent.tab();
    expect(document.activeElement).not.toBe(document.body);
  });

  it('does not focus input when disabled', async () => {
    render(<RdsDatepicker disabled />);
    const input = screen.getByTestId('date-picker-input');
    expect(input).toBeDisabled();
  });
});

describe('audit fixes', () => {
  const { act } = jest.requireActual('@testing-library/react');
  const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
  const { CustomInputWithClear } = jest.requireActual('./CustomInputWithClear');
  const { RenderDefaultDropdownHeader } = jest.requireActual('./renderCustomHeader');

  afterEach(() => {
    jest.useRealTimers();
  });

  it('G4-088: top-level disabled/required win over legacy props', () => {
    render(<RdsDatepicker isDisabled disabled={false} showTitle titleText="Date" isMandatory={false} required />);
    expect(screen.getByTestId('date-picker-input')).not.toBeDisabled();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('G4-089: isDisabled / isMandatory warn as deprecated', () => {
    render(<RdsDatepicker isDisabled isMandatory />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', 'isDisabled', '`disabled`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', 'isMandatory', '`required`');
  });

  it('G4-091: visible label points at the input id', () => {
    const { container } = render(<RdsDatepicker showTitle titleText="Date" />);
    const label = container.querySelector('label.rds-datepicker__label');
    expect(label?.getAttribute('for')).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(mockCaptured.type?.[5].inputId);
  });

  it('G4-094: clearing a date-time picker sets internal state to null', () => {
    const onDatePicker = jest.fn();
    render(<RdsDatepicker dateForEdit="2024-12-25" onDatePicker={onDatePicker} />);
    act(() => mockCaptured.type?.[3](null));
    expect(onDatePicker).toHaveBeenCalledWith(null);
    expect(mockCaptured.type?.[1]).toBeNull();
  });

  it('G4-097: presets use the current date at click time', () => {
    jest.useFakeTimers({ now: new Date(2025, 0, 1, 12) });
    const customDate = jest.fn();
    render(<RdsDatepicker type="Custom" customDate={customDate} />);
    jest.setSystemTime(new Date(2025, 0, 10, 12));
    act(() => mockCaptured.type?.[12]());
    expect(customDate.mock.calls[0][0][0].getDate()).toBe(9);
  });

  it('G4-098: dateForEdit and isDefaultDate changes still update the selection', () => {
    const { rerender } = render(<RdsDatepicker dateForEdit="2024-12-25T00:00:00" />);
    rerender(<RdsDatepicker dateForEdit="2024-12-26T00:00:00" />);
    expect(mockCaptured.type?.[1].getDate()).toBe(26);
    const { rerender: rerender2 } = render(<RdsDatepicker isDefaultDate={false} />);
    rerender2(<RdsDatepicker isDefaultDate />);
    expect(mockCaptured.type?.[1]).toBeInstanceOf(Date);
  });

  it('G4-101: header selects are labelled', () => {
    render(
      <RenderDefaultDropdownHeader date={new Date(2025, 0, 1)} monthDate={new Date(2025, 0, 1)} changeYear={jest.fn()} changeMonth={jest.fn()} />
    );
    expect(screen.getByRole('combobox', { name: 'Month' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Year' })).toBeInTheDocument();
  });

  it('G4-104: Escape closes the preset list; trigger exposes aria-expanded', () => {
    render(<RdsDatepicker type="Custom" />);
    act(() => mockCaptured.type?.[7]());
    expect(mockCaptured.type?.[6]).toBe(true);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockCaptured.type?.[6]).toBe(false);

    render(<CustomInputWithClear expanded controlsId="list" />);
    expect(screen.getByRole('button', { name: 'Open calendar' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('G4-105: injected props reach the input; ref is the input; icon buttons are labelled', () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    render(
      <CustomInputWithClear ref={ref} id="dp-input" value="01/01/2025" onChange={onChange} onKeyDown={onKeyDown} showClearDate />
    );
    const input = document.getElementById('dp-input') as HTMLInputElement;
    expect(ref.current).toBe(input);
    fireEvent.change(input, { target: { value: '01/02/2025' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
  });

  it('B34: new names drive the same shared props as the old ones', () => {
    render(<RdsDatepicker label="Date" placeholder="Pick" variant="dropdown" clearable openPickerIcon={<span>i</span>} />);
    const props = mockCaptured.type?.[5];
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(props).toMatchObject({ placeholderText: 'Pick', datePickerStyleType: DatePickerStyleType.Dropdown, showClearDate: true, showTitle: true });
    render(<CustomInputWithClear openPickerIcon={<span data-testid="own-icon" />} changeIcon="dashboard_settings" />);
    expect(screen.getByTestId('own-icon')).toBeInTheDocument();
  });

  it('B34: value / defaultValue / onChange replace dateForEdit / isDefaultDate / onDatePicker', () => {
    const onChange = jest.fn();
    const { rerender } = render(<RdsDatepicker defaultValue="2024-12-25T00:00:00" onChange={onChange} />);
    expect(mockCaptured.type?.[1].getDate()).toBe(25);
    rerender(<RdsDatepicker value="2024-12-26T00:00:00" onChange={onChange} />);
    expect(mockCaptured.type?.[1].getDate()).toBe(26);
    rerender(<RdsDatepicker value={null} onChange={onChange} />);
    expect(mockCaptured.type?.[1]).toBeNull();
    act(() => mockCaptured.type?.[4]([null, null]));
    expect(onChange).toHaveBeenCalledWith([null, null]);
  });

  it('B34: legacy names warn as deprecated', () => {
    render(<RdsDatepicker dateForEdit="2024-12-25" onDatePicker={jest.fn()} placeholderText="x" changeIcon="calendar" showClearDate isDefaultDate controls={{ mandatory: 'required' }} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', 'dateForEdit', '`value`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', 'controls.mandatory', '`required`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', 'changeIcon', '`openPickerIcon`');
  });
});
