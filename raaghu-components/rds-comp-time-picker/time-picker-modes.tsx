import React from 'react';

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

export const CompactTimePicker: React.FC<CompactTimePickerProps> = ({
  tempHour, 
  setTempHour, 
  tempMinute, 
  setTempMinute, 
  tempPeriod, 
  setTempPeriod
}) => {
  const onHourChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setTempHour(val);
  }, [setTempHour]);

  const onMinuteChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    setTempMinute(val);
  }, [setTempMinute]);

  const onPeriodChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempPeriod(e.target.value);
  }, [setTempPeriod]);

  const togglePeriod = React.useCallback(() => {
    setTempPeriod(tempPeriod === 'AM' ? 'PM' : 'AM');
  }, [setTempPeriod, tempPeriod]);

  return (
    <div className="time-controls-row">
      <div className="time-select-container">
        <select 
          id="hours-select"
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
          id="minutes-select"
          className="time-select" 
          value={tempMinute.toString()} 
          onChange={onMinuteChange}
        >
          {MINUTES.map((i) => (
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
          onChange={onPeriodChange}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <span
          className="time-control down"
          onClick={togglePeriod}
        ></span>
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

export const DefaultTimePicker: React.FC<DefaultTimePickerProps> = ({ 
  hours, 
  minutes, 
  period,
  onIncrementHour,
  onDecrementHour,
  onIncrementMinute,
  onDecrementMinute,
  onTogglePeriod,
}) => {
  return (
    <div className="time-values-display-row">
      <div className="time-value-display">
        <button type="button" className="time-control up" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onIncrementHour} aria-label="Increment hour">▲</button>
        {String(hours).padStart(2, '0')}
        <button type="button" className="time-control down" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onDecrementHour} aria-label="Decrement hour">▼</button>
      </div>
      <div className="time-value-colon">:</div>
      <div className="time-value-display">
        <button type="button" className="time-control up" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onIncrementMinute} aria-label="Increment minute">▲</button>
        {String(minutes).padStart(2, '0')}
        <button type="button" className="time-control down" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onDecrementMinute} aria-label="Decrement minute">▼</button>
      </div>
      <div className="time-value-display">
        <button type="button" className="time-control up" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onTogglePeriod} aria-label="Toggle AM/PM up">▲</button>
        <button type="button" className="time-value-period" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onTogglePeriod}>{period}</button>
        <button type="button" className="time-control down" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onTogglePeriod} aria-label="Toggle AM/PM down">▼</button>
      </div>
    </div>
  );
};

CompactTimePicker.displayName = 'CompactTimePicker';
DefaultTimePicker.displayName = 'DefaultTimePicker';
