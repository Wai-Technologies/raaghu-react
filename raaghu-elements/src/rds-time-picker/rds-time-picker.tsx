import React, { useEffect, useState } from 'react';
import './rds-time-picker.css';
import RdsIcon from '../rds-icon/rds-icon';

export interface RdsTimePickerProps {
  style?: string;
  colorVariant?: string;
  state?: string;
}

const RdsTimePicker = (props: RdsTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [time, setTime] = useState("");

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    if (props.state === 'expanded') {
      setShowPicker(true);
      setTime('');
    } else if (props.state === 'selected') {
      setShowPicker(false);
      setTime('12:00 AM');
    }
    else {
      setShowPicker(false);
      setTime('');

    }
  }, [props.state]);
  const handleSetTime = () => {
    setTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTime('');
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
        setTime(`${String(currentHours).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')} ${currentPeriod}`);
      };

  return (
    <div className="time-picker-container">
      <div className="time-input-container" onClick={togglePicker}>
        <input
        type="text"
        className={`time-input border-${props.colorVariant}`}
        value={time}
        readOnly
        placeholder="12:00 AM"
        />
        <span className="time-icon">
        <RdsIcon
        name="clock"
        height="16px"
        width="16px"
        colorVariant={`${props.colorVariant}`}
        />
        </span>
    </div>

      {showPicker && (
        <div className={`time-picker ${props.style === 'compact'? "time-picker-compact" :"time-picker" } border-${props.colorVariant }`}>
        <div className="row d-flex align-items-center justify-content-between">
          <div  className={`time-display ${props.style === 'compact'? "time-display-compact" :"time-display" }`} >
            {time ? time : '12:00 AM'}
          </div>
          <div className={`now-button text-${props.colorVariant}`} onClick={setCurrentTime}>
            NOW
          </div>
        </div>
        <div className={`row time-controls-row ${props.style=='compact'?'time-controls-row-compact' :'time-controls-row'}`}>
          {props.style === 'compact' ? (
            <>
              <div className="time-controls">
                <select
                  className={`number  ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'}`}
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="time-controls">
                <select
                    className={`number  ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'}`}
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                >
 
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <>
                
                    <option key={minute} value={minute}>
                      {String(minute).padStart(2, '0')}
                    </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="time-controls">
                <select
                  className={`number ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'}`}
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="time-controls">
                <div className="arrow" onClick={incrementHours}>
                 <RdsIcon
                    name="chevron_up_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
                <input
                  type="number"
                  className={`number text-${props.colorVariant}`}
                  value={String(hours).padStart(2, '0')}
                  readOnly
                />
                <div className="arrow" onClick={decrementHours}>
                <RdsIcon
                    name="chevron_down_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
              </div>
              <div className="time-controls">
                <div className="arrow" onClick={incrementMinutes}>
                <RdsIcon
                    name="chevron_up_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
                <input
                  type="number"
                  className={`number text-${props.colorVariant}`}
                  value={String(minutes).padStart(2, '0')}
                  readOnly
                />
                <div className="arrow" onClick={decrementMinutes}>
                <RdsIcon
                    name="chevron_down_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
              </div>
              <div className="time-controls">
                <div className="arrow" onClick={togglePeriod}>
                <RdsIcon
                    name="chevron_up_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
                <input
                  type="text"
                  className={`text-${props.colorVariant}`}
                  value={period}
                  readOnly
                />
                <div className="arrow" onClick={togglePeriod}>
                  <RdsIcon
                    name="chevron_down_outline"
                    height="14px"
                    width="14px"
                    colorVariant={`${props.colorVariant}`}
                    fill={false}
                    stroke={true}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className={`buttons ${props.style=="compact"? "buttons-compact":"buttons"}`}>
            <button className={`cancel border-none text-${props.colorVariant}`} onClick={handleCancel}>Cancel</button>
            <button className={`set-time bg-${props.colorVariant}`} onClick={handleSetTime}>Set Time</button>
        </div>
      </div>
    )}
  </div>
);
};      

export default RdsTimePicker;