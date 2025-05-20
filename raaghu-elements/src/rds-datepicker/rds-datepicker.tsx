import React, { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RdsIcon from "../rds-icon";
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
}
const RdsDatepicker = (props: RdsDatepickerProps) => {
    const today = new Date();
    const [dropdownDisplayValue, setDropdownDisplayValue] = useState(
        today.toDateString().slice(4)
    );
    const [activeList, setActiveList] = useState("custom");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const datePickerRef = useRef<DatePicker | null>(null);
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
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
            </span>
        </li>
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
    }, [props.dateForEdit]);

    useEffect(() => {
        if (props.state === "Expanded") {
            setIsDropdownOpen(true);
        }
        if (props.state === "Selected" && !startDate) {
            setStartDate(new Date()); // Set to current date or any default date
        }
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
    },[props.state]);

    useEffect(() => {
        setShowState(false);
        setShowType(true);
    },[props.type]);

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
                                <RdsIcon
                                    name="calendar"
                                    width="20px"
                                    height="20px"
                                    colorVariant="secondary"
                                    stroke={true}
                                ></RdsIcon>
                            </span>
                        </div> */}

                    <DatePicker
                        selected={startDate || null}
                        onChange={handlerDateChange}
                        className={`form-control rounded-end-0 ${props.isDisabled ? 'date-picker-disable' : ''}`}
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
                    <span className="input-group-text cursor-pointer" id="basic-addon2" onClick={() => datePickerRef.current && datePickerRef.current.setFocus()}>
                        <RdsIcon
                            name={props.changeIcon}
                            width="20px"
                            height="20px"
                            stroke={true}
                        ></RdsIcon>
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
                //             <RdsIcon
                //                 name="calendar"
                //                 width="20px"
                //                 height="20px"
                //                 colorVariant="secondary"
                //                 stroke={true}
                //             ></RdsIcon>
                //             <span className="ps-2 mt-1 datePicker-text">{dropdownDisplayValue}</span>
                //         </span>

                //         <span className="d-flex">
                //             <RdsIcon
                //                 name={isDropdownOpen && dropdownDisplayValue ? "chevron_up" : "chevron_down"}
                //                 fill={false}
                //                 stroke={true}
                //                 height="27px"
                //                 width="11px"
                //             ></RdsIcon>
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
                <div className="input-group input-group-datePicker mb-3 mt-1">
                    <DatePicker
                        selected={startDate || null}
                        onChange={handlerDateTimeChange}
                        className="form-control rounded-end-0"
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
                        autoFocus
                    />
                    <span className="input-group-text cursor-pointer" id="basic-addon2" >
                        <RdsIcon
                            name={props.changeIcon}
                            width="20px"
                            height="20px"
                            stroke={true}
                        ></RdsIcon>
                    </span>
                </div>
            )}
            {props.state === DatePickerState.Selected && (
                <div className="input-group input-group-datePicker mb-3 mt-1">
                    <DatePicker
                        selected={startDate || null}
                        onChange={handlerDateTimeChange}
                        className="form-control rounded-end-0"
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
                    />
                    <span className="input-group-text cursor-pointer" id="basic-addon2" >
                        <RdsIcon
                            name={props.changeIcon}
                            width="20px"
                            height="20px"
                            stroke={true}
                        ></RdsIcon>
                    </span>
                </div>
            )}
            </>
        }
        {showType &&
        <>  
         {props.type === "Default"&& (
                <div className="input-group input-group-datePicker mb-3">
                    <DatePicker
                        selected={startDate || null}
                        onChange={handlerDateChange}
                        className={`form-control rounded-end-0 ${props.isDisabled ? 'date-picker-disable' : ''}`}
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
                    <span className="input-group-text cursor-pointer" id="basic-addon2" onClick={() => datePickerRef.current && datePickerRef.current.setFocus()}>
                        <RdsIcon
                            name={props.changeIcon}
                            width="20px"
                            height="20px"
                            stroke={true}
                        ></RdsIcon>
                    </span>
                </div>
            )}
            {props.type === "Custom" && (
                 <div className="dropdown border rounded justify-content-between text-start d-block datepicker mt-1">
                     <button
                         className="bg-transparent border-0 d-flex py-18 ps-2 w-100 justify-content-between"
                         type="button"
                         id="abcd"
                         data-bs-toggle="dropdown"
                         data-bs-auto-close="outside"
                         aria-expanded={props.isDropdownOpen ? "true" : "false"}
                         onClick={toggleDropdown}>
                         <span className="d-flex">
                             <RdsIcon
                                 name="calendar"
                                 width="20px"
                                 height="20px"
                                 colorVariant="secondary"
                                 stroke={true}
                             ></RdsIcon>
                             <span className="ps-2 mt-1 datePicker-text">{dropdownDisplayValue}</span>
                         </span>

                         <span className="d-flex">
                             <RdsIcon
                                 name={isDropdownOpen && dropdownDisplayValue ? "chevron_up" : "chevron_down"}
                                 fill={false}
                                 stroke={true}
                                 height="27px"
                                 width="11px"
                             ></RdsIcon>
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
                             popperModifiers={[{ name: 'offset', options: { offset: [34, 0] }}]}
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