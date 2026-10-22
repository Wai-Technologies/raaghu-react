import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompTimePicker, { RdsTimePickerProps } from './rds-comp-time-picker';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-comp-time-picker.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('@mui/icons-material/AccessTime', () => {
  return () => <span data-testid="access-time-icon">AccessTimeIcon</span>;
});

jest.mock('./time-picker-modes', () => ({
  CompactTimePicker: ({ tempHour, tempMinute, tempPeriod }: any) => (
    <div data-testid="compact-time-picker">
      <span data-testid="compact-hour">{tempHour}</span>
      <span data-testid="compact-minute">{tempMinute}</span>
      <span data-testid="compact-period">{tempPeriod}</span>
    </div>
  ),
  DefaultTimePicker: ({ hours, minutes, period }: any) => (
    <div data-testid="default-time-picker">
      <span data-testid="default-hour">{hours}</span>
      <span data-testid="default-minute">{minutes}</span>
      <span data-testid="default-period">{period}</span>
    </div>
  ),
}));

jest.mock('./time-picker-utils', () => ({
  getButtonClasses: (colorVariant: string) => ({
    cancel: `cancel-btn ${colorVariant || 'default'}`,
    setTime: `set-time-btn ${colorVariant || 'default'}`,
  }),
  getInputBorderClass: (colorVariant: string) => `border-${colorVariant || 'default'}`,
  getIconColor: (colorVariant: string) => colorVariant || '#757575',
  parseTimeFromValue: (value: string) => {
    if (!value) return { hours: 12, minutes: 0, period: 'AM' };
    const [time, period] = value.split(' ');
    const [hours, minutes] = time.split(':');
    return { hours: parseInt(hours), minutes: parseInt(minutes), period };
  },
  getCurrentTime: () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const period = now.getHours() >= 12 ? 'PM' : 'AM';
    return { hours, minutes, period };
  },
  formatTime: (hours: number, minutes: number, period: string) => 
    `${hours}:${String(minutes).padStart(2, '0')} ${period}`,
}));

