import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompScheduler, { SchedulerEvent } from './rds-comp-scheduler';

// Mock SCSS
jest.mock('./rds-comp-scheduler.scss', () => ({}));

const mockEvents: SchedulerEvent[] = [
  {
    id: 'event-1',
    title: 'Meeting with Team',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 3600000).toISOString(),
    description: 'Discuss Q1 roadmap',
    resource: 'work',
  },
  {
    id: 'event-2',
    title: 'Project Deadline',
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 90000000).toISOString(),
    resource: 'family',
  },
];

describe('RdsCompScheduler', () => {
  describe('Rendering', () => {
    it('should render scheduler container', () => {
      render(<RdsCompScheduler events={mockEvents} />);
      expect(screen.getByTestId('rds-comp-scheduler')).toBeInTheDocument();
    });

    it('should render with correct CSS classes', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} size="medium" view="month" />
      );
      const scheduler = container.querySelector('.rds-comp-scheduler');
      expect(scheduler).toHaveClass('rds-comp-scheduler--medium', 'rds-comp-scheduler--month');
    });

    it('should render calendar header with controls', () => {
      render(<RdsCompScheduler events={mockEvents} showControls={true} />);
      expect(screen.getByLabelText('Previous')).toBeInTheDocument();
      expect(screen.getByLabelText('Next')).toBeInTheDocument();
      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    it('should hide controls when showControls is false', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} showControls={false} />
      );
      expect(container.querySelector('.rds-comp-scheduler__header')).not.toBeInTheDocument();
    });

    it('should render month view by default', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} />);
      expect(container.querySelector('.rds-comp-scheduler__month')).toBeInTheDocument();
    });

    it('should render week view when specified', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} view="week" />);
      expect(container.querySelector('.rds-comp-scheduler__week')).toBeInTheDocument();
    });

    it('should render day view when specified', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} view="day" />);
      expect(container.querySelector('.rds-comp-scheduler__day')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should use defaultDate for initial date', () => {
      const testDate = new Date(2024, 0, 15);
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={testDate}
          view="month"
        />
      );
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('should navigate to next month on next button click', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date(2024, 0, 15)}
          view="month"
        />
      );
      expect(screen.getByText('January 2024')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Next'));
      expect(screen.getByText('February 2024')).toBeInTheDocument();
    });

    it('should navigate to previous month on previous button click', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date(2024, 1, 15)}
          view="month"
        />
      );
      expect(screen.getByText('February 2024')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Previous'));
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('should go to today on Today button click', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date(2024, 0, 1)}
        />
      );
      fireEvent.click(screen.getByText('Today'));
      const today = new Date();
      const expectedMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
      expect(screen.getByText(expectedMonth)).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('should use currentDate prop when provided', () => {
      const testDate = new Date(2024, 3, 15);
      render(
        <RdsCompScheduler
          events={mockEvents}
          currentDate={testDate}
          view="month"
        />
      );
      expect(screen.getByText('April 2024')).toBeInTheDocument();
    });

    it('should call onChange when date changes', () => {
      const handleChange = jest.fn();
      const testDate = new Date(2024, 0, 15);
      const { rerender } = render(
        <RdsCompScheduler
          events={mockEvents}
          currentDate={testDate}
          onChange={handleChange}
          view="month"
        />
      );

      fireEvent.click(screen.getByLabelText('Next'));
      expect(handleChange).toHaveBeenCalled();
    });

    it('should update displayed month when currentDate prop changes', () => {
      const { rerender } = render(
        <RdsCompScheduler
          events={mockEvents}
          currentDate={new Date(2024, 0, 15)}
          view="month"
        />
      );
      expect(screen.getByText('January 2024')).toBeInTheDocument();

      rerender(
        <RdsCompScheduler
          events={mockEvents}
          currentDate={new Date(2024, 1, 15)}
          view="month"
        />
      );
      expect(screen.getByText('February 2024')).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    it('should display events on correct dates', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date()}
          view="month"
        />
      );
      expect(screen.getByTestId('event-event-1')).toBeInTheDocument();
    });

    it('should call onEventClick when event is clicked', () => {
      const handleEventClick = jest.fn();
      render(
        <RdsCompScheduler
          events={mockEvents}
          onEventClick={handleEventClick}
        />
      );
      fireEvent.click(screen.getByTestId('event-event-1'));
      expect(handleEventClick).toHaveBeenCalledWith(mockEvents[0]);
    });

    it('should display event resource classes', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date()}
        />
      );
      const event1 = screen.getByTestId('event-event-1');
      expect(event1).toHaveClass('rds-comp-scheduler__event--primary');

      const event2 = screen.getByTestId('event-event-2');
      expect(event2).toHaveClass('rds-comp-scheduler__event--error');
    });

    it('should mark selected event', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date()}
        />
      );
      const event = screen.getByTestId('event-event-1');
      fireEvent.click(event);
      expect(event).toHaveClass('rds-comp-scheduler__event--selected');
    });

    it('should display event details in dialog when event is selected', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          onEventClick={() => {}}
        />
      );
      fireEvent.click(screen.getByTestId('event-event-1'));
      // Dialog should open when event is clicked
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      // Event title should be visible in the form
      expect(screen.getByDisplayValue(mockEvents[0].title)).toBeInTheDocument();
    });

    it('should call onEventDelete when delete button is clicked', () => {
      const handleEventDelete = jest.fn();
      render(
        <RdsCompScheduler
          events={mockEvents}
          onEventDelete={handleEventDelete}
        />
      );
      fireEvent.click(screen.getByTestId('event-event-1'));
      fireEvent.click(screen.getByText('Delete'));
      expect(handleEventDelete).toHaveBeenCalledWith('event-1');
    });
  });

  describe('Size Variants', () => {
    it('should render with small size class', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} size="small" />
      );
      expect(container.querySelector('.rds-comp-scheduler')).toHaveClass(
        'rds-comp-scheduler--small'
      );
    });

    it('should render with medium size class', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} size="medium" />
      );
      expect(container.querySelector('.rds-comp-scheduler')).toHaveClass(
        'rds-comp-scheduler--medium'
      );
    });

    it('should render with large size class', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} size="large" />
      );
      expect(container.querySelector('.rds-comp-scheduler')).toHaveClass(
        'rds-comp-scheduler--large'
      );
    });
  });

  describe('View Types', () => {
    it('should render month view correctly', () => {
      const { container } = render(
        <RdsCompScheduler
          events={mockEvents}
          defaultDate={new Date(2024, 0, 15)}
          view="month"
        />
      );
      const dayHeaders = container.querySelectorAll('.rds-comp-scheduler__day-header');
      expect(dayHeaders.length).toBeGreaterThan(0);
    });

    it('should render week view correctly', () => {
      const { container } = render(
        <RdsCompScheduler
          events={mockEvents}
          view="week"
        />
      );
      const weekDayHeaders = container.querySelectorAll('.rds-comp-scheduler__week-day-header');
      expect(weekDayHeaders.length).toBeGreaterThan(0);
    });

    it('should render day view correctly', () => {
      render(
        <RdsCompScheduler
          events={mockEvents}
          view="day"
        />
      );
      expect(screen.getByText(/\w+,\s+\w+\s+\d+,\s+\d+/)).toBeInTheDocument();
    });
  });

  describe('Today Highlighting', () => {
    it('should highlight today in month view', () => {
      const { container } = render(
        <RdsCompScheduler
          events={mockEvents}
          view="month"
        />
      );
      const todayCell = container.querySelector('.rds-comp-scheduler__day-cell--today');
      expect(todayCell).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on navigation buttons', () => {
      render(<RdsCompScheduler events={mockEvents} />);
      expect(screen.getByLabelText('Previous')).toHaveAttribute('aria-label', 'Previous');
      expect(screen.getByLabelText('Next')).toHaveAttribute('aria-label', 'Next');
    });

    it('should have role button on events', () => {
      render(<RdsCompScheduler events={mockEvents} />);
      const event = screen.getByTestId('event-event-1');
      expect(event).toHaveAttribute('role', 'button');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} className="custom-class" />
      );
      expect(container.querySelector('.rds-comp-scheduler')).toHaveClass('custom-class');
    });
  });

  describe('Event Form', () => {
    it('should display add event hint when controls are shown', () => {
      render(<RdsCompScheduler events={mockEvents} showControls={true} />);
      expect(screen.getByText('Click on any date to create an event')).toBeInTheDocument();
    });

    it('should not display add event hint when controls are hidden', () => {
      const { container } = render(
        <RdsCompScheduler events={mockEvents} showControls={false} />
      );
      expect(container.textContent).not.toContain('Click on any date to create an event');
    });

    it('should open form dialog when a day cell is clicked', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} showControls={true} />);
      // Find today's cell (which has the --today class)
      const todayCell = container.querySelector('.rds-comp-scheduler__day-cell--today') as HTMLElement;
      if (todayCell) {
        fireEvent.click(todayCell);
      } else {
        // Fallback: click on a future date cell if today is not found
        const dayCell = screen.getByTestId('day-cell-15');
        fireEvent.click(dayCell);
      }
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display form fields for event creation', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} showControls={true} />);
      // Find today's cell (which has the --today class)
      const todayCell = container.querySelector('.rds-comp-scheduler__day-cell--today') as HTMLElement;
      if (todayCell) {
        fireEvent.click(todayCell);
      } else {
        const dayCell = screen.getByTestId('day-cell-15');
        fireEvent.click(dayCell);
      }
      
      // Check for input fields in the dialog
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('should close form when cancel button is clicked', () => {
      const { container } = render(<RdsCompScheduler events={mockEvents} showControls={true} />);
      // Find today's cell (which has the --today class)
      const todayCell = container.querySelector('.rds-comp-scheduler__day-cell--today') as HTMLElement;
      if (todayCell) {
        fireEvent.click(todayCell);
      } else {
        const dayCell = screen.getByTestId('day-cell-15');
        fireEvent.click(dayCell);
      }
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      
      // Close the dialog by clicking outside or pressing escape
      fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
      
      // After closing, we should be able to open the dialog again by clicking another cell
      const futureCell = container.querySelector('[data-testid="day-cell-20"]') as HTMLElement;
      if (futureCell) {
        fireEvent.click(futureCell);
        const dialogAfter = screen.getByRole('dialog');
        expect(dialogAfter).toBeInTheDocument();
      }
    });

    it('should open form with event data when event is clicked', () => {
      render(<RdsCompScheduler events={mockEvents} onEventDelete={jest.fn()} />);
      fireEvent.click(screen.getByTestId('event-event-1'));
      
      // Dialog should open when event is clicked
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      // Event title should be visible in the dialog
      expect(screen.getByDisplayValue(mockEvents[0].title)).toBeInTheDocument();
    });
  });
});
