import React from 'react';

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
  return (
    <div className="time-controls-row">
      <div className="time-select-container">
        <select 
          id="hours-select"
          className="time-select" 
          value={tempHour.toString()} 
          onChange={(e) => {
            const val = parseInt(e.target.value);
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
            setTempPeriod(e.target.value);
          }}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <span
          className="time-control down"
          onClick={() => setTempPeriod(tempPeriod === 'AM' ? 'PM' : 'AM')}
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
        <span className="time-control up" onClick={onIncrementHour}>▲</span>
        {String(hours).padStart(2, '0')}
        <span className="time-control down" onClick={onDecrementHour}>▼</span>
      </div>
      <div className="time-value-colon">:</div>
      <div className="time-value-display">
        <span className="time-control up" onClick={onIncrementMinute}>▲</span>
        {String(minutes).padStart(2, '0')}
        <span className="time-control down" onClick={onDecrementMinute}>▼</span>
      </div>
      <div className="time-value-display">
        <span className="time-control up" onClick={onTogglePeriod}>▲</span>
        <span className="time-value-period" style={{cursor: 'pointer'}} onClick={onTogglePeriod}>{period}</span>
        <span className="time-control down" onClick={onTogglePeriod}>▼</span>
      </div>
    </div>
  );
};
