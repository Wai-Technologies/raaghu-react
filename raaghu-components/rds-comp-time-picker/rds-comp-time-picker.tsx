import React, { useEffect, useState } from 'react';
import './rds-comp-time-picker.scss';
import './mui-override.scss';
import { RdsIconButton, RdsAutocomplete } from '../../raaghu-elements/index';
import { Box } from '@mui/material';

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

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    // Handle controlled component with value prop
    if (props.value !== undefined) {
      setTime(props.value);
      
      // If there's a valid time value, try to parse and set hours, minutes, period
      if (props.value) {
        const timeParts = props.value.split(' ');
        if (timeParts.length === 2) {
          const [timeStr, ampm] = timeParts;
          const [hourStr, minuteStr] = timeStr.split(':');
          
          if (hourStr && minuteStr && ampm) {
            const hourVal = parseInt(hourStr, 10);
            setHours(hourVal === 0 ? 12 : hourVal);
            setMinutes(parseInt(minuteStr, 10));
            setPeriod(ampm);
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

  const handleSetTime = () => {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    setTime(formattedTime);
    if (props.onChange) {
      props.onChange(formattedTime);
    }
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTime('');
    if (props.onChange) {
      props.onChange('');
    }
    setShowPicker(false);
  };

  const incrementHours = () => {
    setHours((prevHours) => (prevHours % 12) + 1);
  };

  const decrementHours = () => {
    setHours((prevHours) => (prevHours === 1 ? 12 : prevHours - 1));
  };

  const incrementMinutes = () => {
    setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
  };

  const decrementMinutes = () => {
    setMinutes((prevMinutes) => (prevMinutes === 0 ? 59 : prevMinutes - 1));
  };

  const togglePeriod = () => {
    setPeriod((prevPeriod) => (prevPeriod === 'AM' ? 'PM' : 'AM'));
  };

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

    setHours(currentHours);
    setMinutes(currentMinutes);
    setPeriod(currentPeriod);
    const formattedTime = `${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')} ${currentPeriod}`;
    setTime(formattedTime);
    
    if (props.onChange) {
      props.onChange(formattedTime);
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
          value={time}
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
              {time ? time : '12:00 AM'}
            </div>
            <div className="now-button" onClick={setCurrentTime}>
              NOW
            </div>
          </div>
          
          <div className="time-values-container">
            {props.style === 'compact' ? (
              <div className="time-controls-row">
                <RdsAutocomplete
                  id="hours-select"
                  label=""
                  placeholder="12"
                  options={Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 1;
                    return {
                      label: String(hour).padStart(2, '0'),
                      value: hour.toString()
                    };
                  })}
                  onChange={(_, selected) => selected && setHours(parseInt(selected.value))}
                  value={hours ? { label: String(hours).padStart(2, '0'), value: hours.toString() } : null}
                  selectSize="small"
                  className="time-select-dropdown"
                />
                <RdsAutocomplete
                  id="minutes-select"
                  label=""
                  placeholder="00"
                  options={Array.from({ length: 60 }, (_, i) => ({
                    label: String(i).padStart(2, '0'),
                    value: i.toString()
                  }))}
                  onChange={(_, selected) => selected && setMinutes(parseInt(selected.value))}
                  value={minutes !== null ? { label: String(minutes).padStart(2, '0'), value: minutes.toString() } : null}
                  selectSize="small"
                  className="time-select-dropdown"
                />
                <RdsAutocomplete
                  id="period-select"
                  label=""
                  placeholder="AM"
                  options={[
                    { label: 'AM', value: 'AM' },
                    { label: 'PM', value: 'PM' }
                  ]}
                  onChange={(_, selected) => selected && setPeriod(selected.value)}
                  value={period ? { label: period, value: period } : null}
                  selectSize="small"
                  className="time-select-dropdown"
                />
              </div>
            ) : (
              <div className="time-values-display-row">
                <div className="time-value-display">
                  <span className="time-control up" onClick={incrementHours}>▲</span>
                  {String(hours).padStart(2, '0')}
                  <span className="time-control down" onClick={decrementHours}>▼</span>
                </div>
                <div className="time-value-colon">:</div>
                <div className="time-value-display">
                  <span className="time-control up" onClick={incrementMinutes}>▲</span>
                  {String(minutes).padStart(2, '0')}
                  <span className="time-control down" onClick={decrementMinutes}>▼</span>
                </div>
                <div className="time-value-period" onClick={togglePeriod}>{period}</div>
              </div>
            )}
          </div>
          
          <div className={`buttons ${props.style == "compact" ? "buttons-compact" : "buttons"}`}>
            <button className={getButtonClasses().cancel} onClick={handleCancel}>Cancel</button>
            <button className={getButtonClasses().setTime} onClick={handleSetTime}>Set Time</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RdsCompTimePicker;