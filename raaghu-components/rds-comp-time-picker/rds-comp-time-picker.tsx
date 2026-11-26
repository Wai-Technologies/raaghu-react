import React, { useEffect, useRef, useState } from 'react';
import './rds-comp-time-picker.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import { useForkRef } from '@mui/material/utils';
import { joinClassNames, type RdsStylingPropsWithoutStyle } from '../../raaghu-elements/shared/utils/styling-props';
import { CompactTimePicker, DefaultTimePicker } from './time-picker-modes';
import { 
  getButtonClasses, 
  getInputBorderClass, 
  parseTimeFromValue,
  getCurrentTime, 
  formatTime 
} from './time-picker-utils';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

export interface RdsTimePickerProps extends RdsStylingPropsWithoutStyle {
  style?: 'default' | 'compact';
  /** Accent colour of the time picker. */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /** @deprecated Use `color` instead (`info` maps to `primary`). */
  colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  state?: 'default' | 'expanded' | 'selected';
  onChange?: (time: string) => void;
  value?: string;
  disabled?: boolean;
}

const RdsCompTimePicker = React.forwardRef<HTMLDivElement, RdsTimePickerProps>(function RdsCompTimePicker(props, ref) {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [time, setTime] = useState("");
  
  const [tempHour, setTempHour] = useState<number>(12);
  const [tempMinute, setTempMinute] = useState<number>(0);
  const [tempPeriod, setTempPeriod] = useState<string>('AM');
  const containerRef = useRef<HTMLDivElement>(null);
  const handleContainerRef = useForkRef(containerRef, ref);

  const resetTime = () => {
    setHours(12);
    setMinutes(0);
    setPeriod('AM');
    setTempHour(12);
    setTempMinute(0);
    setTempPeriod('AM');
  };

  const togglePicker = () => {
    if (!showPicker && props.style === 'compact') {
      if (!time) {
        setTempHour(12);
        setTempMinute(0);
        setTempPeriod('AM');
      } else {
        setTempHour(hours);
        setTempMinute(minutes);
        setTempPeriod(period);
      }
    }
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    if (props.value !== undefined) {
      setTime(props.value);
      
      if (props.value) {
        const { hours: parsedHours, minutes: parsedMinutes, period: parsedPeriod } = parseTimeFromValue(props.value);
        
        setHours(parsedHours);
        setMinutes(parsedMinutes);
        setPeriod(parsedPeriod);
        
        setTempHour(parsedHours);
        setTempMinute(parsedMinutes);
        setTempPeriod(parsedPeriod);
      } else {
        resetTime();
      }
    } else if (props.state === 'expanded') {
      setShowPicker(true);
      setTime('');
    } else if (props.state === 'selected') {
      setShowPicker(false);
      resetTime();
      setTime('12:00 AM');
    } else {
      setShowPicker(false);
      setTime('');
    }
  }, [props.state, props.value]);

  useEffect(() => {
    if (!showPicker) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setShowPicker(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowPicker(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPicker]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || (e.key === 'ArrowDown' && !showPicker)) {
      e.preventDefault();
      togglePicker();
    }
  };

  const handleNowKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setCurrentTime();
    }
  };

  const handleSetTime = (e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (props.style === 'compact') {
      setHours(tempHour);
      setMinutes(tempMinute);
      setPeriod(tempPeriod);
      
      const formattedTime = formatTime(tempHour, tempMinute, tempPeriod);
      setTime(formattedTime);
      
      if (props.onChange) {
        props.onChange(formattedTime);
      }
    } else {
      const formattedTime = formatTime(hours, minutes, period);
      setTime(formattedTime);
      
      if (props.onChange) {
        props.onChange(formattedTime);
      }
    }
    
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTime('');
    resetTime();

    if (props.onChange) {
      props.onChange('');
    }
    setShowPicker(false);
  };

  const setCurrentTime = () => {
    const { hours: currentHours, minutes: currentMinutes, period: currentPeriod } = getCurrentTime();

    if (props.style === 'compact') {
      setTempHour(currentHours);
      setTempMinute(currentMinutes);
      setTempPeriod(currentPeriod);
    } else {
      setHours(currentHours);
      setMinutes(currentMinutes);
      setPeriod(currentPeriod);
      
      const formattedTime = formatTime(currentHours, currentMinutes, currentPeriod);
      setTime(formattedTime);
      
      if (props.onChange) {
        props.onChange(formattedTime);
      }
    }
  };

  if (props.colorVariant !== undefined) {
    warnDeprecatedProp('RdsCompTimePicker', 'colorVariant', '`color`');
  }
  const legacyColor = props.colorVariant === 'info' ? 'primary' : props.colorVariant;
  const color = props.color ?? legacyColor ?? 'primary';
  const variantClass = `time-picker-variant-${color}`;

  return (
    <Box ref={handleContainerRef} className={joinClassNames(`time-picker-container ${variantClass}`, props.className)} sx={props.sx}>
      <div
        className={`time-input-container ${props.disabled ? 'disabled' : ''}`}
        onClick={!props.disabled ? togglePicker : undefined}
      >
        <input
          type="text"
          className={`time-input ${getInputBorderClass(color)}`}
          value={props.value !== undefined ? props.value : time}
          readOnly
          disabled={props.disabled}
          placeholder="12:00 AM"
          aria-label="Select time"
          onKeyDown={handleInputKeyDown}
        />
        <span className="time-icon">
          <AccessTimeIcon fontSize="small" />
        </span>
      </div>

      {showPicker && (
        <div role="dialog" aria-label="Time picker" className={`time-picker ${props.style === 'compact' ? "time-picker-compact" : "time-picker"} ${getInputBorderClass(color)}`}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={`time-display ${props.style === 'compact' ? "time-display-compact" : "time-display"}`}>
              {props.style === 'compact' 
                ? ((tempHour !== null && tempMinute !== null && tempPeriod)
                  ? formatTime(tempHour, tempMinute, tempPeriod)
                  : (time || '12:00 AM'))
                : (time || '12:00 AM')}
            </div>
            <div className="now-button" role="button" tabIndex={0} onClick={setCurrentTime} onKeyDown={handleNowKeyDown}>
              NOW
            </div>
          </div>
          <div className="time-divider" role="separator" aria-hidden="true" />
          
          <div className="time-values-container">
            {props.style === 'compact' 
              ? <CompactTimePicker
                  tempHour={tempHour}
                  setTempHour={setTempHour}
                  tempMinute={tempMinute}
                  setTempMinute={setTempMinute}
                  tempPeriod={tempPeriod}
                  setTempPeriod={setTempPeriod}
                />
              : <DefaultTimePicker
                  hours={hours}
                  minutes={minutes}
                  period={period}
                  onIncrementHour={() => setHours((prev) => (prev % 12) + 1)}
                  onDecrementHour={() => setHours((prev) => (prev - 1 <= 0 ? 12 : prev - 1))}
                  onIncrementMinute={() => setMinutes((prev) => (prev + 1) % 60)}
                  onDecrementMinute={() => setMinutes((prev) => (prev - 1 < 0 ? 59 : prev - 1))}
                  onTogglePeriod={() => setPeriod((p) => (p === 'AM' ? 'PM' : 'AM'))}
                />
            }
          </div>
          <div className="time-divider" role="separator" aria-hidden="true" />
          
          <div className={`buttons ${props.style === "compact" ? "buttons-compact" : "buttons"}`}>
            <button type="button" className={getButtonClasses(color).cancel} onClick={handleCancel}>Cancel</button>
            <button
              type="button"
              className={getButtonClasses(color).setTime}
              onClick={handleSetTime}
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </Box>
  );
});
RdsCompTimePicker.displayName = "RdsCompTimePicker";
export default RdsCompTimePicker;