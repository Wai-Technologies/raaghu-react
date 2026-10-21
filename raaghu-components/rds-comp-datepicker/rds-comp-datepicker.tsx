import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import type DatePicker from "react-datepicker";
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
    DatePickerState,
    type RdsCompDatepickerProps,
} from './rds-comp-datepicker.types';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

const asBoolean = (value: unknown): boolean | undefined => (typeof value === 'boolean' ? value : undefined);

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
    disabled,
    required,
    showTitle: showTitleProp,
    isDisabled: isDisabledProp,
    isMandatory: isMandatoryProp,
    showClearDate: showClearDateProp,
    isDefaultDate: isDefaultDateProp,
    ...restProps
}: RdsCompDatepickerProps) => {
    if (isDisabledProp !== undefined) warnDeprecatedProp('RdsCompDatepicker', 'isDisabled', '`disabled`');
    if (isMandatoryProp !== undefined) warnDeprecatedProp('RdsCompDatepicker', 'isMandatory', '`required`');

    const legacyShowTitle = asBoolean(showTitleProp);
    const legacyIsDisabled = asBoolean(isDisabledProp);
    const legacyIsMandatory = asBoolean(isMandatoryProp);
    const legacyShowClearDate = asBoolean(showClearDateProp);
    const legacyIsDefaultDate = asBoolean(isDefaultDateProp);

    const showTitle = controls?.title ? controls.title === 'visible' : (legacyShowTitle ?? false);
    const isDisabled = disabled ?? (controls?.disabled ? controls.disabled === 'on' : (legacyIsDisabled ?? false));
    const isMandatory = required ?? (controls?.mandatory ? controls.mandatory === 'required' : (legacyIsMandatory ?? false));
    const showClearDate = controls?.clearDate ? controls.clearDate === 'visible' : (legacyShowClearDate ?? false);
    const isDefaultDate = controls?.defaultDate ? controls.defaultDate === 'on' : (legacyIsDefaultDate ?? false);

    const baseId = useId();
    const inputId = `rds-datepicker-${baseId}`;

    const [pickerState, setPickerState] = useState(() => {
        const start = dateForEdit ? new Date(dateForEdit) : (isDefaultDate ? new Date() : null);
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

    // Derive internal state from props during render (React 19 prev-state pattern).
    const [prevDateForEdit, setPrevDateForEdit] = useState(dateForEdit);
    if (dateForEdit !== prevDateForEdit) {
        setPrevDateForEdit(dateForEdit);
        if (dateForEdit) {
            const newDate = new Date(dateForEdit);
            updatePickerState({ startDate: newDate, dropdownDisplayValue: newDate.toDateString().slice(4) });
        }
    }

    const [defaultsInitialized, setDefaultsInitialized] = useState(isDefaultDate);
    if (isDefaultDate && !defaultsInitialized) {
        setDefaultsInitialized(true);
        const now = new Date();
        updatePickerState({ startDate: now, dropdownDisplayValue: now.toDateString().slice(4) });
    }
    const datePickerRef = useRef<DatePicker | null>(null);
    const expandedDatePickerRef = useRef<DatePicker | null>(null);
    const selectedDatePickerRef = useRef<DatePicker | null>(null);
    const customDropdownRef = useRef<HTMLDivElement | null>(null);
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
        // Cleared → keep internal state in sync with what the callbacks receive (null).
        updatePickerState({ startDate: date ?? null });
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
        const today = new Date();
        updatePickerState({ activeList: "yesterday" });
        const newDate = getYesterdayDate(today);
        onRangeChange([newDate, newDate]);
        updatePickerState({ dropdownDisplayValue: newDate.toDateString().slice(4) });
    }, [onRangeChange, updatePickerState]);

    const todayClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "today" });
        const { todayDate, newDate } = getTodayDate(today);
        onRangeChange([todayDate, newDate]);
        updatePickerState({ dropdownDisplayValue: newDate.toDateString().slice(4) });
    }, [onRangeChange, updatePickerState]);

    const lastSevenDaysClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "lastSeven" });
        const newDate = getLastSevenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        });
    }, [onRangeChange, updatePickerState]);

    const lastFourteenDaysClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "lastFourteen" });
        const newDate = getLastFourteenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            newDate.toDateString().slice(4) + " - " + today.toDateString().slice(4)
        });
    }, [onRangeChange, updatePickerState]);

    const customClickHandler = useCallback(() => {
        updatePickerState({ activeList: "custom" });
    }, [updatePickerState]);

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

    useEffect(() => {
        if (!isDropdownOpen || type !== "Custom") return;

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!target) return;

            if (customDropdownRef.current?.contains(target)) return;

            const targetElement = target instanceof Element ? target : target.parentElement;
            if (targetElement?.closest(".rds-datepicker__popper, .react-datepicker-popper, .react-datepicker")) {
                return;
            }

            updatePickerState({ isDropdownOpen: false });
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                updatePickerState({ isDropdownOpen: false });
            }
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("touchstart", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("touchstart", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDropdownOpen, type, updatePickerState]);

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
            clearDate,
            inputId,
            idPrefix: baseId,
        }),
        [
            restProps, selectedDate, dateForEdit, titleText, showTitle, onDatePicker, datePickerStyleType, state, layout,
            customDate, isDisabled, isMandatory, placeholderText, type, changeIcon, showClearDate, isDefaultDate, clearDate,
            inputId, baseId,
        ]
    );

    return (
        <>
            <label
                className={clsx("rds-datepicker__label", !showTitle && "rds-datepicker__label--hidden")}
                aria-hidden={!showTitle}
                htmlFor={showTitle ? inputId : undefined}
            >
                {showTitle && titleText ? titleText : ' '}
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
                customClickHandler,
                dayClassName,
                CustomInputWithClear,
                ExampleCustomInput,
                CustomButtons,
                customDropdownRef
            )}
        </>
    );
};
RdsDatepicker.displayName = "RdsCompDatepicker";
export default RdsDatepicker;
