import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import clsx from 'clsx';
import "./rds-comp-datepicker.scss";
import {
    getYesterdayDate,
    getTodayDate,
    getLastSevenDaysDate,
    getLastFourteenDaysDate,
} from './rds-comp-datepicker-helpers';
import { DatepickerTypeView } from './rds-comp-datepicker-views';
import {
    DatePickerStyleType,
    type RdsCompDatepickerProps,
} from './rds-comp-datepicker.types';
import { resolveDeprecatedProp, warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

const asBoolean = (value: unknown): boolean | undefined => (typeof value === 'boolean' ? value : undefined);
const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;
const toDate = (value?: Date | string | null) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const match = DATE_ONLY.exec(value);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return new Date(value);
};
const formatDisplayDate = (date: Date, locale?: string) =>
    locale
        ? date.toLocaleDateString(locale, { month: "short", day: "2-digit", year: "numeric" })
        : date.toDateString().slice(4);
const styleTypeByVariant = { dropdown: DatePickerStyleType.Dropdown, selector: DatePickerStyleType.Selector };

const RdsDatepicker = ({
    selectedDate,
    dateForEdit,
    titleText: titleTextProp,
    datePickerLabel,
    onDatePicker,
    datePickerStyleType: datePickerStyleTypeProp,
    layout,
    customDate,
    controls,
    placeholderText: placeholderTextProp,
    type,
    changeIcon,
    disabled,
    required,
    showTitle: showTitleProp,
    isDisabled: isDisabledProp,
    isMandatory: isMandatoryProp,
    showClearDate: showClearDateProp,
    isDefaultDate: isDefaultDateProp,
    value,
    defaultValue,
    onChange,
    label,
    variant,
    placeholder,
    clearable,
    selected = false,
    minDate,
    maxDate,
    locale,
    openPickerIcon,
    className,
    sx,
    ref,
    isDropdownOpen: _isDropdownOpen,
    ...restProps
}: RdsCompDatepickerProps) => {
    void _isDropdownOpen;
    ([
        [controls?.mandatory, 'controls.mandatory', '`required`'],
        [dateForEdit, 'dateForEdit', '`value`'],
        [onDatePicker, 'onDatePicker', '`onChange`'],
        [selectedDate, 'selectedDate', '`onChange`'],
        [customDate, 'customDate', '`onChange`'],
        [placeholderTextProp, 'placeholderText', '`placeholder`'],
        [changeIcon, 'changeIcon', '`openPickerIcon`'],
        [showClearDateProp, 'showClearDate', '`clearable`'],
        [controls?.clearDate, 'controls.clearDate', '`clearable`'],
        [isDefaultDateProp, 'isDefaultDate', '`defaultValue`'],
        [controls?.defaultDate, 'controls.defaultDate', '`defaultValue`'],
    ] as const).forEach(([used, prop, replacement]) => {
        if (used !== undefined) warnDeprecatedProp('RdsCompDatepicker', prop, replacement);
    });

    const legacyShowTitle = asBoolean(showTitleProp);
    const topLevelDisabled = resolveDeprecatedProp(
        disabled,
        asBoolean(isDisabledProp),
        'RdsCompDatepicker',
        'isDisabled',
        '`disabled`',
    );
    const topLevelRequired = resolveDeprecatedProp(
        required,
        asBoolean(isMandatoryProp),
        'RdsCompDatepicker',
        'isMandatory',
        '`required`',
    );
    const legacyShowClearDate = asBoolean(showClearDateProp);
    const legacyIsDefaultDate = asBoolean(isDefaultDateProp);

    const titleText = label ?? datePickerLabel ?? titleTextProp;
    const placeholderText = placeholder ?? placeholderTextProp;
    const datePickerStyleType = variant ? styleTypeByVariant[variant] : datePickerStyleTypeProp;
    const editValue = value !== undefined ? value : dateForEdit;

    const showTitle = controls?.title
        ? controls.title === 'visible'
        : (legacyShowTitle ?? (label !== undefined || datePickerLabel !== undefined));
    const isDisabled = topLevelDisabled ?? (controls?.disabled ? controls.disabled === 'on' : false);
    const isMandatory = topLevelRequired ?? (controls?.mandatory ? controls.mandatory === 'required' : false);
    const showClearDate = clearable ?? (controls?.clearDate ? controls.clearDate === 'visible' : (legacyShowClearDate ?? false));
    const isDefaultDate = controls?.defaultDate ? controls.defaultDate === 'on' : (legacyIsDefaultDate ?? false);

    const baseId = useId();
    const inputId = `rds-datepicker-${baseId}`;

    const [pickerState, setPickerState] = useState(() => {
        const start = toDate(editValue) ?? toDate(defaultValue) ?? (isDefaultDate ? new Date() : null);
        return {
            dropdownDisplayValue: start ? formatDisplayDate(start, locale) : "",
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

    const [prevEditValue, setPrevEditValue] = useState(editValue);
    if (editValue !== prevEditValue) {
        setPrevEditValue(editValue);
        if (editValue || value !== undefined) {
            const newDate = toDate(editValue);
            updatePickerState({ startDate: newDate, dropdownDisplayValue: newDate ? formatDisplayDate(newDate, locale) : "" });
        }
    }

    const emitChange = useCallback((next: Date | null | [Date | null, Date | null]) => {
        if (typeof onDatePicker === 'function') onDatePicker(next as Date);
        onChange?.(next);
    }, [onDatePicker, onChange]);

    const [defaultsInitialized, setDefaultsInitialized] = useState(isDefaultDate);
    if (isDefaultDate && !defaultsInitialized) {
        setDefaultsInitialized(true);
        const now = new Date();
        updatePickerState({ startDate: now, dropdownDisplayValue: formatDisplayDate(now, locale) });
    }
    const customDropdownRef = useRef<HTMLDivElement | null>(null);

    const onRangeChange = useCallback((dates: [Date | null, Date | null]) => {
        if (customDate && typeof customDate === 'function') {
            customDate(dates);
        }
        const [start, end] = dates;
        updatePickerState({
            startDate: start,
            endDate: end,
            dropdownDisplayValue:
            start ? formatDisplayDate(start, locale) +
                (end ? " - " + formatDisplayDate(end, locale) : "") : "",
            ...(end || !start ? { isDropdownOpen: false } : {}),
        });
        emitChange([start, end]);
    }, [customDate, emitChange, updatePickerState, locale]);

    const handlerDateChange = useCallback((date: Date | null) => {
        updatePickerState({ startDate: date });
        if (typeof selectedDate === 'function') selectedDate(date);
        emitChange(date);
    }, [selectedDate, emitChange, updatePickerState]);

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
            emitChange([null, null]);
            if (typeof customDate === 'function') {
                customDate([null, null]);
            }
        }
    }, [isDisabled, selectedDate, emitChange, customDate, updatePickerState]);

    const yesterdayClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "yesterday" });
        const newDate = getYesterdayDate(today);
        onRangeChange([newDate, newDate]);
        updatePickerState({ dropdownDisplayValue: formatDisplayDate(newDate, locale) });
    }, [onRangeChange, updatePickerState, locale]);

    const todayClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "today" });
        const { todayDate, newDate } = getTodayDate(today);
        onRangeChange([todayDate, newDate]);
        updatePickerState({ dropdownDisplayValue: formatDisplayDate(newDate, locale) });
    }, [onRangeChange, updatePickerState, locale]);

    const lastSevenDaysClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "lastSeven" });
        const newDate = getLastSevenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            formatDisplayDate(newDate, locale) + " - " + formatDisplayDate(today, locale)
        });
    }, [onRangeChange, updatePickerState, locale]);

    const lastFourteenDaysClickHandler = useCallback(() => {
        const today = new Date();
        updatePickerState({ activeList: "lastFourteen" });
        const newDate = getLastFourteenDaysDate(today);
        onRangeChange([newDate, today]);
        updatePickerState({ dropdownDisplayValue:
            formatDisplayDate(newDate, locale) + " - " + formatDisplayDate(today, locale)
        });
    }, [onRangeChange, updatePickerState, locale]);

    const customClickHandler = useCallback(() => {
        updatePickerState({ activeList: "custom" });
    }, [updatePickerState]);

    useEffect(() => {
        if (!isDropdownOpen || type !== "Custom") return;

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node | null;
            if (!target) return;

            if (customDropdownRef.current?.contains(target)) return;

            const targetElement = target instanceof Element ? target : target.parentElement;
            if (targetElement?.closest(".rds-datepicker__popper")) {
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

    const theme = useTheme();
    const isCompact = useMediaQuery(theme.breakpoints.down('sm'));

    const sharedProps = useMemo(
        () => ({
            isCompact,
            selectedDate,
            dateForEdit,
            titleText,
            showTitle,
            onDatePicker,
            datePickerStyleType,
            layout,
            customDate,
            isDisabled,
            isMandatory,
            placeholderText,
            type,
            changeIcon,
            openPickerIcon,
            showClearDate,
            isDefaultDate,
            clearDate,
            inputId,
            idPrefix: baseId,
            minDate,
            maxDate,
            locale,
        }),
        [
            selectedDate, dateForEdit, titleText, showTitle, onDatePicker, datePickerStyleType, layout,
            customDate, isDisabled, isMandatory, placeholderText, type, changeIcon, openPickerIcon, showClearDate, isDefaultDate, clearDate,
            inputId, baseId, minDate, maxDate, locale, isCompact,
        ]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <Box {...restProps} ref={ref} className={clsx('rds-datepicker', selected && 'rds-datepicker--selected', className)} sx={sx}>
                <label
                    className={clsx("rds-datepicker__label", !showTitle && "rds-datepicker__label--hidden")}
                    aria-hidden={!showTitle}
                    htmlFor={showTitle ? inputId : undefined}
                >
                    {showTitle && titleText ? titleText : ' '}
                    {showTitle && isMandatory && <span className="rds-datepicker__mandatory-indicator"> *</span>}
                </label>
                <DatepickerTypeView
                    type={type || 'Default'}
                    startDate={startDate}
                    endDate={endDate}
                    onSingleChange={handlerDateChange}
                    onRangeChange={onRangeChange}
                    props={sharedProps}
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={toggleDropdown}
                    dropdownDisplayValue={dropdownDisplayValue}
                    activeList={activeList}
                    todayClickHandler={todayClickHandler}
                    yesterdayClickHandler={yesterdayClickHandler}
                    lastSevenDaysClickHandler={lastSevenDaysClickHandler}
                    lastFourteenDaysClickHandler={lastFourteenDaysClickHandler}
                    customClickHandler={customClickHandler}
                    customDropdownRef={customDropdownRef}
                />
            </Box>
        </LocalizationProvider>
    );
};
RdsDatepicker.displayName = "RdsCompDatepicker";
export default RdsDatepicker;
