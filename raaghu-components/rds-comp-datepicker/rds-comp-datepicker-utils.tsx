import type { RefObject, ReactNode } from "react";
import { CustomButtons } from "./CustomButtons";
import { ExampleCustomInput } from "./ExampleCustomInput";
import { CustomInputWithClear } from "./CustomInputWithClear";
import { renderCustomHeader } from "./renderCustomHeader";

export const getDayClassName = (date: Date, startDate: Date | null) => {
    const today = new Date();
    const referenceDate = startDate ?? today;

    const referenceMonth = referenceDate.getMonth();
    const referenceYear = referenceDate.getFullYear();

    const selectedMonth = date.getMonth();
    const selectedYear = date.getFullYear();

    const isPrevMonth = selectedYear < referenceYear || (selectedYear === referenceYear && selectedMonth < referenceMonth);
    const isNextMonth = selectedYear > referenceYear || (selectedYear === referenceYear && selectedMonth > referenceMonth);

    // Highlight selected day
    if (startDate && date.getFullYear() === startDate.getFullYear() && date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate()) {
        return 'rds-datepicker__day--selected';
    }

    // Dim days that belong to previous/next month
    if (isPrevMonth || isNextMonth) {
        return 'rds-datepicker__day--outside';
    }

    return '';
};

export const getYesterdayDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );
};

export const getTodayDate = (today: Date) => {
    return {
        todayDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ),
        newDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        )
    };
};

export const getLastSevenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7 + 1
    );
};

export const getLastFourteenDaysDate = (today: Date) => {
    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14 + 1
    );
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
}) => ({
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
    showMonthDropdown: props.datePickerStyleType === "Dropdown",
    showYearDropdown: props.datePickerStyleType === "Dropdown",
    dropdownMode: "scroll",
    dayClassName,
    ref: datePickerRef,
    renderCustomHeader: props.layout === "Multi Month" ? renderCustomHeader : undefined,
    ...overrides,
});

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
    props: DatePickerComponentProps,
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
                            showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                            showYearDropdown={props.datePickerStyleType === "Dropdown"}
                            dropdownMode="scroll"
                            showPreviousMonths
                            monthsShown={props.layout === "Multi Month" ? 3 : 1}
                            dayClassName={dayClassName}
                            renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                            customInput={<ExampleCustomInput changeIcon={props.changeIcon} />}
                        />
                    </li>
                </ul>
            </div>
        );
    }

    return null;
};

CustomButtons.displayName = 'CustomButtons';
ExampleCustomInput.displayName = 'ExampleCustomInput';
CustomInputWithClear.displayName = 'CustomInputWithClear';

export { CustomButtons, ExampleCustomInput, CustomInputWithClear };
