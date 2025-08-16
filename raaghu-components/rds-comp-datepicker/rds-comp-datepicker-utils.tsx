import React, { forwardRef } from "react";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Custom input components for DatePicker
export const CustomButtons = forwardRef(({ value, onClick }: any, ref: any) => (
    <div className="d-flex text-align-center justify-content-end gap-2 me-2">
        <RdsButton text="Cancel" size="small" style="outlined" />
        <RdsButton text="Apply" size="small" style="filled" />
    </div>
));

export const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <li
        className="example-custom-input dropdown-item d-flex justify-content-between"
        onClick={onClick}
        ref={ref}
    >
        <span>Custom</span>
        <span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="white"
                className="bi bi-caret-right-fill "
                viewBox="0 0 16 16"
            >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
        </span>
    </li>
));

export const CustomInputWithClear = forwardRef(({ value, onClick, placeholder, isDisabled, showClearDate, clearDate }: any, ref: any) => (
    <div className="position-relative w-100">
        <input
            className={`form-control form-control-md ${isDisabled ? 'rds-comp-datepicker--disabled' : ''} ${showClearDate && value ? 'rds-comp-datepicker__input-padding--with-clear' : 'rds-comp-datepicker__input-padding--without-clear'}`}
            value={value || ''}
            onClick={onClick}
            placeholder={placeholder}
            readOnly
            disabled={isDisabled}
            ref={ref}
        />
        {showClearDate && value && (
            <span
                className={`position-absolute rds-comp-datepicker__clear-button ${isDisabled ? 'rds-comp-datepicker__input--disabled' : 'cursor-pointer'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isDisabled) {
                        clearDate();
                    }
                }}
                title="Clear date"
            >
                {/* Clear/Cross Icon - Always Visible */}
                <CloseIcon 
                    color="primary"
                    className="rds-comp-datepicker__close-icon"
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
            <div className="input-group input-group-datePicker mb-3 rds-comp-datepicker">
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
                    wrapperClassName="datepicker__wrapper"
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
                <span className={`input-group-text ${props.isDisabled ? 'rds-comp-datepicker--disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => {
                    if (!props.isDisabled && datePickerRef.current) {
                        datePickerRef.current.setFocus();
                        datePickerRef.current.setOpen(true);
                    }
                }}>
                    <CalendarMonthIcon
                        className="rds-comp-datepicker__calendar-icon"
                    />
                </span>
            </div>
        );
    } else if (state === "Expanded") {
        return (
            <div className="input-group input-group-datePicker mb-3 mt-1 rds-comp-datepicker">
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
                    wrapperClassName="datepicker__wrapper"
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
                <span className={`input-group-text ${props.isDisabled ? 'rds-comp-datepicker--disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => !props.isDisabled && expandedDatePickerRef.current && expandedDatePickerRef.current.setFocus()}>
                    <CalendarMonthIcon
                        className="rds-comp-datepicker__calendar-icon"
                    />
                </span>
            </div>
        );
    } else if (state === "Selected") {
        return (
            <div className="input-group input-group-datePicker mb-3 mt-1 rds-comp-datepicker">
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
                    wrapperClassName="datepicker__wrapper"
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
                <span className={`input-group-text ${props.isDisabled ? 'rds-comp-datepicker--disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => !props.isDisabled && selectedDatePickerRef.current && selectedDatePickerRef.current.setFocus()}>
                    <CalendarMonthIcon
                        className="rds-comp-datepicker__calendar-icon"
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
            <div className="input-group input-group-datePicker mb-3 rds-comp-datepicker">
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
                    wrapperClassName="datepicker__wrapper"
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
                <span className={`input-group-text ${props.isDisabled ? 'rds-comp-datepicker--disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => {
                    if (!props.isDisabled && datePickerRef.current) {
                        datePickerRef.current.setFocus();
                        datePickerRef.current.setOpen(true);
                    }
                }}>
                    <CalendarMonthIcon
                        className="rds-comp-datepicker__calendar-icon"
                    />
                </span>
            </div>
        );
    } else if (type === "Custom") {
        return (
            <div className="dropdown border rounded justify-content-between text-start d-block datepicker mt-1 rds-comp-datepicker rds-comp-datepicker__dropdown">
                <button
                    className={`bg-transparent border-0 d-flex rds-comp-datepicker__padding ps-2 w-100 justify-content-between position-relative ${props.isDisabled ? 'rds-comp-datepicker--disabled' : ''}`}
                    type="button"
                    id="abcd"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded={props.isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                    disabled={props.isDisabled}>
                    <span className="d-flex">
                        <CalendarMonthIcon
                            color="secondary"
                            className="rds-comp-datepicker__calendar-icon"
                        />
                        <span className="ps-2 mt-1 datePicker-text">{dropdownDisplayValue}</span>
                    </span>

                    <span className="d-flex">
                        {props.showClearDate && dropdownDisplayValue && (
                            <span
                                className={`position-absolute rds-comp-datepicker__clear-button rds-comp-datepicker__clear-button--dropdown ${props.isDisabled ? 'rds-comp-datepicker__input--disabled' : 'cursor-pointer'}`}
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
                                    className="rds-comp-datepicker__close-icon"
                                />
                            </span>
                        )}
                        {isDropdownOpen && dropdownDisplayValue ? 
                            <KeyboardArrowUpIcon 
                                className="rds-comp-datepicker__arrow-icon"
                            /> : 
                            <KeyboardArrowDownIcon 
                                className="rds-comp-datepicker__arrow-icon"
                            />
                        }
                    </span>
                </button>
                <ul className={`dropdown-menu overflow-visible ${isDropdownOpen ? "show" : ""} z-4`}>
                    <li className="rds-comp-datepicker__dropdown-item dropdown-item px-2 pb-2 border-bottom">
                        {" "}
                        <strong>
                            <small>Custom Date</small>
                        </strong>{" "}
                        <small className="px-1 py-0 ">{dropdownDisplayValue}</small>
                    </li>

                    <li id="today"
                        className={`rds-comp-datepicker__dropdown-item dropdown-item  ${activeList === "today" ? "bg-opacity-10 bg-primary" : ""}`}
                        onClick={todayClickHandler}
                    >
                        Today
                    </li>
                    <li id="yesterday"
                        className={`rds-comp-datepicker__dropdown-item dropdown-item  ${activeList === "yesterday" ? "bg-opacity-10 bg-primary" : ""}`}
                        onClick={yesterdayClickHandler}
                    >
                        Yesterday
                    </li>
                    <li id="lastSeven"
                        className={`rds-comp-datepicker__dropdown-item dropdown-item  ${activeList === "lastSeven" ? "bg-opacity-10 bg-primary" : ""}`}
                        onClick={lastSevenDaysClickHandler}
                    >
                        Last 7 days
                    </li>
                    <li id="lastFourteen"
                        className={`rds-comp-datepicker__dropdown-item dropdown-item  ${activeList === "lastFourteen" ? "bg-opacity-10 bg-primary" : ""}`}
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
