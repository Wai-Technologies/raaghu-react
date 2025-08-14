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
      </div>
    </div>
  );
};

interface DefaultTimePickerProps {
  hours: number;
  minutes: number;
  period: string;
}

export const DefaultTimePicker: React.FC<DefaultTimePickerProps> = ({ 
  hours, 
  minutes, 
  period 
}) => {
  return (
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
  );
};
