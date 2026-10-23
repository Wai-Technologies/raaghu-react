import { createElement, type RefObject, type ReactNode } from "react";
import DatePicker, { type DatePickerProps } from "react-datepicker";
import { CustomButtons } from "./CustomButtons";
import { renderPickerIcon } from "./CustomInputWithClear";
import { RenderDefaultDropdownHeader, RenderMultiMonthHeader } from "./renderCustomHeader";

/** Stable popper container (module scope so react-datepicker does not remount the popper each render). */
const popperContainer = ({ children }: { children?: ReactNode }) => <div>{children}</div>;

const getRenderCustomHeader = (layout: string, datePickerStyleType: string) => {
    if (layout === "Multi Month") {
        return RenderMultiMonthHeader;
    }
    if (layout === "Default" && datePickerStyleType === "Dropdown") {
        return RenderDefaultDropdownHeader;
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
    id: props.inputId,
    ariaRequired: props.isMandatory ? "true" : undefined,
    renderCustomHeader,
    calendarClassName: props.layout === "Default" ? "rds-datepicker--layout-default" : undefined,
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
    ExampleCustomInput: React.ElementType,
    CustomButtons: React.ElementType,
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
        const todayButtonElement = <CustomButtons />;
        const rangeCustomInput = createElement(ExampleCustomInput, {
            changeIcon: props.changeIcon,
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
                            popperModifiers={[
                                { name: 'flip', options: { fallbackPlacements: ['left-start', 'bottom-start'] } },
                                { name: 'preventOverflow', options: { boundary: 'viewport' } },
                                { name: 'offset', options: { offset: [0, 8] } }
                            ] as unknown as DatePickerProps["popperModifiers"]}
                            popperContainer={popperContainer}
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
