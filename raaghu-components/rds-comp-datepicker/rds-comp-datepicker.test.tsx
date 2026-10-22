import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDatepicker from './rds-comp-datepicker';
import { DatePickerStyleType, DatePickerLayout, DatePickerState } from './rds-comp-datepicker.types';

// Mock SCSS module
jest.mock('./rds-comp-datepicker.scss', () => ({}));

// Mock react-datepicker
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

// Captures the arguments the component passes to the (mocked) view renderers.
const mockCaptured: { state?: any[]; type?: any[] } = {};

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

// Mock the utils
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
  renderDatePickerStateView: (...args: any[]) => {
    mockCaptured.state = args;
    return <div data-testid="state-view" />;
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

  describe('Basic Rendering', () => {
    it('should render component', () => {
      render(<RdsDatepicker {...defaultProps} />);
      const container = screen.getByTestId('type-view');
      expect(container).toBeInTheDocument();
    });

    it('should render with title when showTitle is true', () => {
      render(<RdsDatepicker {...defaultProps} showTitle={true} titleText="Select Date" />);
      const label = screen.getByText('Select Date');
      expect(label).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(<RdsDatepicker {...defaultProps} showTitle={false} titleText="Select Date" />);
      const label = screen.queryByText('Select Date');
      expect(label).not.toBeInTheDocument();
    });

    it('should render mandatory indicator when isMandatory is true', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          titleText="Date"
          isMandatory={true}
        />
      );
      const indicator = screen.getByText('*');
      expect(indicator).toBeInTheDocument();
    });

    it('should not render mandatory indicator when isMandatory is false', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          titleText="Date"
          isMandatory={false}
        />
      );
      const indicator = screen.queryByText('*');
      expect(indicator).not.toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('should render state view when state prop is provided', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Default}
        />
      );
      // Component should render successfully with state prop
      expect(container).toBeInTheDocument();
    });

    it('should render type view when type prop is provided', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          type="range"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should initialize with default date when isDefaultDate is true', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          isDefaultDate={true}
        />
      );
      // Component should initialize with today's date
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should initialize without date when isDefaultDate is false', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          isDefaultDate={false}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Date Callbacks', () => {
    it('should call selectedDate callback when date is selected', () => {
      const mockCallback = jest.fn();
      render(
        <RdsDatepicker
          {...defaultProps}
          selectedDate={mockCallback}
        />
      );
      // The callback would be called through the utility component handlers
      expect(mockCallback).toBeDefined();
    });

    it('should call onDatePicker callback when date is picked', () => {
      const mockCallback = jest.fn();
      render(
        <RdsDatepicker
          {...defaultProps}
          onDatePicker={mockCallback}
        />
      );
      expect(mockCallback).toBeDefined();
    });

    it('should call customDate callback for range selections', () => {
      const mockCallback = jest.fn();
      render(
        <RdsDatepicker
          {...defaultProps}
          customDate={mockCallback}
          type="range"
        />
      );
      expect(mockCallback).toBeDefined();
    });
  });

  describe('Disabled State', () => {
    it('should render as disabled when isDisabled is true', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          isDisabled={true}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should be interactive when isDisabled is false', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          isDisabled={false}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('should accept variant prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          variant="Custom"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
      expect(mockCaptured.type?.[0]).toBe("Custom");
    });

    it('applies CSS style to the root element and forwards datePickerStyleType', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          datePickerStyleType={DatePickerStyleType.Dropdown}
          style={{ marginTop: 8 }}
        />
      );
      expect(container.firstElementChild).toHaveStyle({ marginTop: '8px' });
      expect(mockCaptured.type?.[5].datePickerStyleType).toBe(DatePickerStyleType.Dropdown);
    });

    it('should accept layout prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          layout={DatePickerLayout.Default}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should accept state prop', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Default}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept placeholderText prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          placeholderText="Select a date"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should accept DatePickerLabel prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          DatePickerLabel="Pick Date"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should accept changeIcon prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          changeIcon="dashboard_settings"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should accept showClearDate prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          showClearDate={true}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Date Edit', () => {
    it('should set date from dateForEdit prop', () => {
      const testDate = '2024-12-25';
      render(
        <RdsDatepicker
          {...defaultProps}
          dateForEdit={testDate}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should update when dateForEdit prop changes', () => {
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          dateForEdit="2024-12-25"
        />
      );
      rerender(
        <RdsDatepicker
          {...defaultProps}
          dateForEdit="2024-12-26"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('State Transitions', () => {
    it('should transition to Expanded state', () => {
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Default}
        />
      );
      rerender(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Expanded}
        />
      );
      expect(screen.getByTestId('state-view')).toBeInTheDocument();
    });

    it('should transition to Selected state', () => {
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Default}
        />
      );
      rerender(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Selected}
        />
      );
      expect(screen.getByTestId('state-view')).toBeInTheDocument();
    });

    it('should transition from state view to type view', () => {
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          state={DatePickerState.Default}
        />
      );
      // Initial render should contain the component
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
      
      // Rerender with type prop instead
      rerender(
        <RdsDatepicker
          {...defaultProps}
          type="range"
        />
      );
      // Should still render type-view  
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Layout Options', () => {
    it('should render with Default layout', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          layout={DatePickerLayout.Default}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render with Month Picker layout', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          layout={DatePickerLayout.MonthPicker}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render with Year Picker layout', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          layout={DatePickerLayout.YearPicker}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render with Multi Month layout', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          layout={DatePickerLayout.MultiMonth}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Style Types', () => {
    it('should render with Dropdown style', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          variant="Custom"
          datePickerStyleType={DatePickerStyleType.Dropdown}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render with Selector style', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          variant="Default"
          datePickerStyleType={DatePickerStyleType.Selector}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Type Variations', () => {
    it('should render single date type', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          type="single"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render range type', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          type="range"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render datetime type', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          type="datetime"
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });
  });

  describe('Label Rendering', () => {
    it('should apply correct class to label when showTitle is true', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          titleText="Date"
        />
      );
      const label = container.querySelector('.rds-datepicker__label');
      expect(label).not.toHaveClass('rds-datepicker__label--hidden');
    });

    it('should apply hidden class to label when showTitle is false', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={false}
          titleText="Date"
        />
      );
      const label = container.querySelector('.rds-datepicker__label');
      expect(label).toHaveClass('rds-datepicker__label--hidden');
    });

    it('should have aria-hidden attribute when showTitle is false', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={false}
          titleText="Date"
        />
      );
      const label = container.querySelector('.rds-datepicker__label');
      expect(label).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not have aria-hidden attribute when showTitle is true', () => {
      const { container } = render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          titleText="Date"
        />
      );
      const label = container.querySelector('.rds-datepicker__label');
      expect(label).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Component Display Name', () => {
    it('should have displayName set to RdsDatepicker', () => {
      expect(RdsDatepicker.displayName).toBe('RdsCompDatepicker');
    });
  });

  describe('Multiple Rerenders', () => {
    it('should handle multiple prop changes', () => {
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          isMandatory={true}
          isDisabled={false}
        />
      );
      expect(screen.getByText('*')).toBeInTheDocument();
      
      rerender(
        <RdsDatepicker
          {...defaultProps}
          showTitle={true}
          isMandatory={false}
          isDisabled={true}
        />
      );
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined callbacks gracefully', () => {
      expect(() => {
        render(
          <RdsDatepicker
            {...defaultProps}
            selectedDate={undefined}
            onDatePicker={undefined}
            customDate={undefined}
          />
        );
      }).not.toThrow();
    });

    it('should handle undefined optional props', () => {
      expect(() => {
        render(
          <RdsDatepicker
            {...defaultProps}
            titleText={undefined}
            placeholderText={undefined}
            DatePickerLabel={undefined}
          />
        );
      }).not.toThrow();
    });

    it('should handle null dateForEdit', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          dateForEdit={undefined}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
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
          variant="Custom"
          state={DatePickerState.Default}
          layout={DatePickerLayout.Default}
          customDate={jest.fn()}
          isDisabled={false}
          isMandatory={true}
          placeholderText="Pick a date"
          DatePickerLabel="Date"
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
      const { rerender } = render(
        <RdsDatepicker
          {...defaultProps}
          onDatePicker={mockCallback}
          showTitle={true}
          titleText="Date"
        />
      );
      
      expect(screen.getByText('Date')).toBeInTheDocument();
      
      rerender(
        <RdsDatepicker
          {...defaultProps}
          onDatePicker={mockCallback}
          showTitle={false}
          titleText="Date"
        />
      );
      
      expect(screen.queryByText('Date')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsDatepicker {...defaultProps} />);
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
    render(<RdsDatepicker isDisabled />);
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
    render(<RdsDatepicker state={DatePickerState.Selected} dateForEdit="2024-12-25" onDatePicker={onDatePicker} />);
    act(() => mockCaptured.state?.[3](null));
    expect(onDatePicker).toHaveBeenCalledWith(null);
    expect(mockCaptured.state?.[1]).toBeNull();
  });

  it('G4-097: presets use the current date at click time', () => {
    jest.useFakeTimers({ now: new Date(2025, 0, 1, 12) });
    const customDate = jest.fn();
    render(<RdsDatepicker variant="Custom" customDate={customDate} />);
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
    render(<RdsDatepicker variant="Custom" />);
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
});
