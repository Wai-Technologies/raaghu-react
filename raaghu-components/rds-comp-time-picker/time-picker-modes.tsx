import { useCallback, useId, type ChangeEvent } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

interface CompactTimePickerProps {
  tempHour: number;
  setTempHour: (hour: number) => void;
  tempMinute: number;
  setTempMinute: (minute: number) => void;
  tempPeriod: string;
  setTempPeriod: (period: string) => void;
}

export const CompactTimePicker = ({
  tempHour, 
  setTempHour, 
  tempMinute, 
  setTempMinute, 
  tempPeriod, 
  setTempPeriod
}: CompactTimePickerProps) => {
  const baseId = useId();
  const onHourChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setTempHour(val);
  }, [setTempHour]);

  const onMinuteChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setTempMinute(val);
  }, [setTempMinute]);

  const onPeriodChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setTempPeriod(e.target.value);
  }, [setTempPeriod]);

  return (
    <div className="time-controls-row">
      <div className="time-select-container">
        <select 
          id={`${baseId}-hours`} aria-label="Hours"
          className="time-select" 
          value={tempHour.toString()} 
          onChange={onHourChange}
        >
          {HOURS.map((hour) => {
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
          id={`${baseId}-minutes`} aria-label="Minutes"
          className="time-select" 
          value={tempMinute.toString()} 
          onChange={onMinuteChange}
        >
          {MINUTES.map((minute) => (
            <option key={minute} value={minute.toString()}>
              {String(minute).padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>
      
      <div className="time-select-container">
        <select 
          id={`${baseId}-period`} aria-label="AM/PM"
          className="time-select" 
          value={tempPeriod} 
          onChange={onPeriodChange}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
};

interface DefaultTimePickerProps {
  hours: number;
  minutes: number;
  period: string;
  onIncrementHour: () => void;
  onDecrementHour: () => void;
  onIncrementMinute: () => void;
  onDecrementMinute: () => void;
  onTogglePeriod: () => void;
}

export const DefaultTimePicker = ({ 
  hours, 
  minutes, 
  period,
  onIncrementHour,
  onDecrementHour,
  onIncrementMinute,
  onDecrementMinute,
  onTogglePeriod,
}: DefaultTimePickerProps) => {
  return (
    <div className="time-values-display-row">
      <div className="time-value-display">
        <button type="button" className="time-control up" onClick={onIncrementHour} aria-label="Increment hour">▲</button>
        {String(hours).padStart(2, '0')}
        <button type="button" className="time-control down" onClick={onDecrementHour} aria-label="Decrement hour">▼</button>
      </div>
      <div className="time-value-colon">:</div>
      <div className="time-value-display">
        <button type="button" className="time-control up" onClick={onIncrementMinute} aria-label="Increment minute">▲</button>
        {String(minutes).padStart(2, '0')}
        <button type="button" className="time-control down" onClick={onDecrementMinute} aria-label="Decrement minute">▼</button>
      </div>
      <div className="time-value-display">
        <button type="button" className="time-control up" onClick={onTogglePeriod} aria-label="Toggle AM/PM up">▲</button>
        <button type="button" className="time-value-period" onClick={onTogglePeriod} aria-label="Toggle AM/PM">{period}</button>
        <button type="button" className="time-control down" onClick={onTogglePeriod} aria-label="Toggle AM/PM down">▼</button>
      </div>
    </div>
  );
};

CompactTimePicker.displayName = 'CompactTimePicker';
DefaultTimePicker.displayName = 'DefaultTimePicker';
