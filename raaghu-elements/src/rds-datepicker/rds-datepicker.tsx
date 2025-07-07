import React, { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon";
import "./rds-datepicker.css";
import RdsButton from "../rds-button";

export enum DatePickerStyleType {
    Dropdown = "Dropdown",
    Selector = "Selector"
}

export enum DatePickerLayout {
    Default = "Default",
    MonthPicker = "Month Picker",
    YearPicker = "Year Picker",
    MultiMonth = "Multi Month"
}

export enum DatePickerState {
    Default = "Default",
    Expanded = "Expanded",
    Selected = "Selected"
}
export interface RdsDatepickerProps {
    selectedDate?: (date: Date | null) => void; // Selected Date
    dateForEdit?: string; // Date for Edit
    titleText?: string; // Title
    showTitle?: boolean; // Show or hide Title
    onDatePicker?: (date: Date | [Date | null, Date | null]) => void; // On Date Picker
    datePickerStyleType?: DatePickerStyleType; // Date Picker Style Type
    state?: DatePickerState; // Date Picker State"
    layout?: DatePickerLayout; // Date Picker Layout
    customDate?: (dates: [Date | null, Date | null]) => void;
    isDropdownOpen: boolean;
    isDisabled?: boolean;
    isMandatory?: boolean;
    placeholderText?: string;
    DatePickerLabel?: string;
    type?: string;
    changeIcon?: string;
    showClearDate?: boolean;
    isDefaultDate?: boolean;
}
const RdsDatepicker = (props: RdsDatepickerProps) => {
    const today = new Date(); const [dropdownDisplayValue, setDropdownDisplayValue] = useState(
        props.isDefaultDate ? today.toDateString().slice(4) : ""
    );
    const [activeList, setActiveList] = useState("custom");
    const [startDate, setStartDate] = useState<Date | null>(
        props.isDefaultDate ? today : null
    );
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const datePickerRef = useRef<DatePicker | null>(null);
    const expandedDatePickerRef = useRef<DatePicker | null>(null);
    const selectedDatePickerRef = useRef<DatePicker | null>(null);
    const [showType, setShowType] = useState(false);
    const [showState, setShowState] = useState(true);

    const onRangeChange = (dates: [Date | null, Date | null]) => {
        if (props.customDate && typeof props.customDate === 'function') {
            props.customDate(dates);
        }
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setDropdownDisplayValue(
            start ? start.toDateString().slice(4) +
                (end ? " - " + end.toDateString().slice(4) : "") : ""
        );
        setIsDropdownOpen(false);
        if (typeof props.onDatePicker === 'function') {
            props.onDatePicker([start, end]);
        }
    };

    const handlerDateChange = (date: Date | null) => {
        setStartDate(date);
        props.selectedDate && props.selectedDate(date);
        props.onDatePicker && startDate && props.onDatePicker(startDate);
    };

    const handlerDateTimeChange = (date: any) => {
        if (date != null) {
            setStartDate(date);
        } else {
            setStartDate(new Date());
        }
        if (typeof props.selectedDate === 'function') {
            props.selectedDate(date);
        }
        if (typeof props.onDatePicker === 'function') {
            props.onDatePicker(date);
        }
    }; const toggleDropdown = () => {
        if (!props.isDisabled) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    }; const clearDate = () => {
        if (!props.isDisabled) {
            setStartDate(null);
            setEndDate(null);
            setDropdownDisplayValue("");
            if (typeof props.selectedDate === 'function') {
                props.selectedDate(null);
            }
            if (typeof props.onDatePicker === 'function') {
                props.onDatePicker([null, null]);
            }
            if (typeof props.customDate === 'function') {
                props.customDate([null, null]);
            }
        }
    };

    const CustomButtons = forwardRef(({ value, onClick }: any, ref: any) => (
        <div className="d-flex text-align-center justify-content-end gap-2 me-2">
            <RdsButton label="Cancel" size="small" colorVariant="outline-primary" />
            <RdsButton label="Apply" size="small" colorVariant="primary" />
        </div>
    ));

    const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
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
            </span>        </li>
    ));

    const CustomInputWithClear = forwardRef(({ value, onClick, placeholder }: any, ref: any) => (
        <div className="position-relative w-100">
            <input
                className={`form-control ${props.isDisabled ? 'date-picker-disable' : ''}`}
                value={value || ''}
                onClick={onClick}
                placeholder={placeholder}
                readOnly
                disabled={props.isDisabled}
                ref={ref}
                style={{ paddingRight: props.showClearDate && value ? '35px' : '12px' }}
            />
            {props.showClearDate && value && (
                <span
                    className={`position-absolute ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`}
                    style={{
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        color: '#dc3545',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!props.isDisabled) {
                            clearDate();
                        }
                    }}
                    title="Clear date"
                >
                    {/* Clear/Cross Icon - Always Visible */}
                    <RdsCompIcon
                        colorVariant="primary"
                        height="12px"
                        isCursorPointer
                        name="cross"
                        stroke
                        width="12px"
                    />
                </span>
            )}
        </div>
    ));

    const yesterdayClickHandler = () => {
        setActiveList("yesterday");
        const newDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 1
        );
        onRangeChange([newDate, newDate]);
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    };
    const todayClickHandler = () => {
        setActiveList("today");
        const todayDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );
        const newDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        );
        onRangeChange([todayDate, newDate]); // set the end date the same as the start date
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    };
    const lastSevenDaysClickHandler = () => {
        setActiveList("lastSeven");
        const newDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 7 + 1
        );
        onRangeChange([newDate, today]);
        setDropdownDisplayValue(
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        );
    };
    const lastFourteenDaysClickHandler = () => {
        setActiveList("lastFourteen");
        const newDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 14 + 1
        );
        onRangeChange([newDate, today]);
        setDropdownDisplayValue(
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        );
    };

    useEffect(() => {
        if (props.dateForEdit) {
            setStartDate(new Date(props.dateForEdit));
        }
    }, [props.dateForEdit]); useEffect(() => {
        if (props.state === "Expanded") {
            setIsDropdownOpen(true);
            // Automatically open the DatePicker for Expanded state
            setTimeout(() => {
                if (expandedDatePickerRef.current) {
                    expandedDatePickerRef.current.setOpen(true);
                }
            }, 100);
        }
        // Removed automatic date setting for "Selected" state to keep it blank initially
    }, [props.state]);

    const dayClassName = (date: Date) => {
        const today = new Date();
        const referenceDate = startDate ?? today; // Use `startDate` if defined, otherwise fallback to today

        const referenceMonth = referenceDate.getMonth();
        const referenceYear = referenceDate.getFullYear();

        const selectedMonth = date.getMonth();
        const selectedYear = date.getFullYear();

        // Conditions to check if the date is in a previous or next month
        const isPrevMonth = selectedYear < referenceYear || (selectedYear === referenceYear && selectedMonth < referenceMonth);
        const isNextMonth = selectedYear > referenceYear || (selectedYear === referenceYear && selectedMonth > referenceMonth);

        return "";
    };
    useEffect(() => {
        setShowType(false);
        setShowState(true);
    }, [props.state]); useEffect(() => {
        setShowState(false);
        setShowType(true);
    }, [props.type]);

    useEffect(() => {
        if (props.isDefaultDate) {
            setStartDate(today);
            setDropdownDisplayValue(today.toDateString().slice(4));
        } else {
            setStartDate(null);
            setDropdownDisplayValue("");
        }
    }, [props.isDefaultDate]);

    return (
        <>
            {props.showTitle && props.titleText && (
                <label className="form-label">
                    {props.titleText}
                    {props.isMandatory && <span className="text-danger"> *</span>}
                </label>
            )}
            {showState &&
                <>
                    {props.state === DatePickerState.Default && (
                        <div className="input-group input-group-datePicker mb-3">
                            {/* <div className="input-group-append datepicker__icon-box">
                            <span className="input-group-text cursor-pointer" id="basic-addon2">
                                <RdsCompIcon
                                    name="calendar"
                                    width="20px"
                                    height="20px"
                                    colorVariant="secondary"
                                    stroke={true}
                                ></RdsCompIcon>
                            </span>
                        </div> */}

                            <DatePicker
                                selected={startDate || null}
                                onChange={handlerDateChange}
                                customInput={<CustomInputWithClear placeholder={props.placeholderText || "Select date"} />}
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
                            <span className={`input-group-text ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => {
                                if (!props.isDisabled && datePickerRef.current) {
                                    datePickerRef.current.setFocus();
                                    datePickerRef.current.setOpen(true);
                                }
                            }}>
                                <RdsCompIcon
                                    name={props.changeIcon}
                                    width="20px"
                                    height="20px"
                                    stroke={true}
                                ></RdsCompIcon>
                            </span>
                        </div>
                    )}
                    {props.state === DatePickerState.Expanded && (
                        // <div className="dropdown border rounded justify-content-between text-start d-block datepicker mt-1">
                        //     <button
                        //         className="bg-transparent border-0 d-flex py-18 ps-2 w-100 justify-content-between"
                        //         type="button"
                        //         id="abcd"
                        //         data-bs-toggle="dropdown"
                        //         data-bs-auto-close="outside"
                        //         aria-expanded={props.isDropdownOpen ? "true" : "false"}
                        //         onClick={toggleDropdown}>
                        //         <span className="d-flex">
                        //             <RdsCompIcon
                        //                 name="calendar"
                        //                 width="20px"
                        //                 height="20px"
                        //                 colorVariant="secondary"
                        //                 stroke={true}
                        //             ></RdsCompIcon>
                        //             <span className="ps-2 mt-1 datePicker-text">{dropdownDisplayValue}</span>
                        //         </span>

                        //         <span className="d-flex">
                        //             <RdsCompIcon
                        //                 name={isDropdownOpen && dropdownDisplayValue ? "chevron_up" : "chevron_down"}
                        //                 fill={false}
                        //                 stroke={true}
                        //                 height="27px"
                        //                 width="11px"
                        //             ></RdsCompIcon>
                        //         </span>
                        //     </button>
                        //     <ul className={`dropdown-menu overflow-visible ${isDropdownOpen ? "show" : ""} z-4`}>
                        //         <li className="daterange__dropdown-item dropdown-item px-2 pb-2 border-bottom">
                        //             {" "}
                        //             <strong>
                        //                 <small>Custom Date</small>
                        //             </strong>{" "}
                        //             <small className="px-1 py-0 ">{dropdownDisplayValue}</small>
                        //         </li>

                        //         <li id="today"
                        //             className={`daterange__dropdown-item dropdown-item  ${activeList === "today" ? "bg-opacity-10 bg-primary" : ""}`}
                        //             onClick={todayClickHandler}
                        //         >
                        //             Today
                        //         </li>
                        //         <li id="yesterday"
                        //             className={`daterange__dropdown-item dropdown-item  ${activeList === "yesterday" ? "bg-opacity-10 bg-primary" : ""}`}
                        //             onClick={yesterdayClickHandler}
                        //         >
                        //             Yesterday
                        //         </li>
                        //         <li id="lastSeven"
                        //             className={`daterange__dropdown-item dropdown-item  ${activeList === "lastSeven" ? "bg-opacity-10 bg-primary" : ""}`}
                        //             onClick={lastSevenDaysClickHandler}
                        //         >
                        //             Last 7 days
                        //         </li>
                        //         <li id="lastFourteen"
                        //             className={`daterange__dropdown-item dropdown-item  ${activeList === "lastFourteen" ? "bg-opacity-10 bg-primary" : ""}`}
                        //             onClick={lastFourteenDaysClickHandler}
                        //         >
                        //             Last 14 days
                        //         </li>
                        //         <DatePicker
                        //             selected={startDate || null}
                        //             onChange={onRangeChange}
                        //             startDate={startDate}
                        //             endDate={endDate}
                        //             selectsRange
                        //             popperPlacement="right"
                        //             customInput={<ExampleCustomInput />}
                        //             disabled={props.isDisabled}
                        //             placeholderText={props.placeholderText || "Select date"}
                        //             showMonthYearPicker={props.layout === "Month Picker"}
                        //             showYearPicker={props.layout === "Year Picker"}
                        //             todayButton={<CustomButtons />}
                        //             peekNextMonth={true}
                        //             showMonthDropdown={props.datepickerStyle === "Dropdown"}
                        //             showYearDropdown={props.datepickerStyle === "Dropdown"}
                        //             dropdownMode="select"
                        //             showPreviousMonths
                        //             monthsShown={props.layout === "Multi Month" ? 3 : 1}
                        //             popperModifiers={[{ name: 'offset', options: { offset: [34, 0] }}]}
                        //             dayClassName={dayClassName} 
                        //             autoFocus
                        //         />
                        //     </ul>
                        // </div>
                        <div className="input-group input-group-datePicker mb-3 mt-1">                            <DatePicker
                            selected={startDate || null}
                            onChange={handlerDateTimeChange}
                            customInput={<CustomInputWithClear placeholder={props.placeholderText || "Select date"} />}
                            wrapperClassName="datepicker__wrapper"
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            // showTimeInput
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
                            autoFocus ref={expandedDatePickerRef}
                        />
                            <span className={`input-group-text ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => !props.isDisabled && expandedDatePickerRef.current && expandedDatePickerRef.current.setFocus()}>
                                <RdsCompIcon
                                    name={props.changeIcon}
                                    width="20px"
                                    height="20px"
                                    stroke={true}
                                ></RdsCompIcon>
                            </span>
                        </div>
                    )}
                    {props.state === DatePickerState.Selected && (
                        <div className="input-group input-group-datePicker mb-3 mt-1">
                            <DatePicker
                                selected={startDate || null}
                                onChange={handlerDateTimeChange}
                                customInput={<CustomInputWithClear placeholder={props.placeholderText || "Select date"} />}
                                wrapperClassName="datepicker__wrapper"
                                timeInputLabel="Time:"
                                dateFormat="MM/dd/yyyy"
                                // showTimeInput
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
                            <span className={`input-group-text ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => !props.isDisabled && selectedDatePickerRef.current && selectedDatePickerRef.current.setFocus()}>
                                <RdsCompIcon
                                    name={props.changeIcon}
                                    width="20px"
                                    height="20px"
                                    stroke={true}
                                ></RdsCompIcon>
                            </span>
                        </div>
                    )}
                </>
            }
            {showType &&
                <>
                    {props.type === "Default" && (
                        <div className="input-group input-group-datePicker mb-3">
                            <DatePicker
                                selected={startDate || null}
                                onChange={handlerDateChange}
                                customInput={<CustomInputWithClear placeholder={props.placeholderText || "Select date"} />}
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
                            <span className={`input-group-text ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`} id="basic-addon2" onClick={() => {
                                if (!props.isDisabled && datePickerRef.current) {
                                    datePickerRef.current.setFocus();
                                    datePickerRef.current.setOpen(true);
                                }
                            }}>
                                <RdsCompIcon
                                    name={props.changeIcon}
                                    width="20px"
                                    height="20px"
                                    stroke={true}
                                ></RdsCompIcon>
                            </span>
                        </div>
                    )}
                    {props.type === "Custom" && (
                        <div className="dropdown border rounded justify-content-between text-start d-block datepicker mt-1">                            <button
                            className={`bg-transparent border-0 d-flex py-18 ps-2 w-100 justify-content-between position-relative ${props.isDisabled ? 'date-picker-disable' : ''}`}
                            type="button"
                            id="abcd"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded={props.isDropdownOpen ? "true" : "false"}
                            onClick={toggleDropdown}
                            disabled={props.isDisabled}>
                            <span className="d-flex">
                                <RdsCompIcon
                                    name="calendar"
                                    width="20px"
                                    height="20px"
                                    colorVariant="secondary"
                                    stroke={true}
                                ></RdsCompIcon>
                                <span className="ps-2 mt-1 datePicker-text">{dropdownDisplayValue}</span>
                            </span>

                            <span className="d-flex">                                    {props.showClearDate && dropdownDisplayValue && (
                                <span
                                    className={`position-absolute ${props.isDisabled ? 'disabled' : 'cursor-pointer'}`} style={{
                                        right: '35px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        zIndex: 10
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!props.isDisabled) {
                                            clearDate();
                                        }
                                    }}
                                    title="Clear date"
                                >
                                    <RdsCompIcon
                                        colorVariant="primary"
                                        height="12px"
                                        isCursorPointer
                                        name="cross"
                                        stroke
                                        width="12px"
                                    />
                                </span>
                            )}
                                <RdsCompIcon
                                    name={isDropdownOpen && dropdownDisplayValue ? "chevron_up" : "chevron_down"}
                                    fill={false}
                                    stroke={true}
                                    height="27px"
                                    width="11px"
                                ></RdsCompIcon>
                            </span>
                        </button>
                            <ul className={`dropdown-menu overflow-visible ${isDropdownOpen ? "show" : ""} z-4`}>
                                <li className="daterange__dropdown-item dropdown-item px-2 pb-2 border-bottom">
                                    {" "}
                                    <strong>
                                        <small>Custom Date</small>
                                    </strong>{" "}
                                    <small className="px-1 py-0 ">{dropdownDisplayValue}</small>
                                </li>

                                <li id="today"
                                    className={`daterange__dropdown-item dropdown-item  ${activeList === "today" ? "bg-opacity-10 bg-primary" : ""}`}
                                    onClick={todayClickHandler}
                                >
                                    Today
                                </li>
                                <li id="yesterday"
                                    className={`daterange__dropdown-item dropdown-item  ${activeList === "yesterday" ? "bg-opacity-10 bg-primary" : ""}`}
                                    onClick={yesterdayClickHandler}
                                >
                                    Yesterday
                                </li>
                                <li id="lastSeven"
                                    className={`daterange__dropdown-item dropdown-item  ${activeList === "lastSeven" ? "bg-opacity-10 bg-primary" : ""}`}
                                    onClick={lastSevenDaysClickHandler}
                                >
                                    Last 7 days
                                </li>
                                <li id="lastFourteen"
                                    className={`daterange__dropdown-item dropdown-item  ${activeList === "lastFourteen" ? "bg-opacity-10 bg-primary" : ""}`}
                                    onClick={lastFourteenDaysClickHandler}
                                >
                                    Last 14 days
                                </li>
                                <DatePicker
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
                                    popperModifiers={[{ name: 'offset', options: { offset: [34, 0] } }]}
                                    dayClassName={dayClassName}
                                    autoFocus
                                />
                            </ul>
                        </div>
                    )}
                </>
            }
        </>
    );
};
export default RdsDatepicker;