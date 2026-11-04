import { createElement, type MouseEvent, type Ref, type RefObject, type ReactNode } from "react";
import DatePicker, { type DatePickerProps } from "react-datepicker";
import { CustomButtons } from "./CustomButtons";
import { renderPickerIcon } from "./CustomInputWithClear";
import { DEFAULT_RDS_DATEPICKER_LOCALE_TEXT, type RdsDatepickerLocaleText } from "./rds-comp-datepicker.types";
import {
    RenderDefaultDropdownHeader,
    RenderMultiMonthHeader,
} from "./renderCustomHeader";

interface CustomHeaderProps {
    date: Date;
    monthDate: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    decreaseMonth?: () => void;
    increaseMonth?: () => void;
    prevMonthButtonDisabled?: boolean;
    nextMonthButtonDisabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
    text?: RdsDatepickerLocaleText;
}

interface DatePickerBounds {
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
    text?: RdsDatepickerLocaleText;
}

type DatePickerChangeValue = Date | null;

type DatePickerRef = RefObject<DatePicker | null>;

type DatePickerOverrides = Partial<DatePickerProps>;

type DatepickerSharedProps = {
    layout?: string;
    datePickerStyleType?: string;
    minDate?: Date;
    maxDate?: Date;
    locale?: string;
    isDisabled?: boolean;
    isMandatory?: boolean;
    placeholderText?: string;
    showClearDate?: boolean;
    clearDate?: () => void;
    changeIcon?: ReactNode;
    openPickerIcon?: ReactNode;
    inputId?: string;
    idPrefix?: string;
    text?: RdsDatepickerLocaleText;
};

const popperContainer = ({ children }: { children?: ReactNode }) => (
    <div>{children}</div>
);

/** Preset-menu trigger for the nested range picker (G4-106). */
const PresetRangeCustomInput = ({
    ref,
    onClick,
    onActivate,
    label,
}: {
    label: string;
    ref?: Ref<HTMLButtonElement>;
    value?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onActivate?: () => void;
}) => (
    <button
        type="button"
        className="rds-datepicker__dropdown-action rds-datepicker__dropdown-action--custom"
        onClick={(event) => {
            onActivate?.();
            onClick?.(event);
        }}
        ref={ref}
    >
        {label}
    </button>
);

const getRenderCustomHeader = (
    layout: string,
    datePickerStyleType: string,
    bounds?: DatePickerBounds
) => {
    if (layout === "Multi Month") {
        return (headerProps: CustomHeaderProps) => (
            <RenderMultiMonthHeader {...headerProps} {...bounds} />
        );
    }

    if (layout === "Default" && datePickerStyleType === "Dropdown") {
        return (headerProps: CustomHeaderProps) => (
            <RenderDefaultDropdownHeader {...headerProps} {...bounds} />
        );
    }

    return undefined;
};

const buildDatePickerProps = ({
    startDate,
    onChange,
    props,
    dayClassName,
    customInput,
    overrides = {},
}: {
    startDate: Date | null;
    onChange: (date: DatePickerChangeValue) => void;
    props: DatepickerSharedProps;
    dayClassName: (date: Date) => string;
    customInput: ReactNode;
    overrides?: DatePickerOverrides;
}): DatePickerProps => {
    const renderCustomHeader = getRenderCustomHeader(
        props.layout ?? "Default",
        props.datePickerStyleType ?? "Selector",
        {
            minDate: props.minDate,
            maxDate: props.maxDate,
            locale: props.locale,
            text: props.text,
        }
    );

    const usesCustomHeaderDropdown = Boolean(renderCustomHeader);

    const pickerProps = {
        selected: startDate,
        onChange,
        customInput: customInput as DatePickerProps["customInput"],
        wrapperClassName: "rds-datepicker__wrapper",
        popperPlacement: "bottom-start",
        disabled: props.isDisabled,
        placeholderText: props.placeholderText || (props.text ?? DEFAULT_RDS_DATEPICKER_LOCALE_TEXT).selectDate,
        showMonthYearPicker: props.layout === "Month Picker",
        showYearPicker: props.layout === "Year Picker",
        showPreviousMonths: true,
        monthsShown: props.layout === "Multi Month" ? 3 : 1,
        todayButton: <CustomButtons />,
        scrollableMonthYearDropdown:
            props.datePickerStyleType === "Dropdown",
        peekNextMonth: true,
        showMonthDropdown:
            props.datePickerStyleType === "Dropdown" &&
            !usesCustomHeaderDropdown,
        showYearDropdown:
            props.datePickerStyleType === "Dropdown" &&
            !usesCustomHeaderDropdown,
        dropdownMode: "select",
        dayClassName,
        id: props.inputId,
        ariaRequired: props.isMandatory ? "true" : undefined,
        renderCustomHeader,
        calendarClassName:
            [
                "rds-datepicker__calendar",
                props.layout === "Default"
                    ? "rds-datepicker--layout-default"
                    : undefined,
            ]
                .filter(Boolean)
                .join(" ") || undefined,
        minDate: props.minDate,
        maxDate: props.maxDate,
        locale: props.locale,
        ...overrides,
    };

    return pickerProps as unknown as DatePickerProps;
};