describe('RdsCompTimePicker', () => {
  const defaultProps: RdsTimePickerProps = {
    style: 'default',
    colorVariant: 'primary',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompTimePicker.displayName).toBe('RdsCompTimePicker');
    });

    it('should render time input field', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render AccessTime icon', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      expect(screen.getByTestId('access-time-icon')).toBeInTheDocument();
    });

    it('should render time-picker-container', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} />);
      expect(container.querySelector('.time-picker-container')).toBeInTheDocument();
    });

    it('should not show time picker initially', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should render default time picker style', () => {
      render(<RdsCompTimePicker {...defaultProps} style="default" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should render compact time picker style', () => {
      render(<RdsCompTimePicker {...defaultProps} style="compact" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('compact-time-picker')).toBeInTheDocument();
    });

    it('should add time-picker-compact class for compact style', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} style="compact" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(container.querySelector('.time-picker-compact')).toBeInTheDocument();
    });

    it('should add time-picker class for default style', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} style="default" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(container.querySelector('.time-picker')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    const colorVariants: Array<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = 
      ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

    colorVariants.forEach((color) => {
      it(`should apply color variant ${color}`, () => {
        const { container } = render(<RdsCompTimePicker {...defaultProps} colorVariant={color} />);
        const input = screen.getByPlaceholderText('12:00 AM');
        expect(input).toHaveClass(`border-${color}`);
      });

      it(`should apply ${color} color to buttons`, () => {
        render(<RdsCompTimePicker {...defaultProps} colorVariant={color} />);
        const input = screen.getByPlaceholderText('12:00 AM');
        fireEvent.click(input);
        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        expect(cancelBtn).toHaveClass(`cancel-btn`);
      });
    });
  });

  describe('Open and selected props', () => {
    it('initializes picker closed by default', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('initializes picker open with defaultOpen', () => {
      render(<RdsCompTimePicker {...defaultProps} defaultOpen />);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('applies selected appearance without inventing a time value', () => {
      render(<RdsCompTimePicker {...defaultProps} selected />);
      const input = screen.getByPlaceholderText('12:00 AM');
      expect(input).toHaveClass('selected');
      expect(input).toHaveValue('');
    });
  });

  describe('Value Prop', () => {
    it('should display provided value in input', () => {
      render(<RdsCompTimePicker {...defaultProps} value="3:30 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('3:30 PM');
    });

    it('should update input when value prop changes', () => {
      const { rerender } = render(<RdsCompTimePicker {...defaultProps} value="2:15 PM" />);
      let input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('2:15 PM');

      rerender(<RdsCompTimePicker {...defaultProps} value="5:45 AM" />);
      input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('5:45 AM');
    });

    it('should parse time from value prop', () => {
      render(<RdsCompTimePicker {...defaultProps} style="default" value="3:30 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-hour')).toHaveTextContent('3');
      expect(screen.getByTestId('default-minute')).toHaveTextContent('30');
    });

    it('should handle empty value', () => {
      render(<RdsCompTimePicker {...defaultProps} value="" />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled prop is true', () => {
      render(<RdsCompTimePicker {...defaultProps} disabled={true} />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should add disabled class to container', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} disabled={true} />);
      expect(container.querySelector('.time-input-container.disabled')).toBeInTheDocument();
    });

    it('should not open picker when disabled', () => {
      render(<RdsCompTimePicker {...defaultProps} disabled={true} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('should not open picker when clicked and disabled', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} disabled={true} />);
      const inputContainer = container.querySelector('.time-input-container');
      fireEvent.click(inputContainer!);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });
  });

  describe('Picker Toggle', () => {
    it('should open picker on input click', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should close picker on second input click', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
      fireEvent.click(input);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('should open picker on input click', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} />);
      const input = container.querySelector('.time-input');
      fireEvent.click(input!);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });
  });

  describe('Callback Handling', () => {
    it('should call onChange when Set Time button clicked', () => {
      const onChange = jest.fn();
      render(<RdsCompTimePicker {...defaultProps} onChange={onChange} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);
      expect(onChange).toHaveBeenCalled();
    });

    it('should pass formatted time to onChange callback', () => {
      const onChange = jest.fn();
      render(<RdsCompTimePicker {...defaultProps} onChange={onChange} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);
      expect(onChange).toHaveBeenCalledWith(expect.stringContaining(':'));
    });

    it('should call onChange when Cancel button clicked', () => {
      const onChange = jest.fn();
      render(<RdsCompTimePicker {...defaultProps} value="3:30 PM" onChange={onChange} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);
      expect(onChange).toHaveBeenCalledWith('');
    });

    it('should pass empty string to onChange on Cancel', () => {
      const onChange = jest.fn();
      render(<RdsCompTimePicker {...defaultProps} value="3:30 PM" onChange={onChange} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);
      expect(onChange).toHaveBeenCalledWith('');
    });

    it('should not call onChange if not provided', () => {
      expect(() => {
        render(<RdsCompTimePicker {...defaultProps} onChange={undefined} />);
        const input = screen.getByPlaceholderText('12:00 AM');
        fireEvent.click(input);
        const setTimeBtn = screen.getByRole('button', { name: /set time/i });
        fireEvent.click(setTimeBtn);
      }).not.toThrow();
    });
  });

  describe('Buttons', () => {
    it('should render Cancel button', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('should render Set Time button', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByRole('button', { name: /set time/i })).toBeInTheDocument();
    });

    it('should render NOW button', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByText('NOW')).toBeInTheDocument();
    });

    it('should set current time on NOW button click (default style)', () => {
      render(<RdsCompTimePicker {...defaultProps} style="default" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const nowBtn = screen.getByText('NOW');
      fireEvent.click(nowBtn);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should set current time on NOW button click (compact style)', () => {
      render(<RdsCompTimePicker {...defaultProps} style="compact" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const nowBtn = screen.getByText('NOW');
      fireEvent.click(nowBtn);
      expect(screen.getByTestId('compact-time-picker')).toBeInTheDocument();
    });

    it('should close picker after Set Time click', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('should close picker after Cancel click', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });
  });

  describe('Time Display', () => {
    it('should show time in picker display', () => {
      render(<RdsCompTimePicker {...defaultProps} value="3:30 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should show default time when no value provided', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const hour = screen.getByTestId('default-hour');
      expect(hour).toHaveTextContent('12');
    });

    it('should handle 12-hour format correctly', () => {
      render(<RdsCompTimePicker {...defaultProps} value="12:30 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-hour')).toHaveTextContent('12');
    });

    it('should display time with leading zeros for minutes', () => {
      render(<RdsCompTimePicker {...defaultProps} value="3:05 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-minute')).toHaveTextContent('5');
    });
  });

  describe('Compact Style Special Behavior', () => {
    it('should use temp variables for compact style', () => {
      render(<RdsCompTimePicker {...defaultProps} style="compact" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('compact-time-picker')).toBeInTheDocument();
      expect(screen.getByTestId('compact-hour')).toHaveTextContent('12');
    });

    it('should preserve previously set time in compact on second open', () => {
      render(<RdsCompTimePicker {...defaultProps} style="compact" value="3:30 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);
      fireEvent.click(input);
      expect(screen.getByTestId('compact-hour')).toHaveTextContent('3');
    });

    it('should display correct time in compact picker after set', () => {
      render(<RdsCompTimePicker {...defaultProps} style="compact" value="5:45 PM" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('compact-hour')).toHaveTextContent('5');
      expect(screen.getByTestId('compact-minute')).toHaveTextContent('45');
      expect(screen.getByTestId('compact-period')).toHaveTextContent('PM');
    });
  });

  describe('Default Style Special Behavior', () => {
    it('should use regular variables for default style', () => {
      render(<RdsCompTimePicker {...defaultProps} style="default" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should apply time controls for default style', () => {
      render(<RdsCompTimePicker {...defaultProps} style="default" />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-hour')).toHaveTextContent('12');
      expect(screen.getByTestId('default-minute')).toHaveTextContent('0');
      expect(screen.getByTestId('default-period')).toHaveTextContent('AM');
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal props', () => {
      render(<RdsCompTimePicker />);
      expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
    });

    it('should render with all props', () => {
      const onChange = jest.fn();
      render(
        <RdsCompTimePicker
          style="compact"
          colorVariant="success"
          defaultOpen
          onChange={onChange}
          disabled={false}
        />
      );
      expect(screen.getByTestId('compact-time-picker')).toBeInTheDocument();
    });

    it('should handle undefined onChange prop', () => {
      render(<RdsCompTimePicker {...defaultProps} onChange={undefined} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      expect(() => fireEvent.click(setTimeBtn)).not.toThrow();
    });

    it('should handle undefined value prop', () => {
      render(<RdsCompTimePicker {...defaultProps} value={undefined} />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('Input Characteristics', () => {
    it('should have readonly input field', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input).toHaveAttribute('readonly');
    });

    it('should have placeholder 12:00 AM', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
    });

    it('should be text type input', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.type).toBe('text');
    });
  });

  describe('Separator Line', () => {
    it('should render time divider', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const separator = container.querySelector('hr.time-divider');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveClass('time-divider');
    });

    it('should have aria-hidden on separator', () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const separator = container.querySelector('hr.time-divider');
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined style prop', () => {
      render(<RdsCompTimePicker {...defaultProps} style={undefined} />);
      expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
    });

    it('should handle undefined colorVariant prop', () => {
      render(<RdsCompTimePicker {...defaultProps} colorVariant={undefined} />);
      expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
    });

    it('should handle rapid open/close toggling', () => {
      render(<RdsCompTimePicker {...defaultProps} />);
      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      fireEvent.click(input);
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();
    });

    it('should handle controlled open changes', () => {
      const { rerender } = render(<RdsCompTimePicker {...defaultProps} open={false} />);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();

      rerender(<RdsCompTimePicker {...defaultProps} open />);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();

      rerender(<RdsCompTimePicker {...defaultProps} open={false} />);
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete user flow', () => {
      const onChange = jest.fn();
      render(
        <RdsCompTimePicker
          {...defaultProps}
          style="default"
          colorVariant="primary"
          value=""
          onChange={onChange}
        />
      );

      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      expect(screen.getByTestId('default-time-picker')).toBeInTheDocument();

      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);

      expect(onChange).toHaveBeenCalled();

      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('should handle cancel flow', () => {
      const onChange = jest.fn();
      render(
        <RdsCompTimePicker
          {...defaultProps}
          value="3:30 PM"
          onChange={onChange}
        />
      );

      const input = screen.getByPlaceholderText('12:00 AM');
      fireEvent.click(input);
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);

      expect(onChange).toHaveBeenCalledWith('');
      expect(screen.queryByTestId('default-time-picker')).not.toBeInTheDocument();
    });

    it('should render successfully with all color variants and styles', () => {
      const styles: Array<'default' | 'compact'> = ['default', 'compact'];
      const colors: Array<'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = 
        ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

      styles.forEach((style) => {
        colors.forEach((color) => {
          const { unmount } = render(
            <RdsCompTimePicker
              style={style}
              colorVariant={color}
            />
          );
          expect(screen.getByPlaceholderText('12:00 AM')).toBeInTheDocument();
          unmount();
        });
      });
    });

    it('should maintain state consistency through multiple interactions', () => {
      const onChange = jest.fn();
      render(<RdsCompTimePicker {...defaultProps} onChange={onChange} />);
      const input = screen.getByPlaceholderText('12:00 AM') as HTMLInputElement;
      expect(input.value).toBe('');

      fireEvent.click(input);
      expect(screen.getByTestId('default-hour')).toHaveTextContent('12');

      const setTimeBtn = screen.getByRole('button', { name: /set time/i });
      fireEvent.click(setTimeBtn);
      expect(onChange).toHaveBeenCalled();

      fireEvent.click(input);
      const cancelBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(cancelBtn);
      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompTimePicker {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('audit fixes', () => {
    const open = () => fireEvent.click(screen.getByPlaceholderText('12:00 AM'));

    it('closes on Escape and outside click without onChange; popup is a labelled dialog', () => {
      const onChange = jest.fn();
      const onOpen = jest.fn();
      const onClose = jest.fn();
      render(<RdsCompTimePicker value="3:30 PM" onChange={onChange} onOpen={onOpen} onClose={onClose} />);
      open();
      expect(screen.getByRole('dialog', { name: 'Time picker' })).toBeInTheDocument();
      expect(onOpen).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      open();
      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(2);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('variant wins over style; color wins over colorVariant', () => {
      const { container } = render(<RdsCompTimePicker style="default" variant="compact" colorVariant="info" color="success" />);
      open();
      expect(container.querySelector('.time-picker-compact')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('12:00 AM')).toHaveClass('border-success');
    });

    it('supports localeText', () => {
      render(<RdsCompTimePicker localeText={{ now: 'Jetzt', cancel: 'Abbrechen', setTime: 'Setzen', placeholder: 'HH:MM' }} />);
      fireEvent.click(screen.getByPlaceholderText('HH:MM'));
      expect(screen.getByText('Jetzt')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Abbrechen' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Setzen' })).toBeInTheDocument();
    });
  });

  describe('audit fixes', () => {
    it('open controls the popup', () => {
      const { rerender } = render(<RdsCompTimePicker {...defaultProps} defaultOpen open={false} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      rerender(<RdsCompTimePicker {...defaultProps} open />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('defaultOpen opens the popup initially and it can be closed', () => {
      render(<RdsCompTimePicker {...defaultProps} defaultOpen />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
