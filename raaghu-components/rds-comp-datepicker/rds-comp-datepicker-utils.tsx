import { createElement, type MouseEvent, type Ref, type RefObject, type ReactNode } from "react";
import DatePicker, { type DatePickerProps } from "react-datepicker";
import { renderPickerIcon } from "./CustomInputWithClear";
import { RenderDefaultDropdownHeader, RenderMultiMonthHeader } from "./renderCustomHeader";

/** Stable popper container (module scope so react-datepicker does not remount the popper each render). */
const popperContainer = ({ children }: { children?: ReactNode }) => <div>{children}</div>;

/** Preset-menu trigger for the nested range picker (G4-106). */
const PresetRangeCustomInput = ({
    ref,
    onClick,
    onActivate,
}: {
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
        Custom
    </button>
);

const getRenderCustomHeader = (
    layout: string,
    datePickerStyleType: string,
    bounds?: { minDate?: Date; maxDate?: Date; locale?: string }
) => {
    if (layout === "Multi Month") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (headerProps: any) => <RenderMultiMonthHeader {...headerProps} {...bounds} />;
    }
    if (layout === "Default" && datePickerStyleType === "Dropdown") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (headerProps: any) => <RenderDefaultDropdownHeader {...headerProps} {...bounds} />;
    }
    return undefined;
};

const buildDatePickerProps = ({
    startDate,
    onChange,
    props,
    dayClassName,
    datePickerRef,
    customInput,
    overrides = {},
}: {
    startDate: Date | null;
    onChange: (date: any) => void;
    props: any;
    dayClassName: (date: Date) => string;
    datePickerRef: RefObject<any>;
    customInput: ReactNode;
    overrides?: Record<string, any>;
}) => {
    const renderCustomHeader = getRenderCustomHeader(props.layout, props.datePickerStyleType, {
        minDate: props.minDate,
        maxDate: props.maxDate,
        locale: props.locale,
    });
    const usesCustomHeaderDropdown = Boolean(renderCustomHeader);

    return {
    selected: startDate || null,
    onChange,
    customInput,
    wrapperClassName: "rds-datepicker__wrapper",
    disabled: props.isDisabled,
    placeholderText: props.placeholderText || "Select date",
    showMonthYearPicker: props.layout === "Month Picker",
    showYearPicker: props.layout === "Year Picker",
    showPreviousMonths: true,
    monthsShown: props.layout === "Multi Month" ? 3 : 1,
    scrollableMonthYearDropdown: props.datePickerStyleType === "Dropdown",
    peekNextMonth: true,
    showMonthDropdown: props.datePickerStyleType === "Dropdown" && !usesCustomHeaderDropdown,
    showYearDropdown: props.datePickerStyleType === "Dropdown" && !usesCustomHeaderDropdown,
    dropdownMode: "select",
    dayClassName,
    ref: datePickerRef,
    id: props.inputId,
    ariaRequired: props.isMandatory ? "true" : undefined,
    renderCustomHeader,
    calendarClassName: ["rds-datepicker__calendar", props.layout === "Default" ? "rds-datepicker--layout-default" : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
    minDate: props.minDate,
    maxDate: props.maxDate,
    locale: props.locale,
    ...overrides,
} as unknown as DatePickerProps;
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
    datePickerRef: RefObject<any>,
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

    if (type === "Default") {
        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateChange,
            props,
            dayClassName,
            datePickerRef,
            customInput: (
                <CustomInputWithClear
                    placeholder={props.placeholderText || "Select date"}
                    isDisabled={props.isDisabled}
                    showClearDate={props.showClearDate}
                    clearDate={props.clearDate}
                    changeIcon={props.changeIcon}
                    openPickerIcon={props.openPickerIcon}
                />
            ),
        });
        return (
            <div className="rds-datepicker__container rds-datepicker__container--default-type">
                <DatePicker {...pickerProps} />
            </div>
        );
    } else if (type === "Custom") {
        const rangeCustomInput = createElement(PresetRangeCustomInput, {
            onActivate: customClickHandler,
        });
        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateChange,
            props,
            dayClassName,
            datePickerRef,
            customInput: (
                <CustomInputWithClear
                    placeholder={props.placeholderText || "Select date"}
                    isDisabled={props.isDisabled}
                    showClearDate={props.showClearDate}
                    clearDate={props.clearDate}
                    changeIcon={props.changeIcon}
                    openPickerIcon={props.openPickerIcon}
                    openCustomPicker={toggleDropdown}
                    expanded={isDropdownOpen}
                    controlsId={`${props.idPrefix}-presets`}
                />
            ),
            overrides: { open: false },
        });
        return (
            <div className="rds-datepicker__custom-dropdown" ref={customDropdownRef}>
                <DatePicker {...pickerProps} />
              
                <ul id={`${props.idPrefix}-presets`} className={`rds-datepicker__dropdown-menu ${isDropdownOpen ? "rds-datepicker__dropdown-menu--show" : ""}`}>
                    <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
                        <strong className="rds-datepicker__dropdown-label">Custom Date</strong>
                        {dropdownDisplayValue ? (
                            <span className="rds-datepicker__dropdown-value">{dropdownDisplayValue}</span>
                        ) : null}
                    </li>

                    <li id={`${props.idPrefix}-today`} className={`rds-datepicker__dropdown-item ${activeList === "today" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={todayClickHandler}>Today</button>
                    </li>
                    <li id={`${props.idPrefix}-yesterday`} className={`rds-datepicker__dropdown-item ${activeList === "yesterday" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={yesterdayClickHandler}>Yesterday</button>
                    </li>
                    <li id={`${props.idPrefix}-lastSeven`} className={`rds-datepicker__dropdown-item ${activeList === "lastSeven" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={lastSevenDaysClickHandler}>Last 7 days</button>
                    </li>
                    <li id={`${props.idPrefix}-lastFourteen`} className={`rds-datepicker__dropdown-item ${activeList === "lastFourteen" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={lastFourteenDaysClickHandler}>Last 14 days</button>
                    </li>
                    <li id={`${props.idPrefix}-custom`} className={`rds-datepicker__dropdown-item rds-datepicker__dropdown-item--custom ${activeList === "custom" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <DatePicker
                            selected={startDate || null}
                            onChange={onRangeChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            popperPlacement="right-start"
                            popperContainer={popperContainer}
                            popperClassName="rds-datepicker__popper"
                            disabled={props.isDisabled}
                            placeholderText={props.placeholderText || "Select date"}
                            showMonthYearPicker={props.layout === "Month Picker"}
                            showYearPicker={props.layout === "Year Picker"}
                            peekNextMonth={true}
                            showMonthDropdown={props.datePickerStyleType === "Dropdown" && !getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            showYearDropdown={props.datePickerStyleType === "Dropdown" && !getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            dropdownMode="select"
                            showPreviousMonths
                            monthsShown={props.layout === "Multi Month" ? 3 : 1}
                            dayClassName={dayClassName}
                            renderCustomHeader={getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            calendarClassName={["rds-datepicker__calendar", props.layout === "Default" ? "rds-datepicker--layout-default" : undefined].filter(Boolean).join(" ") || undefined}
                            customInput={rangeCustomInput}
                        />
                        <span className="rds-datepicker__dropdown-custom-icon" aria-hidden="true">
                            {renderPickerIcon(props.changeIcon, props.openPickerIcon)}
                        </span>
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};
