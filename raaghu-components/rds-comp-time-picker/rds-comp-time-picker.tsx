import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import './rds-comp-time-picker.scss';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CompactTimePicker, DefaultTimePicker } from './time-picker-modes';
import { 
  getButtonClasses, 
  getInputBorderClass, 
  parseTimeFromValue,
  getCurrentTime, 
  formatTime 
} from './time-picker-utils';

export interface RdsTimePickerProps {
  style?: 'default' | 'compact';
  colorVariant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
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
  
  const [tempHour, setTempHour] = useState<number>(12);
  const [tempMinute, setTempMinute] = useState<number>(0);
  const [tempPeriod, setTempPeriod] = useState<string>('AM');

  const togglePicker = useCallback(() => {
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
  }, [showPicker, props.style, time, hours, minutes, period]);

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

  const handleSetTime = useCallback((e: MouseEvent) => {
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
  }, [props.style, tempHour, tempMinute, tempPeriod, props.onChange, hours, minutes, period]);

  const handleCancel = useCallback(() => {
    setTime('');
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
  }, [props.onChange]);

  const setCurrentTime = useCallback(() => {
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
  }, [props.style, props.onChange]);

  const incrementHour = useCallback(() => setHours((prev) => (prev % 12) + 1), []);
  const decrementHour = useCallback(() => setHours((prev) => (prev - 1 <= 0 ? 12 : prev - 1)), []);
  const incrementMinute = useCallback(() => setMinutes((prev) => (prev + 1) % 60), []);
  const decrementMinute = useCallback(() => setMinutes((prev) => (prev - 1 < 0 ? 59 : prev - 1)), []);
  const togglePeriod = useCallback(() => setPeriod((p) => (p === 'AM' ? 'PM' : 'AM')), []);

  const variantClass = useMemo(() => `time-picker-variant-${props.colorVariant || 'primary'}`, [props.colorVariant]);
  const inputBorderClass = useMemo(() => getInputBorderClass(props.colorVariant), [props.colorVariant]);
  const buttonClasses = useMemo(() => getButtonClasses(props.colorVariant), [props.colorVariant]);

  return (
    <div className={`time-picker-container ${variantClass}`}>
      <div
        className={clsx("time-input-container", props.disabled && "disabled")}
        onClick={!props.disabled ? togglePicker : undefined}
      >
        <input
          type="text"
          className={`time-input ${inputBorderClass}`}
          value={props.value !== undefined ? props.value : time}
          readOnly
          disabled={props.disabled}
          placeholder="12:00 AM"
        />
        <span className="time-icon">
          <AccessTimeIcon fontSize="small" />
        </span>
      </div>

      {showPicker && (
        <div className={clsx(
            "time-picker",
            props.style === 'compact' ? "time-picker-compact" : "time-picker",
            inputBorderClass
          )}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={clsx("time-display", props.style === 'compact' ? "time-display-compact" : "time-display")}>
              {props.style === 'compact' 
                ? ((tempHour !== null && tempMinute !== null && tempPeriod)
                  ? formatTime(tempHour, tempMinute, tempPeriod)
                  : (time || '12:00 AM'))
                : (time || '12:00 AM')}
            </div>
            <div className="now-button" onClick={setCurrentTime}>
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
                  onIncrementHour={incrementHour}
                  onDecrementHour={decrementHour}
                  onIncrementMinute={incrementMinute}
                  onDecrementMinute={decrementMinute}
                  onTogglePeriod={togglePeriod}
                />
            }
          </div>
          <div className="time-divider" role="separator" aria-hidden="true" />
          
          <div className={clsx("buttons", props.style === "compact" ? "buttons-compact" : "buttons")}>
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