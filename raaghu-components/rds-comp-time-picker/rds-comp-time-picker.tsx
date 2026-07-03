import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import './rds-comp-time-picker.scss';
export { type RdsTimePickerProps } from './time-picker-types';
import { type RdsTimePickerProps } from './time-picker-types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CompactTimePicker, DefaultTimePicker } from './time-picker-modes';
import { 
  getButtonClasses, 
  getInputBorderClass, 
  parseTimeFromValue,
  getCurrentTime, 
  formatTime 
} from './time-picker-utils';

const RdsCompTimePicker = (props: RdsTimePickerProps) => {
  const { style: pickerStyle, onChange: onChangeProp, colorVariant, disabled, value: valueProp, state: stateProp } = props;
  const [pickerState, setPickerState] = useState(() => {
    const initial = {
      showPicker: false,
      hours: 12,
      minutes: 0,
      period: 'AM',
      time: '',
      tempHour: 12,
      tempMinute: 0,
      tempPeriod: 'AM',
    } as const;

    if (valueProp !== undefined) {
      const base = { ...initial, time: valueProp } as any;
      if (valueProp) {
        const { hours: parsedHours, minutes: parsedMinutes, period: parsedPeriod } = parseTimeFromValue(valueProp);
        base.hours = parsedHours;
        base.minutes = parsedMinutes;
        base.period = parsedPeriod;
        base.tempHour = parsedHours;
        base.tempMinute = parsedMinutes;
        base.tempPeriod = parsedPeriod;
      }
      return base as any;
    }

    if (stateProp === 'expanded') return { ...initial, showPicker: true } as any;
    if (stateProp === 'selected') return { ...initial, time: '12:00 AM' } as any;
    return initial as any;
  });
  const { showPicker, hours, minutes, period, time, tempHour, tempMinute, tempPeriod } = pickerState;
  const updatePickerState = useCallback((updates: Partial<typeof pickerState> | ((prev: typeof pickerState) => Partial<typeof pickerState>)) => {
    setPickerState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  }, []);

  const prevValuePropRef = useRef(valueProp);
  const prevStatePropRef = useRef(stateProp);

  if (valueProp !== prevValuePropRef.current || stateProp !== prevStatePropRef.current) {
    prevValuePropRef.current = valueProp;
    prevStatePropRef.current = stateProp;

    if (valueProp !== undefined) {
      updatePickerState({ time: valueProp });

      if (valueProp) {
        const { hours: parsedHours, minutes: parsedMinutes, period: parsedPeriod } = parseTimeFromValue(valueProp);
        updatePickerState({
          hours: parsedHours,
          minutes: parsedMinutes,
          period: parsedPeriod,
          tempHour: parsedHours,
          tempMinute: parsedMinutes,
          tempPeriod: parsedPeriod,
        });
      }
    } else if (stateProp === 'expanded') {
      updatePickerState({ showPicker: true, time: '' });
    } else if (stateProp === 'selected') {
      updatePickerState({ showPicker: false, time: '12:00 AM' });
    } else {
      updatePickerState({ showPicker: false, time: '' });
    }
  }

  const togglePicker = useCallback(() => {
    if (!showPicker && pickerStyle === 'compact') {
      if (!time) {
        updatePickerState({ tempHour: 12, tempMinute: 0, tempPeriod: 'AM' });
      } else {
        updatePickerState({ tempHour: hours, tempMinute: minutes, tempPeriod: period });
      }
    }
    updatePickerState((prev) => ({ showPicker: !prev.showPicker }));
  }, [showPicker, pickerStyle, time, hours, minutes, period, updatePickerState]);

  const handleSetTime = useCallback((e: MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (pickerStyle === 'compact') {
      const formattedTime = formatTime(tempHour, tempMinute, tempPeriod);
      updatePickerState({
        hours: tempHour,
        minutes: tempMinute,
        period: tempPeriod,
        time: formattedTime,
      });
      
      if (onChangeProp) {
        onChangeProp(formattedTime);
      }
    } else {
      const formattedTime = formatTime(hours, minutes, period);
      updatePickerState({ time: formattedTime });
      
      if (onChangeProp) {
        onChangeProp(formattedTime);
      }
    }
    
    updatePickerState({ showPicker: false });
  }, [pickerStyle, tempHour, tempMinute, tempPeriod, onChangeProp, hours, minutes, period, updatePickerState]);

  const handleCancel = useCallback(() => {
    updatePickerState({
      time: '',
      hours: 12,
      minutes: 0,
      period: 'AM',
      tempHour: 12,
      tempMinute: 0,
      tempPeriod: 'AM',
    });
    
    if (onChangeProp) {
      onChangeProp('');
    }
    updatePickerState({ showPicker: false });
  }, [onChangeProp, updatePickerState]);

  const setCurrentTime = useCallback(() => {
    const { hours: currentHours, minutes: currentMinutes, period: currentPeriod } = getCurrentTime();

    if (pickerStyle === 'compact') {
      updatePickerState({ tempHour: currentHours, tempMinute: currentMinutes, tempPeriod: currentPeriod });
    } else {
      const formattedTime = formatTime(currentHours, currentMinutes, currentPeriod);
      updatePickerState({
        hours: currentHours,
        minutes: currentMinutes,
        period: currentPeriod,
        time: formattedTime,
      });
      
      if (onChangeProp) {
        onChangeProp(formattedTime);
      }
    }
  }, [pickerStyle, onChangeProp, updatePickerState]);

  const incrementHour = useCallback(() => updatePickerState((prev) => ({ hours: (prev.hours % 12) + 1 })), [updatePickerState]);
  const decrementHour = useCallback(() => updatePickerState((prev) => ({ hours: prev.hours - 1 <= 0 ? 12 : prev.hours - 1 })), [updatePickerState]);
  const incrementMinute = useCallback(() => updatePickerState((prev) => ({ minutes: (prev.minutes + 1) % 60 })), [updatePickerState]);
  const decrementMinute = useCallback(() => updatePickerState((prev) => ({ minutes: prev.minutes - 1 < 0 ? 59 : prev.minutes - 1 })), [updatePickerState]);
  const togglePeriod = useCallback(() => updatePickerState((prev) => ({ period: prev.period === 'AM' ? 'PM' : 'AM' })), [updatePickerState]);
  const setTempHour = useCallback((hour: number) => updatePickerState({ tempHour: hour }), [updatePickerState]);
  const setTempMinute = useCallback((minute: number) => updatePickerState({ tempMinute: minute }), [updatePickerState]);
  const setTempPeriod = useCallback((p: string) => updatePickerState({ tempPeriod: p }), [updatePickerState]);

  const variantClass = `time-picker-variant-${colorVariant || 'primary'}`;
  const inputBorderClass = getInputBorderClass(colorVariant);
  const buttonClasses = getButtonClasses(colorVariant);

  return (
    <div className={`time-picker-container ${variantClass}`}>
      <div
        className={clsx("time-input-container", disabled && "disabled")}
      >
        <input
          type="text"
          className={`time-input ${inputBorderClass}`}
          value={valueProp !== undefined ? valueProp : time}
          readOnly
          disabled={disabled}
          placeholder="12:00 AM"
          aria-label="Selected time"
          onClick={!disabled ? togglePicker : undefined}
          onKeyDown={!disabled ? (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              togglePicker();
            }
          } : undefined}
        />
        <button
          type="button"
          className="time-icon"
          onClick={!disabled ? togglePicker : undefined}
          disabled={disabled}
          aria-label="Toggle time picker"
        >
          <AccessTimeIcon fontSize="small" />
        </button>
      </div>

      {showPicker && (
        <div className={clsx(
            "time-picker",
            pickerStyle === 'compact' ? "time-picker-compact" : "time-picker",
            inputBorderClass
          )}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={clsx("time-display", pickerStyle === 'compact' ? "time-display-compact" : "time-display")}>
              {pickerStyle === 'compact' 
                ? ((tempHour !== null && tempMinute !== null && tempPeriod)
                  ? formatTime(tempHour, tempMinute, tempPeriod)
                  : (time || '12:00 AM'))
                : (time || '12:00 AM')}
            </div>
            <button type="button" className="now-button" onClick={setCurrentTime}>
              NOW
            </button>
          </div>
          <hr className="time-divider" aria-hidden="true" />
          
          <div className="time-values-container">
            {pickerStyle === 'compact' 
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
                  onIncrementHour={incrementHour}
                  onDecrementHour={decrementHour}
                  onIncrementMinute={incrementMinute}
                  onDecrementMinute={decrementMinute}
                  onTogglePeriod={togglePeriod}
                />
            }
          </div>
          <hr className="time-divider" aria-hidden="true" />
          
          <div className={clsx("buttons", pickerStyle === "compact" ? "buttons-compact" : "buttons")}>
            <button type="button" className={buttonClasses.cancel} onClick={handleCancel}>Cancel</button>
            <button
              type="button"
              className={buttonClasses.setTime}
              onClick={handleSetTime}
            >
              Set Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
RdsCompTimePicker.displayName = "RdsCompTimePicker";
export default RdsCompTimePicker;