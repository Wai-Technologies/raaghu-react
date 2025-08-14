import React, { useEffect, useState } from 'react';
import './rds-comp-time-picker.scss';
import { RdsIconButton, RdsAutocomplete } from '../../raaghu-elements/index';

export interface RdsTimePickerProps {
  style?: 'default' | 'compact';
  colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
  state?: 'default' | 'expanded' | 'selected';
  onChange?: (time: string) => void;
  value?: string;
  disabled?: boolean;
}

const RdsCompTimePicker = (props: RdsTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [time, setTime] = useState("");
  
  // Separate state for compact mode
  const [tempHour, setTempHour] = useState<number>(12);
  const [tempMinute, setTempMinute] = useState<number>(0);
  const [tempPeriod, setTempPeriod] = useState<string>('AM');

  const togglePicker = () => {
    // When opening the picker, initialize temp values for compact mode
    if (!showPicker) {
      console.log("Opening picker, current time:", time, "hours:", hours, "minutes:", minutes, "period:", period);
      
      // Initialize the temp values for compact mode
      if (props.style === 'compact') {
        if (!time) {
          // If no time is set, initialize with defaults
          console.log("Initializing compact mode with default values");
          setTempHour(12);
          setTempMinute(0);
          setTempPeriod('AM');
        } else {
          // Initialize with the current time values
          console.log("Initializing compact mode with current values:", hours, minutes, period);
          setTempHour(hours);
          setTempMinute(minutes);
          setTempPeriod(period);
        }
      }
    }
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    console.log('Value or state prop changed:', 
      'value:', props.value, 
      'state:', props.state,
      'style:', props.style
    );
    
    // Handle controlled component with value prop
    if (props.value !== undefined) {
      console.log('Setting time from value prop:', props.value);
      setTime(props.value);
      
      // If there's a valid time value, try to parse and set hours, minutes, period
      if (props.value) {
        const timeParts = props.value.split(' ');
        console.log('Time parts from value prop:', timeParts);
        
        if (timeParts.length === 2) {
          const [timeStr, ampm] = timeParts;
          const [hourStr, minuteStr] = timeStr.split(':');
          console.log('Parsed parts:', 'hour:', hourStr, 'minute:', minuteStr, 'period:', ampm);
          
          if (hourStr && minuteStr && ampm) {
            const hourVal = parseInt(hourStr, 10);
            const adjHourVal = hourVal === 0 ? 12 : hourVal;
            const minVal = parseInt(minuteStr, 10);
            
            console.log('Parsed time values:', 
              'hours:', adjHourVal, 
              'minutes:', minVal, 
              'period:', ampm
            );
            
            // Set both the main state and temp state
            setHours(adjHourVal);
            setMinutes(minVal);
            setPeriod(ampm);
            
            setTempHour(adjHourVal);
            setTempMinute(minVal);
            setTempPeriod(ampm);
          }
        }
      }
    } else if (props.state === 'expanded') {
      setShowPicker(true);
      setTime('');
    } else if (props.state === 'selected') {
      setShowPicker(false);
      setTime('12:00 AM');
    } else {
      setShowPicker(false);
      setTime('');
    }
  }, [props.state, props.value]);
  
  // Update display in real-time as temp values change in compact mode
  useEffect(() => {
    if (props.style === 'compact' && showPicker) {
      console.log("Temp values changed in compact mode:", 
        "hour:", tempHour, 
        "minute:", tempMinute, 
        "period:", tempPeriod
      );
      
      // Force a component update with the selected time values
      // This is just for UI display, not for onChange
      const formattedTempTime = `${String(tempHour).padStart(2, '0')}:${String(tempMinute).padStart(2, '0')} ${tempPeriod}`;
      console.log("Updated preview time:", formattedTempTime);
    }
  }, [tempHour, tempMinute, tempPeriod, props.style, showPicker]);

  const handleSetTime = (e) => {
    // Prevent any default behaviors and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('Debug state before Set Time:',
      'tempHour:', tempHour,
      'tempMinute:', tempMinute,
      'tempPeriod:', tempPeriod,
      'hours:', hours,
      'minutes:', minutes,
      'period:', period,
      'time:', time,
      'props.value:', props.value
    );
    
    // Get the direct DOM values as a backup check
    try {
      const hourSelect = document.getElementById('hours-select');
      const minuteSelect = document.getElementById('minutes-select');
      const periodSelect = document.getElementById('period-select');
      
      if (hourSelect && minuteSelect && periodSelect) {
        console.log('DOM select values:', {
          hour: (hourSelect as HTMLSelectElement).value,
          minute: (minuteSelect as HTMLSelectElement).value,
          period: (periodSelect as HTMLSelectElement).value
        });
      }
    } catch (err) {
      console.log('Error checking DOM values:', err);
    }
    
    // Get a snapshot of the values before using them
    // This ensures we're getting the most up-to-date values
    const currentTempHour = tempHour;
    const currentTempMinute = tempMinute;
    const currentTempPeriod = tempPeriod;
    
    const currentHours = hours;
    const currentMinutes = minutes;
    const currentPeriod = period;
    
    if (props.style === 'compact') {
      // In compact mode, use the temp values to update the state
      console.log('Set Time clicked in compact mode:', 
        'tempHour:', currentTempHour, 
        'tempMinute:', currentTempMinute, 
        'tempPeriod:', currentTempPeriod
      );
      
      // Update the main state with temp values
      setHours(currentTempHour);
      setMinutes(currentTempMinute);
      setPeriod(currentTempPeriod);
      
      const formattedTime = `${String(currentTempHour).padStart(2, '0')}:${String(currentTempMinute).padStart(2, '0')} ${currentTempPeriod}`;
      console.log('Setting formatted time:', formattedTime);
      
      // First update the internal time state
      setTime(formattedTime);
      
      // Then notify parent of change
      if (props.onChange) {
        console.log("onChange about to be called with:", formattedTime);
        props.onChange(formattedTime);
        console.log("onChange triggered with:", formattedTime);
      }
      
      // Finally close the picker
      setShowPicker(false);
    } else {
      // In default mode, use the current hours, minutes and period
      console.log('Set Time clicked in default mode:', 
        'hours:', currentHours, 
        'minutes:', currentMinutes, 
        'period:', currentPeriod
      );
      
      const formattedTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')} ${currentPeriod}`;
      console.log('Setting formatted time:', formattedTime);
      
      // First update the internal time state
      setTime(formattedTime);
      
      // Then notify parent of change
      if (props.onChange) {
        console.log("onChange about to be called with:", formattedTime);
        props.onChange(formattedTime);
        console.log("onChange triggered with:", formattedTime);
      }
      
      // Finally close the picker
      setShowPicker(false);
    }
    
    return false; // Prevent any form submission
  };

  const handleCancel = () => {
    setTime('');
    // Reset both sets of state values
    setHours(12);
    setMinutes(0);
    setPeriod('AM');
    
    setTempHour(12);
    setTempMinute(0);
    setTempPeriod('AM');
    
    if (props.onChange) {
      props.onChange('');
    }
    setShowPicker(false);
  };

  // Removed time changing functions for default mode

  const setCurrentTime = () => {
    const now = new Date();
    let currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentPeriod = currentHours >= 12 ? 'PM' : 'AM';

    if (currentHours > 12) {
      currentHours -= 12;
    } else if (currentHours === 0) {
      currentHours = 12;
    }

    // In compact mode, update the temp state values
    if (props.style === 'compact') {
      setTempHour(currentHours);
      setTempMinute(currentMinutes);
      setTempPeriod(currentPeriod);
    } else {
      // In default mode, update the main state values directly
      setHours(currentHours);
      setMinutes(currentMinutes);
      setPeriod(currentPeriod);
      
      // Also update the displayed time immediately for default mode
      const formattedTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')} ${currentPeriod}`;
      setTime(formattedTime);
      
      // Notify parent of change
      if (props.onChange) {
        props.onChange(formattedTime);
      }
    }
  };

  const getButtonClasses = () => {
    const variant = props.colorVariant || 'primary';
    if (variant === 'light') {
      return {
        setTime: 'set-time bg-light text-dark',
        cancel: 'cancel border-none text-dark'
      };
    }
    return {
      setTime: `set-time bg-${variant} text-white`,
      cancel: `cancel border-none text-${variant}`
    };
  };

  const getInputBorderClass = () => {
    const variant = props.colorVariant || 'primary';
    return variant === 'light' ? 'border-dark' : `border-${variant}`;
  };

  const getIconColor = (): "primary" | "default" | "inherit" | "secondary" | "error" | "info" | "success" | "warning" => {
    // Map colorVariant prop to allowed MUI IconButton color values
    const allowedColors = [
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning"
    ] as const;
    
    const variant = props.colorVariant || 'primary';
    
    // Special handling for light and dark variants
    if (variant === 'light' || variant === 'dark') {
      return 'default';
    }
    
    if (allowedColors.includes(variant as any)) {
      return variant as typeof allowedColors[number];
    }
    
    // fallback to 'primary' if not allowed
    return "primary";
  };

  const getTextColor = () => {
    const variant = props.colorVariant || 'primary';
    return variant === 'light' ? 'dark' : variant;
  };

  return (
    <div className="time-picker-container">
      <div 
        className={`time-input-container ${props.disabled ? 'disabled' : ''}`} 
        onClick={!props.disabled ? togglePicker : undefined}
      >
        <input
          type="text"
          className={`time-input ${getInputBorderClass()}`}
          value={props.value !== undefined ? props.value : time}
          readOnly
          disabled={props.disabled}
          placeholder="12:00 AM"
        />
        <span className="time-icon">
          <RdsIconButton
            name="clock"
            color={getIconColor()}
            disabled={props.disabled}
          />
        </span>
      </div>

      {showPicker && (
        <div className={`time-picker ${props.style === 'compact' ? "time-picker-compact" : "time-picker"} ${getInputBorderClass()}`}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={`time-display ${props.style === 'compact' ? "time-display-compact" : "time-display"}`}>
              {props.style === 'compact' 
                ? ((tempHour !== null && tempMinute !== null && tempPeriod)
                  ? `${String(tempHour).padStart(2, '0')}:${String(tempMinute).padStart(2, '0')} ${tempPeriod}` 
                  : (time ? time : '12:00 AM'))
                : (time ? time : '12:00 AM')}
            </div>
            <div className="now-button" onClick={setCurrentTime}>
              NOW
            </div>
          </div>
          
          <div className="time-values-container">
            {props.style === 'compact' ? (
              <div className="time-controls-row">
                {/* Use standard HTML select elements instead of RdsAutocomplete to test */}
                <div className="time-select-container">
                  <select 
                    id="hours-select"
                    className="time-select" 
                    value={tempHour.toString()} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      console.log("Hour selected:", val);
                      setTempHour(val);
                    }}
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = i + 1;
                      return (
                        <option key={hour} value={hour.toString()}>
                          {String(hour).padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                </div>
                
                <div className="time-select-container">
                  <select 
                    id="minutes-select"
                    className="time-select" 
                    value={tempMinute.toString()} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      console.log("Minute selected:", val);
                      setTempMinute(val);
                    }}
                  >
                    {Array.from({ length: 60 }, (_, i) => (
                      <option key={i} value={i.toString()}>
                        {String(i).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="time-select-container">
                  <select 
                    id="period-select"
                    className="time-select" 
                    value={tempPeriod} 
                    onChange={(e) => {
                      console.log("Period selected:", e.target.value);
                      setTempPeriod(e.target.value);
                    }}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="time-values-display-row">
                <div className="time-value-display">
                  {String(hours).padStart(2, '0')}
                </div>
                <div className="time-value-colon">:</div>
                <div className="time-value-display">
                  {String(minutes).padStart(2, '0')}
                </div>
                <div className="time-value-period">{period}</div>
              </div>
            )}
          </div>
          
          <div className={`buttons ${props.style === "compact" ? "buttons-compact" : "buttons"}`}>
            <button type="button" className={getButtonClasses().cancel} onClick={handleCancel}>Cancel</button>
            <button 
              type="button" 
              className={getButtonClasses().setTime} 
              onClick={handleSetTime}
              style={{ cursor: 'pointer' }}
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RdsCompTimePicker;