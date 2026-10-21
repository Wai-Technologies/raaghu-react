import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import clsx from 'clsx';
import './rds-comp-time-picker.scss';
export { type RdsTimePickerProps } from './time-picker-types';
import { type RdsTimePickerProps } from './time-picker-types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import { CompactTimePicker, DefaultTimePicker } from './time-picker-modes';
import {
  getButtonClasses,
  getInputBorderClass,
  parseTimeFromValue,
  getCurrentTime,
  formatTime
} from './time-picker-utils';

interface PickerState {
  showPicker: boolean;
  hours: number;
  minutes: number;
  period: string;
  time: string;
  tempHour: number;
  tempMinute: number;
  tempPeriod: string;
}

const INITIAL_STATE: PickerState = {
  showPicker: false,
  hours: 12,
  minutes: 0,
  period: 'AM',
  time: '',
  tempHour: 12,
  tempMinute: 0,
  tempPeriod: 'AM',
};

const getValueUpdates = (value: string): Partial<PickerState> => {
  if (!value) return { time: value };
  const { hours, minutes, period } = parseTimeFromValue(value);
  return { time: value, hours, minutes, period, tempHour: hours, tempMinute: minutes, tempPeriod: period };
};

const getSyncUpdates = (valueProp: string | undefined, stateProp: RdsTimePickerProps['state']): Partial<PickerState> => {
  if (valueProp !== undefined) return getValueUpdates(valueProp);
  if (stateProp === 'expanded') return { showPicker: true, time: '' };
  if (stateProp === 'selected') return { showPicker: false, time: '12:00 AM' };
  return { showPicker: false, time: '' };
};

const RdsCompTimePicker = (props: RdsTimePickerProps) => {
  const {
    style,
    variant,
    onChange: onChangeProp,
    onOpen,
    onClose,
    colorVariant,
    color,
    disabled,
    value: valueProp,
    state: stateProp,
    localeText,
  } = props;
  if (colorVariant !== undefined) warnDeprecatedProp('RdsCompTimePicker', 'colorVariant', '`color`');
  const pickerStyle = variant ?? style;
  const resolvedColor = color ?? colorVariant;
  const nowText = localeText?.now ?? 'NOW';
  const cancelText = localeText?.cancel ?? 'Cancel';
  const setTimeText = localeText?.setTime ?? 'Set Time';
  const placeholderText = localeText?.placeholder ?? '12:00 AM';

  const containerRef = useRef<HTMLDivElement>(null);
  const [pickerState, setPickerState] = useState<PickerState>(() => {
    if (valueProp !== undefined) return { ...INITIAL_STATE, ...getValueUpdates(valueProp) };
    if (stateProp === 'expanded') return { ...INITIAL_STATE, showPicker: true };
    if (stateProp === 'selected') return { ...INITIAL_STATE, time: '12:00 AM' };
    return INITIAL_STATE;
  });
  const { showPicker, hours, minutes, period, time, tempHour, tempMinute, tempPeriod } = pickerState;
  const updatePickerState = useCallback((updates: Partial<PickerState> | ((prev: PickerState) => Partial<PickerState>)) => {
    setPickerState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  }, []);

  const [prevValueProp, setPrevValueProp] = useState(valueProp);
  const [prevStateProp, setPrevStateProp] = useState(stateProp);

  if (valueProp !== prevValueProp || stateProp !== prevStateProp) {
    setPrevValueProp(valueProp);
    setPrevStateProp(stateProp);
    setPickerState({ ...pickerState, ...getSyncUpdates(valueProp, stateProp) });
  }

  const setOpen = useCallback((next: boolean) => {
    updatePickerState({ showPicker: next });
    if (next !== showPicker) {
      if (next) onOpen?.();
      else onClose?.();
    }
  }, [showPicker, onOpen, onClose, updatePickerState]);

  const togglePicker = useCallback(() => {
    if (!showPicker && pickerStyle === 'compact') {
      if (!time) {
        updatePickerState({ tempHour: 12, tempMinute: 0, tempPeriod: 'AM' });
      } else {
        updatePickerState({ tempHour: hours, tempMinute: minutes, tempPeriod: period });
      }
    }
    setOpen(!showPicker);
  }, [showPicker, pickerStyle, time, hours, minutes, period, updatePickerState, setOpen]);

  const handleSetTime = useCallback((e?: ReactMouseEvent) => {
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

    setOpen(false);
  }, [pickerStyle, tempHour, tempMinute, tempPeriod, onChangeProp, hours, minutes, period, updatePickerState, setOpen]);

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
    setOpen(false);
  }, [onChangeProp, updatePickerState, setOpen]);

  // Escape / outside click close the popup without touching the value.
  useEffect(() => {
    if (!showPicker) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [showPicker, setOpen]);

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

  const variantClass = `time-picker-variant-${resolvedColor || 'primary'}`;
  const inputBorderClass = getInputBorderClass(resolvedColor);
  const buttonClasses = getButtonClasses(resolvedColor);

  return (
    <div ref={containerRef} className={`time-picker-container ${variantClass}`}>
      <div
        className={clsx("time-input-container", disabled && "disabled")}
      >
        <input
          type="text"
          className={`time-input ${inputBorderClass}`}
          value={valueProp !== undefined ? valueProp : time}
          readOnly
          disabled={disabled}
          placeholder={placeholderText}
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
        <div
          role="dialog"
          aria-label="Time picker"
          className={clsx(
            "time-picker",
            pickerStyle === 'compact' ? "time-picker-compact" : "time-picker",
            inputBorderClass
          )}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={clsx("time-display", pickerStyle === 'compact' ? "time-display-compact" : "time-display")}>
              {pickerStyle === 'compact'
                ? (tempPeriod
                  ? formatTime(tempHour, tempMinute, tempPeriod)
                  : (time || '12:00 AM'))
                : (time || '12:00 AM')}
            </div>
            <button type="button" className="now-button" onClick={setCurrentTime}>
              {nowText}
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
            <button type="button" className={buttonClasses.cancel} onClick={handleCancel}>{cancelText}</button>
            <button
              type="button"
              className={buttonClasses.setTime}
              onClick={handleSetTime}
            >
              {setTimeText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
RdsCompTimePicker.displayName = "RdsCompTimePicker";
export default RdsCompTimePicker;
