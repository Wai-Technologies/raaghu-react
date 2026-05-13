import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Box, 
  Button, 
  IconButton, 
  Typography, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import './rds-comp-scheduler.scss';

/**
 * Scheduler event item
 */
export interface SchedulerEvent {
  /** Unique identifier for the event */
  id: string | number;
  /** Event title/name */
  title: string;
  /** Start date/time (ISO string or Date) */
  startDate: string | Date;
  /** End date/time (ISO string or Date) */
  endDate: string | Date;
  /** Event description */
  description?: string;
  /** Event resource/category */
  resource?: 'work' | 'health' | 'social' | 'personal' | 'travel' | 'family';
  /** Whether event is all-day */
  allDay?: boolean;
  /** Custom data */
  metadata?: Record<string, any>;
}

/**
 * Resource color mapping
 */
const RESOURCE_COLORS: Record<string, 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
  work: 'primary',        // Blue (#1976d2)
  health: 'success',      // Green (#388e3c)
  social: 'warning',      // Orange (#f57c00)
  personal: 'secondary',  // Purple (#7c4dff)
  travel: 'info',         // Cyan (#2196f3)
  family: 'error',        // Red (#d32f2f)
};

/**
 * Resource color mapping for display (actual hex values)
 */
const RESOURCE_COLOR_VALUES: Record<string, string> = {
  work: '#1976d2',        // Blue
  health: '#388e3c',      // Green
  social: '#f57c00',      // Orange
  personal: '#7c4dff',    // Purple
  travel: '#2196f3',      // Cyan
  family: '#d32f2f',      // Red
};

/**
 * Resource options for display
 */
const RESOURCE_OPTIONS = [
  { value: '', label: 'No resource' },
  { value: 'work', label: 'Work' },
  { value: 'health', label: 'Health' },
  { value: 'social', label: 'Social' },
  { value: 'personal', label: 'Personal' },
  { value: 'travel', label: 'Travel' },
  { value: 'family', label: 'Family' },
];

/**
 * Props for RdsCompScheduler component
 */
export interface RdsCompSchedulerProps {
  /** Array of events to display */
  events?: SchedulerEvent[];
  /** Currently displayed date - controlled mode */
  currentDate?: Date;
  /** Default displayed date - uncontrolled mode */
  defaultDate?: Date;
  /** View type */
  view?: 'month' | 'week' | 'day';
  /** Size of the scheduler */
  size?: 'small' | 'medium' | 'large';
  /** Callback when date changes */
  onChange?: (date: Date) => void;
  /** Callback when event is clicked */
  onEventClick?: (event: SchedulerEvent) => void;
  /** Callback when new event is added */
  onEventAdd?: (event: SchedulerEvent) => void;
  /** Callback when event is deleted */
  onEventDelete?: (eventId: string | number) => void;
  /** Callback when event is updated */
  onEventUpdate?: (event: SchedulerEvent) => void;
  /** Whether to show controls */
  showControls?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Disable future dates */
  disableFuture?: boolean;
  /** Disable past dates */
  disablePast?: boolean;
}

/**
 * RdsCompScheduler - Calendar scheduler component with event management
 * Supports month, week, and day views
 * Supports controlled and uncontrolled modes
 * Supports event creation, editing, and deletion
 * Supports color-coded events and time slots
 * 
 * @example
 * // Uncontrolled
 * <RdsCompScheduler 
 *   events={events}
 *   defaultDate={new Date()}
 *   view="month"
 * />
 * 
 * // Controlled
 * <RdsCompScheduler 
 *   events={events}
 *   currentDate={date}
 *   onChange={setDate}
 *   view="week"
 * />
 */
