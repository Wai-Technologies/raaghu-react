
import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RdsIcon from "../rds-icon";
import "./rds-datepicker.css";

export interface RdsDatepickerProps {
    selectedDate?: any
    dateForEdit?: any
    DatePickerLabel?: string;
    onDatePicker?: any;
    type?: "default" | "advanced" | "withTime";
    customDate?: any;
    isDropdownOpen: boolean;
}
const RdsDatepicker = (props: RdsDatepickerProps) => {
    const today = new Date();
    const [dropdownDisplayValue, setDropdownDisplayValue] = useState(
        today.toDateString().slice(4)
    );
    const [activeList, setActiveList] = useState("custom");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onRangeChange = (dates: [any, any]) => {
        if (props.customDate && typeof props.customDate === 'function') {
            props.customDate(dates);
        }
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setDropdownDisplayValue(
            start.toDateString().slice(4) +
            (end != null ? " - " + end.toDateString().slice(4) : "")
        );
        setIsDropdownOpen(false);
    };

    const handlerDateChange = (date: any) => {
        if (date != null) { setStartDate(date); }
        else { setStartDate(new Date()); }
        props.selectedDate && props.selectedDate(date);
        props.onDatePicker && props.onDatePicker(startDate);
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
                    fill="gray"
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
            setStartDate(props.dateForEdit);
        }
    }, [props.dateForEdit]);

    return (
        <>
            {props.type === "default" && (
                <>
                    {props.DatePickerLabel && <label className="form-label">{props.DatePickerLabel}</label>}
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
                            selected={startDate}
                            onChange={handlerDateChange}
                            className="form-control rounded-bottom-0 rounded-end-0"
                            wrapperClassName="datepicker__wrapper"
                        />
                        <span className="input-group-text cursor-pointer" id="basic-addon2">
                            <RdsIcon
                                name="calendar"
                                width="20px"
                                height="20px"

                                stroke={true}
                            ></RdsIcon>
                        </span>
                    </div>
                </>
            )}
            {props.type === "advanced" && (
                <>
                    {props.DatePickerLabel && <label className="form-label">{props.DatePickerLabel}</label>}
                    <div className="dropdown border rounded justify-content-between text-start d-block datepicker">
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
                                {/* (StartDate:any,EndDate:any)=>props.DatePicker */}
                                <span className="ps-3 pe-1 datePicker-text">{dropdownDisplayValue}</span>
                            </span>

                            <span className="d-flex">
                                <RdsIcon
                                    name={isDropdownOpen && dropdownDisplayValue ? "chevron_up" : "chevron_down"}
                                    fill={false}
                                    stroke={true}
                                    height="21px"
                                    width="11px"
                                ></RdsIcon>
                            </span>
                        </button>
                        <ul className={`dropdown-menu overflow-visible ${isDropdownOpen ? "show" : ""} z-1`}>
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
                                selected={startDate}
                                onChange={onRangeChange}
                                startDate={startDate}
                                endDate={endDate}
                                selectsRange
                                popperPlacement="right"
                                customInput={<ExampleCustomInput />}
                            />
                        </ul>
                    </div>
                </>
            )}
            {props.type === "withTime" && (
                <>
                    {props.DatePickerLabel && (
                        <label className="form-label">{props.DatePickerLabel}</label>
                    )}
                    <div className="input-group input-group-datePicker mb-3">
                        <DatePicker
                            selected={startDate}
                            onChange={handlerDateTimeChange}
                            className="form-control rounded-bottom-0 rounded-end-0"
                            wrapperClassName="datepicker__wrapper"
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm aa"
                            showTimeInput
                        />
                        <span className="input-group-text cursor-pointer" id="basic-addon2">
                            <RdsIcon
                                name="calendar"
                                width="20px"
                                height="20px"

                                stroke={true}
                            ></RdsIcon>
                        </span>
                    </div>
                </>
            )}
        </>
    );
};
export default RdsDatepicker;


