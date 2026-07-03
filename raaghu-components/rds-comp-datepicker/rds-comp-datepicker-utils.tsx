import { createElement, type RefObject, type ReactNode } from "react";
import { CustomButtons } from "./CustomButtons";
import { createRenderCustomHeader } from "./renderCustomHeader";

const getRenderCustomHeader = (layout: string, datePickerStyleType: string) => {
    if (layout === "Multi Month") {
        return createRenderCustomHeader(false);
    }
    if (layout === "Default" && datePickerStyleType === "Dropdown") {
        return createRenderCustomHeader(true);
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
    const renderCustomHeader = getRenderCustomHeader(props.layout, props.datePickerStyleType);
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
    todayButton: <CustomButtons />,
    peekNextMonth: true,
    showMonthDropdown: props.datePickerStyleType === "Dropdown" && !usesCustomHeaderDropdown,
    showYearDropdown: props.datePickerStyleType === "Dropdown" && !usesCustomHeaderDropdown,
    dropdownMode: "select",
    dayClassName,
    ref: datePickerRef,
    renderCustomHeader,
    calendarClassName: props.layout === "Default" ? "rds-datepicker--layout-default" : undefined,
    ...overrides,
};
};

export const renderDatePickerStateView = (
    state: string,
    startDate: Date | null,
    handlerDateChange: (date: Date | null) => void,
    handlerDateTimeChange: (date: any) => void,
    props: any, 
    datePickerRef: RefObject<any>,
    expandedDatePickerRef: RefObject<any>,
    selectedDatePickerRef: RefObject<any>,
    dayClassName: (date: Date) => string,
    CustomInputWithClear: React.ElementType,
    CustomButtons: React.ElementType
) => {
    const SafeDatePicker = props.SafeDatePicker;

    if (state === "Default") {
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
                />
            ),
        });
        return (
            <div className="rds-datepicker__container rds-datepicker__container--default">
                <SafeDatePicker {...pickerProps} />
            </div>
        );
    } else if (state === "Expanded") {
        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateTimeChange,
            props,
            dayClassName,
            datePickerRef: expandedDatePickerRef,
            customInput: (
                <CustomInputWithClear
                    placeholder={props.placeholderText || "Select date"}
                    isDisabled={props.isDisabled}
                    showClearDate={props.showClearDate}
                    clearDate={props.clearDate}
                    changeIcon={props.changeIcon}
                />
            ),
            overrides: {
                timeInputLabel: "Time:",
                dateFormat: "MM/dd/yyyy h:mm aa",
                autoFocus: true,
            },
        });
        return (
            <div className="rds-datepicker__container rds-datepicker__container--expanded">
                <SafeDatePicker {...pickerProps} />
            </div>
        );
    } else if (state === "Selected") {
        const pickerProps = buildDatePickerProps({
            startDate,
            onChange: handlerDateTimeChange,
            props,
            dayClassName,
            datePickerRef: selectedDatePickerRef,
            customInput: (
                <CustomInputWithClear
                    placeholder={props.placeholderText || "Select date"}
                    isDisabled={props.isDisabled}
                    showClearDate={props.showClearDate}
                    clearDate={props.clearDate}
                    changeIcon={props.changeIcon}
                />
            ),
            overrides: {
                timeInputLabel: "Time:",
                dateFormat: "MM/dd/yyyy",
            },
        });
        return (
            <div className="rds-datepicker__container rds-datepicker__container--selected">
                <SafeDatePicker {...pickerProps} />
            </div>
        );
    }

    return null;
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
    dayClassName: (date: Date) => string,
    CustomInputWithClear: React.ElementType,
    ExampleCustomInput: React.ElementType,
    CustomButtons: React.ElementType
) => {
    const SafeDatePicker = props.SafeDatePicker;

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
                />
            ),
        });
        return (
            <div className="rds-datepicker__container rds-datepicker__container--default-type">
                <SafeDatePicker {...pickerProps} />
            </div>
        );
    } else if (type === "Custom") {
        const todayButtonElement = <CustomButtons />;
        const rangeCustomInput = createElement(ExampleCustomInput, { changeIcon: props.changeIcon });
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
                    openCustomPicker={toggleDropdown}
                />
            ),
            overrides: { open: false },
        });
        return (
            <div className="rds-datepicker__custom-dropdown">
                <SafeDatePicker {...pickerProps} />
              
                <ul className={`rds-datepicker__dropdown-menu ${isDropdownOpen ? "rds-datepicker__dropdown-menu--show" : ""}`}>
                    <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
                        <strong className="rds-datepicker__dropdown-label">Custom Date</strong>
                        <span className="rds-datepicker__dropdown-value">{dropdownDisplayValue}</span>
                    </li>

                    <li id="today" className={`rds-datepicker__dropdown-item ${activeList === "today" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={todayClickHandler}>Today</button>
                    </li>
                    <li id="yesterday" className={`rds-datepicker__dropdown-item ${activeList === "yesterday" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={yesterdayClickHandler}>Yesterday</button>
                    </li>
                    <li id="lastSeven" className={`rds-datepicker__dropdown-item ${activeList === "lastSeven" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={lastSevenDaysClickHandler}>Last 7 days</button>
                    </li>
                    <li id="lastFourteen" className={`rds-datepicker__dropdown-item ${activeList === "lastFourteen" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <button type="button" className="rds-datepicker__dropdown-action" onClick={lastFourteenDaysClickHandler}>Last 14 days</button>
                    </li>
                    <li id="custom" className={`rds-datepicker__dropdown-item ${activeList === "custom" ? "rds-datepicker__dropdown-item--active" : ""}`}>
                        <SafeDatePicker
                            selected={startDate || null}
                            onChange={onRangeChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            popperPlacement="right-start"
                            popperModifiers={[
                                { name: 'flip', options: { fallbackPlacements: ['left-start', 'bottom-start'] } },
                                { name: 'preventOverflow', options: { boundary: 'viewport' } },
                                { name: 'offset', options: { offset: [0, 8] } }
                            ]}
                            popperContainer={({ children }: { children: React.ReactNode }) => <div>{children}</div>}
                            popperClassName="rds-datepicker__popper"
                            disabled={props.isDisabled}
                            placeholderText={props.placeholderText || "Select date"}
                            showMonthYearPicker={props.layout === "Month Picker"}
                            showYearPicker={props.layout === "Year Picker"}
                            todayButton={todayButtonElement}
                            peekNextMonth={true}
                            showMonthDropdown={props.datePickerStyleType === "Dropdown" && !getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            showYearDropdown={props.datePickerStyleType === "Dropdown" && !getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            dropdownMode="select"
                            showPreviousMonths
                            monthsShown={props.layout === "Multi Month" ? 3 : 1}
                            dayClassName={dayClassName}
                            renderCustomHeader={getRenderCustomHeader(props.layout, props.datePickerStyleType)}
                            calendarClassName={props.layout === "Default" ? "rds-datepicker--layout-default" : undefined}
                            customInput={rangeCustomInput}
                        />
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};
