import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./rds-comp-datepicker.scss";
import { CustomButtons } from './CustomButtons';
import { CustomInputWithClear } from './CustomInputWithClear';
import { ExampleCustomInput } from './ExampleCustomInput';
import {
    getDayClassName,
    getYesterdayDate,
    getTodayDate,
    getLastSevenDaysDate,
    getLastFourteenDaysDate,
} from './rds-comp-datepicker-helpers';
import {
    renderDatePickerStateView,
    renderDatePickerTypeView
} from './rds-comp-datepicker-utils';
import {
    DatePickerLayout,
    DatePickerState,
    DatePickerStyleType,
    type RdsCompDatepickerProps,
} from './rds-comp-datepicker.types';

const SafeDatePicker = DatePicker;

const RdsDatepicker = ({
    selectedDate,
    dateForEdit,
    titleText,
    onDatePicker,
    datePickerStyleType,
    state,
    layout,
    customDate,
    controls,
    placeholderText,
    type,
    changeIcon,
    ...legacyProps
}: RdsCompDatepickerProps) => {
    const legacyShowTitle = typeof legacyProps['showTitle'] === 'boolean' ? (legacyProps['showTitle'] as boolean) : undefined;
    const legacyIsDisabled = typeof legacyProps['isDisabled'] === 'boolean' ? (legacyProps['isDisabled'] as boolean) : undefined;
    const legacyIsMandatory = typeof legacyProps['isMandatory'] === 'boolean' ? (legacyProps['isMandatory'] as boolean) : undefined;
    const legacyShowClearDate = typeof legacyProps['showClearDate'] === 'boolean' ? (legacyProps['showClearDate'] as boolean) : undefined;
    const legacyIsDefaultDate = typeof legacyProps['isDefaultDate'] === 'boolean' ? (legacyProps['isDefaultDate'] as boolean) : undefined;

    const showTitle = controls?.title ? controls.title === 'visible' : (legacyShowTitle ?? false);
    const isDisabled = controls?.disabled ? controls.disabled === 'on' : (legacyIsDisabled ?? false);
    const isMandatory = controls?.mandatory ? controls.mandatory === 'required' : (legacyIsMandatory ?? false);
    const showClearDate = controls?.clearDate ? controls.clearDate === 'visible' : (legacyShowClearDate ?? false);
    const isDefaultDate = controls?.defaultDate ? controls.defaultDate === 'on' : (legacyIsDefaultDate ?? false);

    const {
        showTitle: _legacyShowTitle,
        isDisabled: _legacyIsDisabled,
        isMandatory: _legacyIsMandatory,
        showClearDate: _legacyShowClearDate,
        isDefaultDate: _legacyIsDefaultDate,
        ...restProps
    } = legacyProps as typeof legacyProps & {
        showTitle?: boolean;
        isDisabled?: boolean;
        isMandatory?: boolean;
        showClearDate?: boolean;
        isDefaultDate?: boolean;
    };

    const today = useMemo(() => new Date(), []); 
    const [pickerState, setPickerState] = useState(() => {
        const start = dateForEdit ? new Date(dateForEdit) : (isDefaultDate ? today : null);
        return {
            dropdownDisplayValue: start ? start.toDateString().slice(4) : "",
            activeList: "custom",
            startDate: start as Date | null,
            endDate: null as Date | null,
            isDropdownOpen: false,
        };
    });
    const { dropdownDisplayValue, activeList, startDate, endDate, isDropdownOpen } = pickerState;
    const updatePickerState = useCallback((updates: Partial<typeof pickerState> | ((prev: typeof pickerState) => Partial<typeof pickerState>)) => {
        setPickerState((prev) => ({
            ...prev,
            ...(typeof updates === 'function' ? updates(prev) : updates),
        }));
    }, []);
    const prevDateForEditRef = useRef(dateForEdit);
    if (dateForEdit !== prevDateForEditRef.current) {
        prevDateForEditRef.current = dateForEdit;
        if (dateForEdit) {
            const newDate = new Date(dateForEdit);
            updatePickerState({ startDate: newDate, dropdownDisplayValue: newDate.toDateString().slice(4) });
        }
    }

    const initializedDefaultsRef = useRef(isDefaultDate);
    if (isDefaultDate && !initializedDefaultsRef.current) {
        initializedDefaultsRef.current = true;
        updatePickerState({ startDate: today, dropdownDisplayValue: today.toDateString().slice(4) });
    }
    const datePickerRef = useRef<DatePicker | null>(null);
    const expandedDatePickerRef = useRef<DatePicker | null>(null);
    const selectedDatePickerRef = useRef<DatePicker | null>(null);
    const showState = state === DatePickerState.Expanded || state === DatePickerState.Selected;
    const showType = !showState;

    const onRangeChange = useCallback((dates: [Date | null, Date | null]) => {
        if (customDate && typeof customDate === 'function') {
            customDate(dates);
        }
        const [start, end] = dates;
        updatePickerState({
            startDate: start,
            endDate: end,
            dropdownDisplayValue:
            start ? start.toDateString().slice(4) +
                (end ? " - " + end.toDateString().slice(4) : "") : "",
            isDropdownOpen: false,
        });
        if (typeof onDatePicker === 'function') {
            onDatePicker([start, end]);
        }
    }, [customDate, onDatePicker, updatePickerState]);

    const handlerDateChange = useCallback((date: Date | null) => {
        updatePickerState({ startDate: date });
        if (typeof selectedDate === 'function') selectedDate(date);
        if (typeof onDatePicker === 'function') onDatePicker(date as Date);
    }, [selectedDate, onDatePicker, updatePickerState]);

    const handlerDateTimeChange = useCallback((date: any) => {
        if (date != null) {
            updatePickerState({ startDate: date });
        } else {
            updatePickerState({ startDate: new Date() });
        }
        if (typeof selectedDate === 'function') {
            selectedDate(date);
        }
        if (typeof onDatePicker === 'function') {
            onDatePicker(date);
        }
    }, [selectedDate, onDatePicker, updatePickerState]); 
    
    const toggleDropdown = useCallback(() => {
        if (!isDisabled) {
            updatePickerState((prev) => ({ isDropdownOpen: !prev.isDropdownOpen }));
        }
    }, [isDisabled, updatePickerState]); 
    
    const clearDate = useCallback(() => {
        if (!isDisabled) {
            updatePickerState({ startDate: null, endDate: null, dropdownDisplayValue: "" });
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
    }, [isDisabled, selectedDate, onDatePicker, customDate, updatePickerState]);

    const yesterdayClickHandler = useCallback(() => {
        updatePickerState({ activeList: "yesterday" });
        const newDate = getYesterdayDate(today);
        onRangeChange([newDate, newDate]);
        updatePickerState({ dropdownDisplayValue: newDate.toDateString().slice(4) });
    }, [today, onRangeChange, updatePickerState]);

    const todayClickHandler = useCallback(() => {
        updatePickerState({ activeList: "today" });
        const { todayDate, newDate } = getTodayDate(today);
        onRangeChange([todayDate, newDate]); 
        updatePickerState({ dropdownDisplayValue: newDate.toDateString().slice(4) });
    }, [today, onRangeChange, updatePickerState]);

    const lastSevenDaysClickHandler = useCallback(() => {
        updatePickerState({ activeList: "lastSeven" });
        const newDate = getLastSevenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        });
    }, [today, onRangeChange, updatePickerState]);

    const lastFourteenDaysClickHandler = useCallback(() => {
        updatePickerState({ activeList: "lastFourteen" });
        const newDate = getLastFourteenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        });
    }, [today, onRangeChange, updatePickerState]);

    const dayClassName = useCallback((date: Date) => getDayClassName(date, startDate), [startDate]);

    useEffect(() => {
        if (state === DatePickerState.Expanded) {
            const timeoutId = window.setTimeout(() => {
                if (expandedDatePickerRef.current) {
                    expandedDatePickerRef.current.setOpen(true);
                }
            }, 100);

            return () => {
                window.clearTimeout(timeoutId);
            };
        }
    }, [state]);

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
RdsDatepicker.displayName = "RdsCompDatepicker";
export default RdsDatepicker;