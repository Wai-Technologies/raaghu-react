import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
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

const SafeDatePicker = DatePicker;

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

const RdsDatepicker = ({
    selectedDate,
    dateForEdit,
    titleText,
    showTitle,
    onDatePicker,
    datePickerStyleType,
    state,
    layout,
    customDate,
    isDisabled,
    isMandatory,
    placeholderText,
    type,
    changeIcon,
    showClearDate,
    isDefaultDate,
    ...restProps
}: RdsDatepickerProps) => {
    const today = useMemo(() => new Date(), []); 
    const [dropdownDisplayValue, setDropdownDisplayValue] = useState(
        isDefaultDate ? today.toDateString().slice(4) : ""
    );
    const [activeList, setActiveList] = useState("custom");
    const [startDate, setStartDate] = useState<Date | null>(
        isDefaultDate ? today : null
    );
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const datePickerRef = useRef<DatePicker | null>(null);
    const expandedDatePickerRef = useRef<DatePicker | null>(null);
    const selectedDatePickerRef = useRef<DatePicker | null>(null);
    const [showType, setShowType] = useState(false);
    const [showState, setShowState] = useState(true);

    const onRangeChange = useCallback((dates: [Date | null, Date | null]) => {
        if (customDate && typeof customDate === 'function') {
            customDate(dates);
        }
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setDropdownDisplayValue(
            start ? start.toDateString().slice(4) +
                (end ? " - " + end.toDateString().slice(4) : "") : ""
        );
        setIsDropdownOpen(false);
        if (typeof onDatePicker === 'function') {
            onDatePicker([start, end]);
        }
    }, [customDate, onDatePicker]);

    const handlerDateChange = useCallback((date: Date | null) => {
        setStartDate(date);
        if (typeof selectedDate === 'function') selectedDate(date);
        if (typeof onDatePicker === 'function') onDatePicker(date as Date);
    }, [selectedDate, onDatePicker]);

    const handlerDateTimeChange = useCallback((date: any) => {
        if (date != null) {
            setStartDate(date);
        } else {
            setStartDate(new Date());
        }
        if (typeof selectedDate === 'function') {
            selectedDate(date);
        }
        if (typeof onDatePicker === 'function') {
            onDatePicker(date);
        }
    }, [selectedDate, onDatePicker]); 
    
    const toggleDropdown = useCallback(() => {
        if (!isDisabled) {
            setIsDropdownOpen(!isDropdownOpen);
        }
    }, [isDisabled, isDropdownOpen]); 
    
    const clearDate = useCallback(() => {
        if (!isDisabled) {
            setStartDate(null);
            setEndDate(null);
            setDropdownDisplayValue("");
            if (typeof selectedDate === 'function') {
                selectedDate(null);
            }
            if (typeof onDatePicker === 'function') {
                onDatePicker([null, null]);
            }
            if (typeof customDate === 'function') {
                customDate([null, null]);
            }
        }
    }, [isDisabled, selectedDate, onDatePicker, customDate]);

    const yesterdayClickHandler = useCallback(() => {
        setActiveList("yesterday");
        const newDate = getYesterdayDate(today);
        onRangeChange([newDate, newDate]);
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    }, [today, onRangeChange]);

    const todayClickHandler = useCallback(() => {
        setActiveList("today");
        const { todayDate, newDate } = getTodayDate(today);
        onRangeChange([todayDate, newDate]); 
        setDropdownDisplayValue(newDate.toDateString().slice(4));
    }, [today, onRangeChange]);

    const lastSevenDaysClickHandler = useCallback(() => {
        setActiveList("lastSeven");
        const newDate = getLastSevenDaysDate(today);
        onRangeChange([newDate, today]);
        setDropdownDisplayValue(
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        );
    }, [today, onRangeChange]);

    const lastFourteenDaysClickHandler = useCallback(() => {
        setActiveList("lastFourteen");
        const newDate = getLastFourteenDaysDate(today);
        onRangeChange([newDate, today]);
        setDropdownDisplayValue(
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        );
    }, [today, onRangeChange]);

    useEffect(() => {
        if (dateForEdit) {
            setStartDate(new Date(dateForEdit));
        }
    }, [dateForEdit]); 
    
    useEffect(() => {
        if (state === DatePickerState.Expanded) {
            setIsDropdownOpen(true);
            setTimeout(() => {
                if (expandedDatePickerRef.current) {
                    expandedDatePickerRef.current.setOpen(true);
                }
            }, 100);
        }
    }, [state]);

    const dayClassName = useCallback((date: Date) => getDayClassName(date, startDate), [startDate]);
    
    useEffect(() => {
        setShowType(false);
        setShowState(true);
    }, [state]); 
    
    useEffect(() => {
        setShowState(false);
        setShowType(true);
    }, [type]);

    useEffect(() => {
        if (isDefaultDate) {
            setStartDate(today);
            setDropdownDisplayValue(today.toDateString().slice(4));
        } else {
            setStartDate(null);
            setDropdownDisplayValue("");
        }
    }, [isDefaultDate, today]);

    const sharedProps = useMemo(
        () => ({
            ...restProps,
            selectedDate,
            dateForEdit,
            titleText,
            showTitle,
            onDatePicker,
            datePickerStyleType,
            state,
            layout,
            customDate,
            isDisabled,
            isMandatory,
            placeholderText,
            type,
            changeIcon,
            showClearDate,
            isDefaultDate,
            SafeDatePicker,
            clearDate,
        }),
        [
            restProps, selectedDate, dateForEdit, titleText, showTitle, onDatePicker, datePickerStyleType, state, layout,
            customDate, isDisabled, isMandatory, placeholderText, type, changeIcon, showClearDate, isDefaultDate, clearDate,
        ]
    );

    return (
        <>
            <label
                className={clsx("rds-datepicker__label", !showTitle && "rds-datepicker__label--hidden")}
                aria-hidden={!showTitle}
            >
                {showTitle && titleText ? titleText : '\u00A0'}
                {showTitle && isMandatory && <span className="rds-datepicker__mandatory-indicator"> *</span>}
            </label>
            {showState && renderDatePickerStateView(
                state || DatePickerState.Default,
                startDate,
                handlerDateChange,
                handlerDateTimeChange,
                sharedProps,
                datePickerRef,
                expandedDatePickerRef,
                selectedDatePickerRef,
                dayClassName,
                CustomInputWithClear,
                CustomButtons
            )}
            {showType && renderDatePickerTypeView(
                type || 'Default',
                startDate,
                endDate,
                handlerDateChange,
                onRangeChange,
                sharedProps,
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
RdsDatepicker.displayName = "RdsDatepicker";
export default RdsDatepicker;