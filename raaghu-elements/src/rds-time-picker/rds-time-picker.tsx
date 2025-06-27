import React, { useEffect, useState } from 'react';
import './rds-time-picker.css';
import RdsCompIcon from '../../../raaghu-components/src/rds-comp-icon/rds-comp-icon';
import RdsCompSelectList from '../../../raaghu-components/src/rds-comp-select-list/rds-comp-select-list';

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

  const getIconColor = () => {
    const variant = props.colorVariant || 'primary';
    return variant === 'light' ? 'dark' : variant;
  };

  const getTextColor = () => {
    const variant = props.colorVariant || 'primary';
    return variant === 'light' ? 'dark' : variant;
  };

  return (
    <div className="time-picker-container">
      <div className="time-input-container" onClick={togglePicker}>
        <input
          type="text"
          className={`time-input ${getInputBorderClass()}`}
          value={time}
          readOnly
          placeholder="12:00 AM"
        />
        <span className="time-icon">
          <RdsCompIcon
            name="clock"
            height="16px"
            width="16px"
            colorVariant={getIconColor()}
            stroke={true}
          />
        </span>
      </div>

      {showPicker && (
        <div className={`time-picker ${props.style === 'compact' ? "time-picker-compact" : "time-picker"} ${getInputBorderClass()}`}>
          <div className="row d-flex align-items-center justify-content-between">
            <div className={`time-display ${props.style === 'compact' ? "time-display-compact" : "time-display"}`}>
              {time ? time : '12:00 AM'}
            </div>
            <div className={`now-button text-${getTextColor()}`} onClick={setCurrentTime}>
              NOW
            </div>
          </div>
          <div className={`row time-controls-row ${props.style == 'compact' ? 'time-controls-row-compact' : 'time-controls-row'}`}>
            {props.style === 'compact' ? (
              <>
               <div className="time-controls">
  <RdsCompSelectList
    color="primary"
    id="hours-select"
    isSearchable={false}
    label=""
    onChange={(selected) => setHours(parseInt(selected.value))}
    placeholder="HH"
    selectItems={Array.from({ length: 12 }, (_, i) => {
      const hour = i + 1;
      return {
        option: String(hour).padStart(2, '0'),
        value: hour.toString()
      };
    })}
    selectedValue={hours.toString()}
    classes={`number ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'} select-height`}
    showLabel={false}
  />
</div>

<div className="time-controls dropdown-height">
  <RdsCompSelectList
    color="primary"
    id="minutes-select"
    isSearchable={false}
    label=""
    onChange={(selected) => setMinutes(parseInt(selected.value))}
    placeholder="MM"
    selectItems={Array.from({ length: 60 }, (_, i) => ({
      option: String(i).padStart(2, '0'),
      value: i.toString()
    }))}
    selectedValue={minutes.toString()}
    classes={`number ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'} select-height`}
    showLabel={false}
  />
</div>

<div className="time-controls">
  <RdsCompSelectList
    color="primary"
    id="period-select"
    isSearchable={false}
    label=""
    onChange={(selected) => setPeriod(selected.value)}
    placeholder="AM/PM"
    selectItems={[
      { option: 'AM', value: 'AM' },
      { option: 'PM', value: 'PM' }
    ]}
    selectedValue={period}
    classes={`number ${props.style === 'compact' ? 'numberCompact text-muted' : 'number'} select-height`}
    showLabel={false}
  />
</div>

              </>
            ) : (
              <>
                <div className="time-controls">
                  <div className="arrow" onClick={incrementHours}>
                    <RdsCompIcon
                      name="chevron_up_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                  <input
                    type="number"
                    className={`number text-${getTextColor()}`}
                    value={String(hours).padStart(2, '0')}
                    readOnly
                  />
                  <div className="arrow" onClick={decrementHours}>
                    <RdsCompIcon
                      name="chevron_down_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                </div>
                <div className="time-controls">
                  <div className="arrow" onClick={incrementMinutes}>
                    <RdsCompIcon
                      name="chevron_up_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                  <input
                    type="number"
                    className={`number text-${getTextColor()}`}
                    value={String(minutes).padStart(2, '0')}
                    readOnly
                  />
                  <div className="arrow" onClick={decrementMinutes}>
                    <RdsCompIcon
                      name="chevron_down_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                </div>
                <div className="time-controls">
                  <div className="arrow" onClick={togglePeriod}>
                    <RdsCompIcon
                      name="chevron_up_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                  <input
                    type="text"
                    className={`text-${getTextColor()}`}
                    value={period}
                    readOnly
                  />
                  <div className="arrow" onClick={togglePeriod}>
                    <RdsCompIcon
                      name="chevron_down_outline"
                      height="14px"
                      width="14px"
                      colorVariant={getIconColor()}
                      fill={false}
                      stroke={true}
                    />
                  </div>
                </div>
              </>
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

export default RdsTimePicker;