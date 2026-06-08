import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./rds-comp-datepicker.scss";
import {
    CustomButtons,
    CustomInputWithClear,
    ExampleCustomInput,
    getDayClassName,
    getYesterdayDate,
    getTodayDate,
    getLastSevenDaysDate,
    getLastFourteenDaysDate,
    renderDatePickerStateView,
    renderDatePickerTypeView
} from './rds-comp-datepicker-utils';

const SafeDatePicker = DatePicker as any;

interface DatePickerImperativeRef {
    setOpen: (open: boolean) => void;
}

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
export interface RdsCompDatepickerProps {
    selectedDate?: (date: Date | null) => void; 
    dateForEdit?: string;
    titleText?: string; 
    showTitle?: boolean; 
    onDatePicker?: (date: Date | [Date | null, Date | null]) => void; 
    datePickerStyleType?: DatePickerStyleType; 
    state?: DatePickerState; 
    layout?: DatePickerLayout; 
    customDate?: (dates: [Date | null, Date | null]) => void;
    isDropdownOpen?: boolean;
    isDisabled?: boolean;
    isMandatory?: boolean;
    placeholderText?: string;
    DatePickerLabel?: string;
    type?: string;
    changeIcon?: "dashboard_settings" | string; 
    showClearDate?: boolean;
    isDefaultDate?: boolean;
}

const RdsCompDatepicker = (props: RdsCompDatepickerProps) => {
    const today = new Date(); 
    const [dropdownDisplayValue, setDropdownDisplayValue] = useState(
        props.isDefaultDate ? today.toDateString().slice(4) : ""
    );
    const [activeList, setActiveList] = useState("custom");
    const [startDate, setStartDate] = useState<Date | null>(
        props.isDefaultDate ? today : null
    );
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const datePickerRef = useRef<DatePickerImperativeRef | null>(null);
    const expandedDatePickerRef = useRef<DatePickerImperativeRef | null>(null);
    const selectedDatePickerRef = useRef<DatePickerImperativeRef | null>(null);
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
        if (typeof props.selectedDate === 'function') props.selectedDate(date);
        if (typeof props.onDatePicker === 'function') props.onDatePicker(date as Date);
    };

    const handlerDateTimeChange = (date: Date | null) => {
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
        if (!props.isDisabled) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    }; 
    
    const clearDate = () => {
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

    const yesterdayClickHandler = () => {
        setActiveList("yesterday");
        const newDate = getYesterdayDate(today);
        onRangeChange([newDate, newDate]);
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    };

    const todayClickHandler = () => {
        setActiveList("today");
        const { todayDate, newDate } = getTodayDate(today);
        onRangeChange([todayDate, newDate]); 
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    };

    const lastSevenDaysClickHandler = () => {
        setActiveList("lastSeven");
        const newDate = getLastSevenDaysDate(today);
        onRangeChange([newDate, today]);
        setDropdownDisplayValue(
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        );
    };

    const lastFourteenDaysClickHandler = () => {
        setActiveList("lastFourteen");
        const newDate = getLastFourteenDaysDate(today);
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
        if (props.state === DatePickerState.Expanded) {
            setIsDropdownOpen(true);
            setTimeout(() => {
                if (expandedDatePickerRef.current) {
                    expandedDatePickerRef.current.setOpen(true);
                }
            }, 100);
        }
    }, [props.state]);

    const dayClassName = (date: Date) => getDayClassName(date, startDate);
    
    useEffect(() => {
        setShowType(false);
        setShowState(true);
    }, [props.state]); 
    
    useEffect(() => {
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
            <label
                className={`rds-datepicker__label ${!props.showTitle ? 'rds-datepicker__label--hidden' : ''}`}
                aria-hidden={!props.showTitle}
            >
                {props.showTitle && props.titleText ? props.titleText : '\u00A0'}
                {props.showTitle && props.isMandatory && <span className="rds-datepicker__mandatory-indicator"> *</span>}
            </label>
            {showState && renderDatePickerStateView(
                props.state || DatePickerState.Default,
                startDate,
                handlerDateChange,
                handlerDateTimeChange,
                {...props, SafeDatePicker, clearDate},
                datePickerRef,
                expandedDatePickerRef,
                selectedDatePickerRef,
                dayClassName,
                CustomInputWithClear,
                CustomButtons
            )}
            {showType && renderDatePickerTypeView(
                props.type || 'Default',
                startDate,
                endDate,
                handlerDateChange,
                onRangeChange,
                {...props, SafeDatePicker, clearDate},
                isDropdownOpen,
                toggleDropdown,
                dropdownDisplayValue,
                datePickerRef,
                activeList,
                todayClickHandler,
                yesterdayClickHandler,
                lastSevenDaysClickHandler,
                lastFourteenDaysClickHandler,
                dayClassName,
                CustomInputWithClear,
                ExampleCustomInput,
                CustomButtons
            )}
        </>
    );
};
RdsCompDatepicker.displayName = "RdsCompDatepicker";
export default RdsCompDatepicker;