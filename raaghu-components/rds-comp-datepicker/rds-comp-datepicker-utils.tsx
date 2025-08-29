import React, { forwardRef } from "react";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import RdsInput from "../../raaghu-elements/rds-input/rds-input";

export const CustomButtons = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="rds-datepicker__button-wrapper">
        <RdsButton text="Cancel" size="small" style="outlined" />
        <RdsButton text="Apply" size="small" style="filled" />
    </div>
));

export const ExampleCustomInput = forwardRef(({ value, onClick, changeIcon }: any, ref: any) => (
    <li
        className="rds-datepicker__custom-input rds-datepicker__dropdown-item"
        onClick={onClick}
        ref={ref}
    >
        <span>Custom</span>
        <span>
            {changeIcon === "dashboard_settings" ? (
                <SettingsIcon className="rds-datepicker__calendar-icon" />
            ) : (
                <CalendarMonthIcon className="rds-datepicker__calendar-icon" />
            )}
        </span>
    </li>
));

export const CustomInputWithClear = forwardRef(({ value, onClick, placeholder, isDisabled, showClearDate, clearDate, changeIcon, openCustomPicker }: any, ref: any) => {
    const handleTriggerClick = (e: any) => {
        e.stopPropagation && e.stopPropagation();
        if (isDisabled) return;
        if (typeof openCustomPicker === 'function') {
            openCustomPicker();
        } else if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <div className="rds-datepicker__input-container">
            <RdsInput
                className={`rds-datepicker__input ${isDisabled ? 'rds-datepicker--disabled' : ''} ${showClearDate && value ? 'rds-datepicker__input--with-clear' : 'rds-datepicker__input--without-clear'}`}
                value={value || ''}
                onClick={handleTriggerClick}
                placeholder={placeholder}
                disabled={isDisabled}
                ref={ref}
            />
            {showClearDate && value && (
                <span
                    className={`rds-datepicker__clear-button ${isDisabled ? 'rds-datepicker__input--disabled' : 'rds-datepicker__clear-button--clickable'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isDisabled) {
                            clearDate();
                        }
                    }}
                    title="Clear date"
                >
                    <CloseIcon 
                        color="primary"
                        className="rds-datepicker__close-icon"
                    />
                </span>
            )} <span
                className={`rds-datepicker__icon-container ${isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`}
                onClick={handleTriggerClick}
                title="Open calendar"
            >
                {changeIcon === "dashboard_settings" ? (
                    <SettingsIcon
                        className="rds-datepicker__calendar-icon"
                    />
                ) : (
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                )}
            </span>
        </div>
    );
});

export const renderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: any) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 6;
  const endYear = currentYear + 6;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <div className="rds-datepicker__custom-header">
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="Previous Month"
      />
      <div className="rds-datepicker__custom-header-controls">
        <select
          value={date.getMonth()}
          onChange={(e) => changeMonth(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--month"
        >
          {months.map((m, idx) => (
            <option key={m} value={idx}>{m}</option>
          ))}
        </select>

        <select
          value={date.getFullYear()}
          onChange={(e) => changeYear(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--year"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--next"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="Next Month"
      />
    </div>
  );
};

export const getDayClassName = (date: Date, startDate: Date | null) => {
    const today = new Date();
    const referenceDate = startDate ?? today;

    const referenceMonth = referenceDate.getMonth();
    const referenceYear = referenceDate.getFullYear();

    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();

    const isPrevMonth = selectedYear < referenceYear || (selectedYear === referenceYear && selectedMonth < referenceMonth);
    const isNextMonth = selectedYear > referenceYear || (selectedYear === referenceYear && selectedMonth > referenceMonth);

    return "";
};

export const getYesterdayDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );
};

export const getTodayDate = (today: Date) => {
    return {
        todayDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ),
        newDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        )
    };
};

export const getLastSevenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7 + 1
    );
};

export const getLastFourteenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14 + 1
    );
};

export const renderDatePickerStateView = (
    state: string, 
    startDate: Date | null, 
    handlerDateChange: (date: Date | null) => void,
    handlerDateTimeChange: (date: any) => void,
    props: any, 
    datePickerRef: React.RefObject<any>,
    expandedDatePickerRef: React.RefObject<any>,
    selectedDatePickerRef: React.RefObject<any>,
    dayClassName: (date: Date) => string,
    CustomInputWithClear: any,
    CustomButtons: any
) => {
    const SafeDatePicker = props.SafeDatePicker;
    
    if (state === "Default") {
        return (
            <div className="rds-datepicker__container rds-datepicker__container--default">
                <SafeDatePicker
                    selected={startDate || null}
                    onChange={handlerDateChange}
                    customInput={
                        <CustomInputWithClear 
                            placeholder={props.placeholderText || "Select date"}
                            isDisabled={props.isDisabled}
                            showClearDate={props.showClearDate}
                            clearDate={props.clearDate}
                            changeIcon={props.changeIcon}
                        />
                    }
                    wrapperClassName="rds-datepicker__wrapper"
                    disabled={props.isDisabled}
                    placeholderText={props.placeholderText || "Select date"}
                    showMonthYearPicker={props.layout === "Month Picker"}
                    showYearPicker={props.layout === "Year Picker"}
                    showPreviousMonths
                    monthsShown={props.layout === "Multi Month" ? 3 : 1}
                    scrollableMonthYearDropdown={props.datePickerStyleType === "Dropdown"}
                    todayButton={<CustomButtons />}
                    peekNextMonth={true}
                    showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                    showYearDropdown={props.datePickerStyleType === "Dropdown"}
                    dropdownMode="select"
                    dayClassName={dayClassName}
                    ref={datePickerRef}
                    renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                />
            </div>
        );
    } else if (state === "Expanded") {
        return (
            <div className="rds-datepicker__container rds-datepicker__container--expanded">
                <SafeDatePicker
                    selected={startDate || null}
                    onChange={handlerDateTimeChange}
                    customInput={
                        <CustomInputWithClear 
                            placeholder={props.placeholderText || "Select date"}
                            isDisabled={props.isDisabled}
                            showClearDate={props.showClearDate}
                            clearDate={props.clearDate}
                            changeIcon={props.changeIcon}
                        />
                    }
                    wrapperClassName="rds-datepicker__wrapper"
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    disabled={props.isDisabled}
                    placeholderText={props.placeholderText || "Select date"}
                    showMonthYearPicker={props.layout === "Month Picker"}
                    showYearPicker={props.layout === "Year Picker"}
                    peekNextMonth={true}
                    showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                    showYearDropdown={props.datePickerStyleType === "Dropdown"}
                    dropdownMode="select"
                    showPreviousMonths
                    monthsShown={props.layout === "Multi Month" ? 3 : 1}
                    todayButton={<CustomButtons />}
                    dayClassName={dayClassName}
                    autoFocus 
                    ref={expandedDatePickerRef}
                    renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                />
            </div>
        );
    } else if (state === "Selected") {
        return (
            <div className="rds-datepicker__container rds-datepicker__container--selected">
                <SafeDatePicker
                    selected={startDate || null}
                    onChange={handlerDateTimeChange}
                    customInput={
                        <CustomInputWithClear 
                            placeholder={props.placeholderText || "Select date"}
                            isDisabled={props.isDisabled}
                            showClearDate={props.showClearDate}
                            clearDate={props.clearDate}
                            changeIcon={props.changeIcon}
                        />
                    }
                    wrapperClassName="rds-datepicker__wrapper"
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy"
                    disabled={props.isDisabled}
                    placeholderText={props.placeholderText || "Select date"}
                    showMonthYearPicker={props.layout === "Month Picker"}
                    showYearPicker={props.layout === "Year Picker"}
                    peekNextMonth={true}
                    showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                    showYearDropdown={props.datePickerStyleType === "Dropdown"}
                    dropdownMode="select"
                    showPreviousMonths
                    monthsShown={props.layout === "Multi Month" ? 3 : 1}
                    todayButton={<CustomButtons />}
                    dayClassName={dayClassName}
                    ref={selectedDatePickerRef}
                    renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                />
            </div>
        );
    }
    
    return null;
};

export const renderDatePickerTypeView = (
    type: string, 
    startDate: Date | null, 
    endDate: Date | null, 
    handlerDateChange: (date: Date | null) => void,
    onRangeChange: (dates: [Date | null, Date | null]) => void,
    props: any,
    isDropdownOpen: boolean,
    toggleDropdown: () => void,
    dropdownDisplayValue: string,
    datePickerRef: React.RefObject<any>,
    activeList: string,
    todayClickHandler: () => void,
    yesterdayClickHandler: () => void,
    lastSevenDaysClickHandler: () => void,
    lastFourteenDaysClickHandler: () => void,
    dayClassName: (date: Date) => string,
    CustomInputWithClear: any,
    ExampleCustomInput: any,
    CustomButtons: any
) => {
    const SafeDatePicker = props.SafeDatePicker;
    
    if (type === "Default") {
        return (
            <div className="rds-datepicker__container rds-datepicker__container--default-type">
                <SafeDatePicker
                    selected={startDate || null}
                    onChange={handlerDateChange}
                    customInput={
                        <CustomInputWithClear 
                            placeholder={props.placeholderText || "Select date"}
                            isDisabled={props.isDisabled}
                            showClearDate={props.showClearDate}
                            clearDate={props.clearDate}
                            changeIcon={props.changeIcon}
                        />
                    }
                    wrapperClassName="rds-datepicker__wrapper"
                    disabled={props.isDisabled}
                    placeholderText={props.placeholderText || "Select date"}
                    showMonthYearPicker={props.layout === "Month Picker"}
                    showYearPicker={props.layout === "Year Picker"}
                    showPreviousMonths
                    monthsShown={props.layout === "Multi Month" ? 3 : 1}
                    scrollableMonthYearDropdown={props.datePickerStyleType === "Dropdown"}
                    todayButton={<CustomButtons />}
                    peekNextMonth={true}
                    showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                    showYearDropdown={props.datePickerStyleType === "Dropdown"}
                    dropdownMode="select"
                    dayClassName={dayClassName}
                    ref={datePickerRef}
                    renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                />
            </div>
        );
    } else if (type === "Custom") {
        return (
            <div className="rds-datepicker__custom-dropdown">
                <SafeDatePicker
                    selected={startDate || null}
                    onChange={handlerDateChange}
                    customInput={
                        <CustomInputWithClear 
                            placeholder={props.placeholderText || "Select date"}
                            isDisabled={props.isDisabled}
                            showClearDate={props.showClearDate}
                            clearDate={props.clearDate}
                            changeIcon={props.changeIcon}
                            openCustomPicker={toggleDropdown}
                        />
                    }
                    wrapperClassName="rds-datepicker__wrapper"
                    disabled={props.isDisabled}
                    placeholderText={props.placeholderText || "Select date"}
                    showMonthYearPicker={props.layout === "Month Picker"}
                    showYearPicker={props.layout === "Year Picker"}
                    showPreviousMonths
                    monthsShown={props.layout === "Multi Month" ? 3 : 1}
                    scrollableMonthYearDropdown={props.datePickerStyleType === "Dropdown"}
                    todayButton={<CustomButtons />}
                    peekNextMonth={true}
                    showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                    showYearDropdown={props.datePickerStyleType === "Dropdown"}
                    dropdownMode="select"
                    dayClassName={dayClassName}
                    ref={datePickerRef}
                    renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                    open={false}
                />
              
                <ul className={`rds-datepicker__dropdown-menu ${isDropdownOpen ? "rds-datepicker__dropdown-menu--show" : ""}`}>
                    <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
                        <strong className="rds-datepicker__dropdown-label">Custom Date</strong>
                        <span className="rds-datepicker__dropdown-value">{dropdownDisplayValue}</span>
                    </li>

                    <li id="today"
                        className={`rds-datepicker__dropdown-item ${activeList === "today" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={todayClickHandler}
                    >
                        Today
                    </li>
                    <li id="yesterday"
                        className={`rds-datepicker__dropdown-item ${activeList === "yesterday" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={yesterdayClickHandler}
                    >
                        Yesterday
                    </li>
                    <li id="lastSeven"
                        className={`rds-datepicker__dropdown-item ${activeList === "lastSeven" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={lastSevenDaysClickHandler}
                    >
                        Last 7 days
                    </li>
                    <li id="lastFourteen"
                        className={`rds-datepicker__dropdown-item ${activeList === "lastFourteen" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={lastFourteenDaysClickHandler}
                    >
                        Last 14 days
                    </li>
                    <SafeDatePicker
                        selected={startDate || null}
                        onChange={onRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        popperPlacement="left-start"
                        popperModifiers={[
                           { name: 'flip', options: { fallbackPlacements: ['right-start','right'] } },
                           { name: 'preventOverflow', options: { boundary: 'viewport' } },
                           { name: 'offset', options: { offset: [0, 8] } }
                        ]}                       
                        popperContainer={({ children }: any) => <div>{children}</div>}
                        popperClassName="rds-datepicker__popper"
                        customInput={<ExampleCustomInput changeIcon={props.changeIcon} />}
                        disabled={props.isDisabled}
                        placeholderText={props.placeholderText || "Select date"}
                        showMonthYearPicker={props.layout === "Month Picker"}
                        showYearPicker={props.layout === "Year Picker"}
                        todayButton={<CustomButtons />}
                        peekNextMonth={true}
                        showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                        showYearDropdown={props.datePickerStyleType === "Dropdown"}
                        dropdownMode="select"
                        showPreviousMonths
                        monthsShown={props.layout === "Multi Month" ? 3 : 1}
                        dayClassName={dayClassName}
                        autoFocus
                        renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                    />
                </ul>
            </div>
        );
    }
    
    return null;
};