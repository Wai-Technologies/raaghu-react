import React, { forwardRef } from "react";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import ResInput from '../../raaghu-elements/rds-input/rds-input';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Custom input components for DatePicker
export const CustomButtons = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="rds-datepicker__button-wrapper">
        <RdsButton text="Cancel" size="small" style="outlined" />
        <RdsButton text="Apply" size="small" style="filled" />
    </div>
));

export const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <li
        className="rds-datepicker__custom-input rds-datepicker__dropdown-item"
        onClick={onClick}
        ref={ref}
    >
        <span>Custom</span>
        <span>
            <CalendarMonthIcon />
        </span>
    </li>
));

export const CustomInputWithClear = forwardRef(({ value, onClick, placeholder, isDisabled, showClearDate, clearDate }: any, ref: any) => (
    <div className="rds-datepicker__input-container">
        <ResInput
            className={`rds-datepicker__input ${isDisabled ? 'rds-datepicker--disabled' : ''} ${showClearDate && value ? 'rds-datepicker__input--with-clear' : 'rds-datepicker__input--without-clear'}`}
            value={value || ''}
            onClick={onClick}
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
        )}
    </div>
));

// Utility functions for date operations
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

// Date range helper functions
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

// Render helper functions
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
                />
                <span className={`rds-datepicker__icon-container ${props.isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`} onClick={() => {
                    if (!props.isDisabled && datePickerRef.current) {
                        datePickerRef.current.setFocus();
                        datePickerRef.current.setOpen(true);
                    }
                }}>
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                </span>
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
                />
                <span className={`rds-datepicker__icon-container ${props.isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`} onClick={() => !props.isDisabled && expandedDatePickerRef.current && expandedDatePickerRef.current.setFocus()}>
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                </span>
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
                />
                <span className={`rds-datepicker__icon-container ${props.isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`} onClick={() => !props.isDisabled && selectedDatePickerRef.current && selectedDatePickerRef.current.setFocus()}>
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                </span>
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
                />
                <span className={`rds-datepicker__icon-container ${props.isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`} onClick={() => {
                    if (!props.isDisabled && datePickerRef.current) {
                        datePickerRef.current.setFocus();
                        datePickerRef.current.setOpen(true);
                    }
                }}>
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                </span>
            </div>
        );
    } else if (type === "Custom") {
        return (
            <div className="rds-datepicker__custom-dropdown">
                <button
                    className={`rds-datepicker__dropdown-button ${props.isDisabled ? 'rds-datepicker--disabled' : ''}`}
                    type="button"
                    id="datepicker-dropdown"
                    aria-expanded={props.isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                    disabled={props.isDisabled}>
                    <span className="rds-datepicker__button-content">
                        <CalendarMonthIcon
                            color="secondary"
                            className="rds-datepicker__calendar-icon"
                        />
                        <span className="rds-datepicker__text">{dropdownDisplayValue}</span>
                    </span>

                    <span className="rds-datepicker__button-actions">
                        {props.showClearDate && dropdownDisplayValue && (
                            <span
                                className={`rds-datepicker__clear-button rds-datepicker__clear-button--dropdown ${props.isDisabled ? 'rds-datepicker__input--disabled' : 'rds-datepicker__clear-button--clickable'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!props.isDisabled) {
                                        props.clearDate();
                                    }
                                }}
                                title="Clear date"
                            >
                                <CloseIcon 
                                    color="primary"
                                    className="rds-datepicker__close-icon"
                                />
                            </span>
                        )}
                        {isDropdownOpen && dropdownDisplayValue ? 
                            <KeyboardArrowUpIcon 
                                className="rds-datepicker__arrow-icon"
                            /> : 
                            <KeyboardArrowDownIcon 
                                className="rds-datepicker__arrow-icon"
                            />
                        }
                    </span>
                </button>
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
                        popperPlacement="right"
                        customInput={<ExampleCustomInput />}
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
                    />
                </ul>
            </div>
        );
    }
    
    return null;
};