const RdsCompScheduler: React.FC<RdsCompSchedulerProps> = ({
  events = [],
  currentDate: controlledDate,
  defaultDate,
  view = 'month',
  size = 'medium',
  onChange,
  onEventClick,
  onEventAdd,
  onEventDelete,
  onEventUpdate,
  showControls = true,
  className,
  disableFuture = false,
  disablePast = false,
}) => {
  // State management
  const [internalDate, setInternalDate] = useState<Date>(defaultDate || new Date());
  const [selectedEvent, setSelectedEvent] = useState<SchedulerEvent | null>(null);
  const [allLocalEvents, setAllLocalEvents] = useState<SchedulerEvent[]>(events);
  
  // Sync events prop with local state
  useEffect(() => {
    setAllLocalEvents(events);
  }, [events]);
  
  // Helper function to convert local date to YYYY-MM-DD string (fixes timezone offset issues)
  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Helper function to get color for a resource
  const getColorForResource = (resource?: string): 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' => {
    if (!resource) return 'primary';
    return RESOURCE_COLORS[resource] || 'primary';
  };
  
  // Event form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<SchedulerEvent & { startTime: string; endTime: string }>>({
    title: '',
    description: '',
    resource: '',
    allDay: false,
    startDate: getLocalDateString(new Date()),
    endDate: getLocalDateString(new Date()),
    startTime: '09:00',
    endTime: '10:00',
  });

  // Determine if controlled or uncontrolled
  const isControlled = controlledDate !== undefined;
  const currentDisplayDate = isControlled ? controlledDate : internalDate;

  // Helper functions
  const handleDateChange = useCallback(
    (newDate: Date) => {
      if (!isControlled) {
        setInternalDate(newDate);
      }
      onChange?.(newDate);
    },
    [isControlled, onChange]
  );

  const handlePrevious = useCallback(() => {
    const newDate = new Date(currentDisplayDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    handleDateChange(newDate);
  }, [currentDisplayDate, view, handleDateChange]);

  const handleNext = useCallback(() => {
    const newDate = new Date(currentDisplayDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    handleDateChange(newDate);
  }, [currentDisplayDate, view, handleDateChange]);

  const handleToday = useCallback(() => {
    handleDateChange(new Date());
  }, [handleDateChange]);

  const handleEventDelete = useCallback(
    (eventId: string | number) => {
      onEventDelete?.(eventId);
      setAllLocalEvents(allLocalEvents.filter((e) => e.id !== eventId));
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null);
      }
    },
    [onEventDelete, allLocalEvents, selectedEvent]
  );

  // Event form handlers
  const handleOpenForm = useCallback((event?: SchedulerEvent) => {
    if (event) {
      const startDateTime = new Date(event.startDate);
      const endDateTime = new Date(event.endDate);
      const startTimeStr = `${String(startDateTime.getHours()).padStart(2, '0')}:${String(startDateTime.getMinutes()).padStart(2, '0')}`;
      const endTimeStr = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;
      
      setIsEditing(true);
      setFormData({
        id: event.id,
        title: event.title,
        description: event.description,
        resource: event.resource || '',
        allDay: event.allDay || false,
        startDate: getLocalDateString(new Date(event.startDate)),
        endDate: getLocalDateString(new Date(event.endDate)),
        startTime: event.allDay ? '00:00' : startTimeStr,
        endTime: event.allDay ? '00:00' : endTimeStr,
      });
    } else {
      setIsEditing(false);
      setFormData({
        title: '',
        description: '',
        resource: '',
        allDay: false,
        startDate: getLocalDateString(new Date()),
        endDate: getLocalDateString(new Date()),
        startTime: '09:00',
        endTime: '10:00',
      });
    }
    setIsFormOpen(true);
  }, []);

  // Open form with specific date pre-selected
  const handleOpenFormWithDate = useCallback((date: Date) => {
    // Check if the selected date is in the past, if so use today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const dateToUse = selectedDate < today ? today : selectedDate;
    const dateString = getLocalDateString(dateToUse);
    
    setIsEditing(false);
    setFormData({
      title: '',
      description: '',
      resource: '',
      allDay: false,
      startDate: dateString,
      endDate: dateString,
      startTime: '09:00',
      endTime: '10:00',
    });
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      resource: '',
      allDay: false,
      startDate: getLocalDateString(new Date()),
      endDate: getLocalDateString(new Date()),
      startTime: '09:00',
      endTime: '10:00',
    });
  }, []);

  const handleFormSubmit = useCallback(() => {
    if (!formData.title) {
      alert('Please enter an event title');
      return;
    }

    const startTimeStr = formData.allDay ? 'T00:00:00' : `T${formData.startTime || '09:00'}:00`;
    const endTimeStr = formData.allDay ? 'T00:00:00' : `T${formData.endTime || '10:00'}:00`;

    const newEvent: SchedulerEvent = {
      id: isEditing ? (formData.id as string | number) : `event-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      resource: (formData.resource as any) || '',
      allDay: formData.allDay || false,
      startDate: `${formData.startDate}${startTimeStr}`,
      endDate: `${formData.endDate}${endTimeStr}`,
    };

    if (isEditing) {
      setAllLocalEvents(allLocalEvents.map((e) => (e.id === newEvent.id ? newEvent : e)));
      onEventUpdate?.(newEvent);
    } else {
      setAllLocalEvents([...allLocalEvents, newEvent]);
      onEventAdd?.(newEvent);
    }

    handleCloseForm();
  }, [formData, isEditing, allLocalEvents, onEventAdd, onEventUpdate, handleCloseForm]);

  const handleFormChange = useCallback(
    (field: string, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  // Get days in month
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Get events for a specific date (using combined local and prop events)
  const getEventsForDate = (date: Date): SchedulerEvent[] => {
    const dateString = date.toDateString();
    return allLocalEvents.filter((event) => {
      const eventDate = new Date(event.startDate).toDateString();
      return eventDate === dateString;
    });
  };

  // Get week days
  const getWeekDays = (): Date[] => {
    const days: Date[] = [];
    const curr = new Date(currentDisplayDate);
    const first = curr.getDate() - curr.getDay();
    for (let i = 0; i < 7; i++) {
      const day = new Date(curr.setDate(first + i));
      days.push(new Date(day));
    }
    return days;
  };

  // Generate calendar days for month view
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDisplayDate);
    const firstDay = getFirstDayOfMonth(currentDisplayDate);
    const days: (Date | null)[] = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentDisplayDate.getFullYear(), currentDisplayDate.getMonth(), i)
      );
    }

    return days;
  }, [currentDisplayDate]);

  const weekDays = useMemo(() => getWeekDays(), [currentDisplayDate]);

  const rootClasses = [
    'rds-comp-scheduler',
    `rds-comp-scheduler--${size}`,
    `rds-comp-scheduler--${view}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const monthName = currentDisplayDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={rootClasses} data-testid="rds-comp-scheduler">
      {/* Header with navigation */}
      {showControls && (
        <div className="rds-comp-scheduler__header">
          <div className="rds-comp-scheduler__header-title">
            <Typography variant="h6" className="rds-comp-scheduler__title">
              {monthName}
            </Typography>
          </div>

          <div className="rds-comp-scheduler__header-controls">
            <IconButton
              size="small"
              onClick={handlePrevious}
              className="rds-comp-scheduler__nav-btn"
              aria-label="Previous"
            >
              <ChevronLeftIcon />
            </IconButton>

            <Button size="small" onClick={handleToday} className="rds-comp-scheduler__today-btn">
              Today
            </Button>

            <IconButton
              size="small"
              onClick={handleNext}
              className="rds-comp-scheduler__nav-btn"
              aria-label="Next"
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      )}

      {/* Calendar Grid for Month View */}
      {view === 'month' && (
        <div className="rds-comp-scheduler__month">
          {/* Day headers */}
          <div className="rds-comp-scheduler__week-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="rds-comp-scheduler__day-header">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="rds-comp-scheduler__days-grid">
            {calendarDays.map((day, idx) => {
              const isToday =
                day && day.toDateString() === new Date().toDateString();
              const dayEvents = day ? getEventsForDate(day) : [];

              return (
                <div
                  key={idx}
                  className={[
                    'rds-comp-scheduler__day-cell',
                    !day && 'rds-comp-scheduler__day-cell--empty',
                    isToday && 'rds-comp-scheduler__day-cell--today',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  data-testid={`day-cell-${day?.getDate() || 'empty'}`}
                  onClick={() => day && handleOpenFormWithDate(day)}
                  style={{ cursor: day ? 'pointer' : 'default' }}
                >
                  {day && (
                    <>
                      <div className="rds-comp-scheduler__day-number">{day.getDate()}</div>
                      <div className="rds-comp-scheduler__day-events">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={[
                              'rds-comp-scheduler__event',
                              `rds-comp-scheduler__event--${getColorForResource(event.resource)}`,
                              selectedEvent?.id === event.id &&
                                'rds-comp-scheduler__event--selected',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              onEventClick?.(event);
                              handleOpenForm(event);
                            }}
                            data-testid={`event-${event.id}`}
                            role="button"
                            tabIndex={0}
                          >
                            <span className="rds-comp-scheduler__event-badge" />
                            <div className="rds-comp-scheduler__event-title">
                              {event.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'week' && (
        <div className="rds-comp-scheduler__week">
          <div className="rds-comp-scheduler__week-header">
            {weekDays.map((day, idx) => (
              <div key={idx} className="rds-comp-scheduler__week-day-header">
                <div className="rds-comp-scheduler__week-day-name">
                  {day.toLocaleString('default', { weekday: 'short' })}
                </div>
                <div className="rds-comp-scheduler__week-day-date">{day.getDate()}</div>
              </div>
            ))}
          </div>
          <div className="rds-comp-scheduler__week-body">
            {weekDays.map((day, dayIdx) => {
              const dayEvents = getEventsForDate(day);
              return (
                <div 
                  key={dayIdx} 
                  className="rds-comp-scheduler__week-column"
                  onClick={() => handleOpenFormWithDate(day)}
                  style={{ cursor: 'pointer' }}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={[
                        'rds-comp-scheduler__event',
                        `rds-comp-scheduler__event--${getColorForResource(event.resource)}`,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                        onEventClick?.(event);
                        handleOpenForm(event);
                      }}
                      data-testid={`event-${event.id}`}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="rds-comp-scheduler__event-badge" />
                      <div className="rds-comp-scheduler__event-title">
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="rds-comp-scheduler__event-description">
                          {event.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === 'day' && (
        <div className="rds-comp-scheduler__day">
          <div className="rds-comp-scheduler__day-date">
            {currentDisplayDate.toLocaleString('default', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="rds-comp-scheduler__day-body">
            {getEventsForDate(currentDisplayDate).map((event) => (
              <div
                key={event.id}
                className={[
                  'rds-comp-scheduler__event',
                  `rds-comp-scheduler__event--${getColorForResource(event.resource)}`,
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => {
                  setSelectedEvent(event);
                  onEventClick?.(event);
                  handleOpenForm(event);
                }}
                data-testid={`event-${event.id}`}
                role="button"
                tabIndex={0}
              >
                <span className="rds-comp-scheduler__event-badge" />
                <div className="rds-comp-scheduler__event-title">
                  {event.title}
                </div>
                {event.description && (
                  <div className="rds-comp-scheduler__event-description">
                    {event.description}
                  </div>
                )}
                <div className="rds-comp-scheduler__event-time">
                  {new Date(event.startDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {new Date(event.endDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                {onEventDelete && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventDelete(event.id);
                    }}
                    className="rds-comp-scheduler__event-delete"
                    aria-label="Delete event"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </div>
            ))}
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => handleOpenFormWithDate(currentDisplayDate)}
              startIcon={<AddIcon />}
              style={{ width: '100%', marginTop: '8px' }}
            >
              Add Event for {currentDisplayDate.toDateString()}
            </Button>
          </div>
        </div>
      )}

      {/* Event details and dialog form */}

      {/* Add Event Instructions */}
      {showControls && (
        <div className="rds-comp-scheduler__add-hint">
          Click on any date to create an event
        </div>
      )}

      {/* Event Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
        className="rds-comp-scheduler__dialog"
      >
        <DialogTitle className="rds-comp-scheduler__dialog-title">
          {isEditing ? 'Edit Event' : 'Create Event'}
          <IconButton
            onClick={handleCloseForm}
            style={{ position: 'absolute', right: 8, top: 8 }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="rds-comp-scheduler__dialog-content">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Title */}
            <TextField
              label="Event Title"
              fullWidth
              value={formData.title || ''}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="Enter event title"
              required
            />

            {/* Description */}
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Enter event description"
            />

            {/* All Day Toggle */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.allDay || false}
                  onChange={(e) => handleFormChange('allDay', e.target.checked)}
                />
              }
              label="All Day Event"
            />

            {/* Start Date */}
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={formData.startDate || ''}
              onChange={(e) => handleFormChange('startDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* End Date */}
            <TextField
              label="End Date"
              type="date"
              fullWidth
              value={formData.endDate || ''}
              onChange={(e) => handleFormChange('endDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* Start Time */}
            {!formData.allDay && (
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                value={formData.startTime || '09:00'}
                onChange={(e) => handleFormChange('startTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            )}

            {/* End Time */}
            {!formData.allDay && (
              <TextField
                label="End Time"
                type="time"
                fullWidth
                value={formData.endTime || '10:00'}
                onChange={(e) => handleFormChange('endTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            )}

            {/* Resource Selector */}
            <FormControl fullWidth>
              <InputLabel>Resource</InputLabel>
              <Select
                value={formData.resource || ''}
                label="Resource"
                onChange={(e) => handleFormChange('resource', e.target.value)}
                renderValue={(selected) => {
                  const option = RESOURCE_OPTIONS.find(opt => opt.value === selected);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '2px',
                          backgroundColor: selected ? RESOURCE_COLOR_VALUES[selected] : 'transparent',
                          border: selected ? 'none' : '2px dashed #ccc',
                        }}
                      />
                      <span>{option?.label || 'No resource'}</span>
                    </Box>
                  );
                }}
              >
                {RESOURCE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '2px',
                          backgroundColor: option.value ? RESOURCE_COLOR_VALUES[option.value] : 'transparent',
                          border: option.value ? 'none' : '2px dashed #ccc',
                          flexShrink: 0,
                        }}
                      />
                      <span>{option.label}</span>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Event Summary */}
            {formData.startDate && (
              <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Scheduled Time
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  <strong>Start:</strong> {new Date(`${formData.startDate}${formData.allDay ? '' : `T${formData.startTime}`}`).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>End:</strong> {new Date(`${formData.endDate}${formData.allDay ? '' : `T${formData.endTime}`}`).toLocaleString()}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions className="rds-comp-scheduler__dialog-actions">
          <Button onClick={handleCloseForm} color="inherit">
            Cancel
          </Button>
          {isEditing && onEventDelete && (
            <Button
              onClick={() => {
                handleEventDelete(formData.id as string | number);
              }}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          )}
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
          >
            {isEditing ? 'Update Event' : 'Create Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RdsCompScheduler.displayName = 'RdsCompScheduler';
export default RdsCompScheduler;
