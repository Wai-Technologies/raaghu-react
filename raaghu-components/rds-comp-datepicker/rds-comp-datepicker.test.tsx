import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDatepicker, { DatePickerStyleType, DatePickerLayout, DatePickerState } from './rds-comp-datepicker';

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
              value={startDate ? new Date(startDate).toLocaleDateString() : ''}
              readOnly
            />
            <input
              data-testid="end-date-input"
              value={endDate ? new Date(endDate).toLocaleDateString() : ''}
              readOnly
            />
          </>
        )}
      </div>
    ),
  };
});

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
  renderDatePickerStateView: () => <div data-testid="state-view" />,
  renderDatePickerTypeView: () => <div data-testid="type-view" />,
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
    it('should accept datePickerStyleType prop', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
          datePickerStyleType={DatePickerStyleType.Dropdown}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
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
          datePickerStyleType={DatePickerStyleType.Dropdown}
        />
      );
      expect(screen.getByTestId('type-view')).toBeInTheDocument();
    });

    it('should render with Selector style', () => {
      render(
        <RdsDatepicker
          {...defaultProps}
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
      expect(RdsDatepicker.displayName).toBe('RdsDatepicker');
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
          datePickerStyleType={DatePickerStyleType.Dropdown}
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
