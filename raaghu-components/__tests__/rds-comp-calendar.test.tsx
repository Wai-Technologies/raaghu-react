import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCalendar from '../src/rds-comp-calendar/rds-comp-calendar';

// Define interfaces for mocking
interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  [key: string]: any;
}

interface CalendarProps {
  events: CalendarEvent[];
  localizer: any;
  startAccessor: string;
  endAccessor: string;
  className?: string;
}

// Mock the react-big-calendar module
jest.mock('react-big-calendar', () => {
  const Calendar = ({ 
    events, 
    localizer, 
    startAccessor, 
    endAccessor, 
    className 
  }: CalendarProps) => {
    return (
      <div 
        data-testid="mock-calendar"
        className={className}
      >
        <div data-testid="calendar-localizer">{localizer ? 'Localizer provided' : 'No localizer'}</div>
        <div data-testid="calendar-events">
          {events && events.map((event: CalendarEvent, index: number) => (
            <div key={index} data-testid={`event-${index}`}>
              <span data-testid={`event-title-${index}`}>{event.title}</span>
              <span data-testid={`event-start-${index}`}>{event.start.toString()}</span>
              <span data-testid={`event-end-${index}`}>{event.end.toString()}</span>
            </div>
          ))}
        </div>
        <div data-testid="start-accessor">{startAccessor}</div>
        <div data-testid="end-accessor">{endAccessor}</div>
      </div>
    );
  };

  return {
    Calendar,
    momentLocalizer: jest.fn(() => 'mock-localizer')
  };
});

// Mock moment.js
jest.mock('moment', () => {
  return () => ({
    toDate: jest.fn(),
    format: jest.fn()
  });
});

describe('RdsCompCalendar', () => {
  const mockEvents: CalendarEvent[] = [
    {
      title: 'Meeting with Team',
      start: new Date(2025, 5, 7, 10, 0), // June 7, 2025, 10:00 AM
      end: new Date(2025, 5, 7, 11, 30),  // June 7, 2025, 11:30 AM
    },
    {
      title: 'Lunch Break',
      start: new Date(2025, 5, 7, 12, 0), // June 7, 2025, 12:00 PM
      end: new Date(2025, 5, 7, 13, 0),   // June 7, 2025, 1:00 PM
    },
    {
      title: 'Project Review',
      start: new Date(2025, 5, 8, 14, 0), // June 8, 2025, 2:00 PM
      end: new Date(2025, 5, 8, 16, 0),   // June 8, 2025, 4:00 PM
    }
  ];

  it('renders without crashing', () => {
    const { container } = render(<RdsCompCalendar events={mockEvents} />);
    expect(container).toBeTruthy();
  });

  it('renders the Calendar component', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    const calendarElement = screen.getByTestId('mock-calendar');
    expect(calendarElement).toBeInTheDocument();
  });

  it('applies the correct CSS class to the Calendar', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    const calendarElement = screen.getByTestId('mock-calendar');
    expect(calendarElement).toHaveClass('calenderHeight');
  });

    it('passes the events prop to the Calendar component', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    
    // Check if all events are rendered
    mockEvents.forEach((_, index) => {
      expect(screen.getByTestId(`event-${index}`)).toBeInTheDocument();
    });

    // Check specific event details
    expect(screen.getByTestId('event-title-0')).toHaveTextContent('Meeting with Team');
    expect(screen.getByTestId('event-title-1')).toHaveTextContent('Lunch Break');
    expect(screen.getByTestId('event-title-2')).toHaveTextContent('Project Review');
  });

  it('sets the correct accessors for start and end times', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    
    // Check that the accessors are set correctly
    expect(screen.getByTestId('start-accessor')).toHaveTextContent('start');
    expect(screen.getByTestId('end-accessor')).toHaveTextContent('end');
  });

  it('provides a localizer to the Calendar component', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    
    // Check that a localizer is provided
    expect(screen.getByTestId('calendar-localizer')).toHaveTextContent('Localizer provided');
  });

  it('handles empty events array properly', () => {
    render(<RdsCompCalendar events={[]} />);
    
    // Calendar should still render
    expect(screen.getByTestId('mock-calendar')).toBeInTheDocument();
    
    // No events should be rendered
    expect(screen.queryByTestId(/^event-\d+$/)).not.toBeInTheDocument();
  });

  it('displays correct event date and time information', () => {
    render(<RdsCompCalendar events={mockEvents} />);
    
    // Verify event dates are correctly displayed
    expect(screen.getByTestId('event-start-0')).toHaveTextContent(mockEvents[0].start.toString());
    expect(screen.getByTestId('event-end-0')).toHaveTextContent(mockEvents[0].end.toString());
  });
});