export const renderDatePickerTypeView = (
    type: string,
    startDate: Date | null,
    endDate: Date | null,
    handlerDateChange: (date: Date | null) => void,
    onRangeChange: (dates: [Date | null, Date | null]) => void,
    props: DatepickerSharedProps,
    isDropdownOpen: boolean,
    toggleDropdown: () => void,
    dropdownDisplayValue: string,
    datePickerRef: DatePickerRef,
    activeList: string,
    todayClickHandler: () => void,
    yesterdayClickHandler: () => void,
    lastSevenDaysClickHandler: () => void,
    lastFourteenDaysClickHandler: () => void,
    customClickHandler: () => void,
    dayClassName: (date: Date) => string,
    CustomInputWithClear: React.ElementType,
    customDropdownRef?: RefObject<HTMLDivElement | null>
) => {
    void datePickerRef;
    const text = props.text ?? DEFAULT_RDS_DATEPICKER_LOCALE_TEXT;

    if (type === "Default") {
        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateChange,
            props,
            dayClassName,
            customInput: createElement(CustomInputWithClear, {
                placeholder: props.placeholderText || text.selectDate,
                text,
                isDisabled: props.isDisabled,
                showClearDate: props.showClearDate,
                clearDate: props.clearDate,
                changeIcon: props.changeIcon,
                openPickerIcon: props.openPickerIcon,
            }),
        });

        return (
            <div className="rds-datepicker__container rds-datepicker__container--default-type">
                <DatePicker {...pickerProps} />
            </div>
        );
    } else if (type === "Custom") {
        const rangeCustomInput = createElement(PresetRangeCustomInput, {
            onActivate: customClickHandler,
            label: text.custom,
        });

        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateChange,
            props,
            dayClassName,
            customInput: createElement(CustomInputWithClear, {
                placeholder: props.placeholderText || text.selectDate,
                text,
                isDisabled: props.isDisabled,
                showClearDate: props.showClearDate,
                clearDate: props.clearDate,
                changeIcon: props.changeIcon,
                openPickerIcon: props.openPickerIcon,
                openCustomPicker: toggleDropdown,
                expanded: isDropdownOpen,
                controlsId: `${props.idPrefix}-presets`,
            }),
            overrides: { open: false },
        });

        return (
            <div
                className="rds-datepicker__custom-dropdown"
                ref={customDropdownRef}
            >
                <DatePicker {...pickerProps} />

                <ul
                    id={`${props.idPrefix}-presets`}
                    className={`rds-datepicker__dropdown-menu ${
                        isDropdownOpen
                            ? "rds-datepicker__dropdown-menu--show"
                            : ""
                    }`}
                >
                    <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
                        <strong className="rds-datepicker__dropdown-label">
                            {text.customDate}
                        </strong>

                        {dropdownDisplayValue ? (
                            <span className="rds-datepicker__dropdown-value">
                                {dropdownDisplayValue}
                            </span>
                        ) : null}
                    </li>

                    <li
                        id={`${props.idPrefix}-today`}
                        className={`rds-datepicker__dropdown-item ${
                            activeList === "today"
                                ? "rds-datepicker__dropdown-item--active"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="rds-datepicker__dropdown-action"
                            onClick={todayClickHandler}
                        >
                            {text.today}
                        </button>
                    </li>

                    <li
                        id={`${props.idPrefix}-yesterday`}
                        className={`rds-datepicker__dropdown-item ${
                            activeList === "yesterday"
                                ? "rds-datepicker__dropdown-item--active"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="rds-datepicker__dropdown-action"
                            onClick={yesterdayClickHandler}
                        >
                            {text.yesterday}
                        </button>
                    </li>

                    <li
                        id={`${props.idPrefix}-lastSeven`}
                        className={`rds-datepicker__dropdown-item ${
                            activeList === "lastSeven"
                                ? "rds-datepicker__dropdown-item--active"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="rds-datepicker__dropdown-action"
                            onClick={lastSevenDaysClickHandler}
                        >
                            {text.lastSevenDays}
                        </button>
                    </li>

                    <li
                        id={`${props.idPrefix}-lastFourteen`}
                        className={`rds-datepicker__dropdown-item ${
                            activeList === "lastFourteen"
                                ? "rds-datepicker__dropdown-item--active"
                                : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="rds-datepicker__dropdown-action"
                            onClick={lastFourteenDaysClickHandler}
                        >
                            {text.lastFourteenDays}
                        </button>
                    </li>

                    <li
                        id={`${props.idPrefix}-custom`}
                        className={`rds-datepicker__dropdown-item rds-datepicker__dropdown-item--custom ${
                            activeList === "custom"
                                ? "rds-datepicker__dropdown-item--active"
                                : ""
                        }`}
                    >
                        <DatePicker
                            selected={startDate}
                            onChange={onRangeChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            popperPlacement="right-start"
                            popperModifiers={
                                [
                                    {
                                        name: "flip",
                                        options: {
                                            fallbackPlacements: [
                                                "left-start",
                                                "bottom-start",
                                            ],
                                        },
                                    },
                                    {
                                        name: "preventOverflow",
                                        options: { boundary: "viewport" },
                                    },
                                    {
                                        name: "offset",
                                        options: { offset: [0, 8] },
                                    },
                                ] as DatePickerProps["popperModifiers"]
                            }
                            popperContainer={popperContainer}
                            popperClassName="rds-datepicker__popper"
                            todayButton={<CustomButtons />}
                            disabled={props.isDisabled}
                            placeholderText={
                                props.placeholderText || text.selectDate
                            }
                            showMonthYearPicker={
                                props.layout === "Month Picker"
                            }
                            showYearPicker={props.layout === "Year Picker"}
                            peekNextMonth
                            showMonthDropdown={
                                props.datePickerStyleType === "Dropdown" &&
                                !getRenderCustomHeader(
                                    props.layout ?? "Default",
                                    props.datePickerStyleType ?? "Selector"
                                )
                            }
                            showYearDropdown={
                                props.datePickerStyleType === "Dropdown" &&
                                !getRenderCustomHeader(
                                    props.layout ?? "Default",
                                    props.datePickerStyleType ?? "Selector"
                                )
                            }
                            dropdownMode="select"
                            showPreviousMonths
                            monthsShown={
                                props.layout === "Multi Month" ? 3 : 1
                            }
                            dayClassName={dayClassName}
                            renderCustomHeader={getRenderCustomHeader(
                                props.layout ?? "Default",
                                props.datePickerStyleType ?? "Selector",
                                { text }
                            )}
                            calendarClassName={
                                [
                                    "rds-datepicker__calendar",
                                    props.layout === "Default"
                                        ? "rds-datepicker--layout-default"
                                        : undefined,
                                ]
                                    .filter(Boolean)
                                    .join(" ") || undefined
                            }
                            customInput={rangeCustomInput}
                        />

                        <span
                            className="rds-datepicker__dropdown-custom-icon"
                            aria-hidden="true"
                        >
                           {renderPickerIcon(
    typeof props.changeIcon === "string" ? props.changeIcon : undefined,
    typeof props.openPickerIcon === "string" ? props.openPickerIcon : undefined
)}
                        </span>
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};
