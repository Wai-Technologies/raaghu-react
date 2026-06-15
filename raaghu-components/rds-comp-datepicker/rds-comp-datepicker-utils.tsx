import { forwardRef, type RefObject, type ReactNode } from "react";
import clsx from 'clsx';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import RdsInput from "../../raaghu-elements/rds-input/rds-input";

interface CustomButtonsProps {
    value?: string;
    onClick?: () => void;
}

export const CustomButtons = forwardRef<HTMLDivElement, CustomButtonsProps>(({ value, onClick }) => (
    <div className="rds-datepicker__button-wrapper">
        <RdsButton text="Cancel" size="small" style="outlined" />
        <RdsButton text="Apply" size="small" style="filled" />
    </div>
));

interface ExampleCustomInputProps {
    value?: string;
    onClick?: () => void;
    changeIcon?: string;
}

export const ExampleCustomInput = forwardRef<HTMLLIElement, ExampleCustomInputProps>(({ value, onClick, changeIcon }, ref) => (
    <li
        className="rds-datepicker__custom-input rds-datepicker__dropdown-item"
        onClick={onClick}
        ref={ref}
    >
        <span>Custom</span>
        <span>
            {changeIcon === "dashboard_settings" ? (
                <SettingsIcon className="rds-datepicker__calendar-icon" />
            ) : (
                <CalendarMonthIcon className="rds-datepicker__calendar-icon" />
            )}
        </span>
    </li>
));

interface CustomInputWithClearProps {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    isDisabled?: boolean;
    showClearDate?: boolean;
    clearDate?: () => void;
    changeIcon?: string;
    openCustomPicker?: () => void;
}

export const CustomInputWithClear = forwardRef<HTMLDivElement, CustomInputWithClearProps>(({ value, onClick, placeholder, isDisabled, showClearDate, clearDate, changeIcon, openCustomPicker }, ref) => {
    const handleTriggerClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation && e.stopPropagation();
        if (isDisabled) return;
        if (typeof openCustomPicker === 'function') {
            openCustomPicker();
        } else if (typeof onClick === 'function') {
            onClick();
        }
    };
    const isEmpty = !value || value === '';

    return (
        <div className="rds-datepicker__input-container" data-empty={isEmpty}>
            <RdsInput
                className={clsx("rds-datepicker__input", isDisabled && "rds-datepicker--disabled", showClearDate && value && "rds-datepicker__input--with-clear")}
                value={value || ''}
                onClick={handleTriggerClick}
                placeholder={placeholder}
                disabled={isDisabled}
                ref={ref}
            />
            {showClearDate && value && (
                <span
                    className={clsx("rds-datepicker__clear-button", isDisabled && "rds-datepicker__input--disabled")}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isDisabled) {
                            clearDate?.();
                        }
                    }}
                    title="Clear date"
                >
                    <CloseIcon
                        className="rds-datepicker__close-icon"
                    />
                </span>
            )} <span
                className={clsx("rds-datepicker__icon-container", isDisabled && "rds-datepicker--disabled")}
                onClick={handleTriggerClick}
                title="Open calendar"
            >
                {changeIcon === "dashboard_settings" ? (
                    <SettingsIcon
                        className="rds-datepicker__calendar-icon"
                    />
                ) : (
                    <CalendarMonthIcon
                        className="rds-datepicker__calendar-icon"
                    />
                )}
            </span>
        </div>
    );
});

interface CustomHeaderProps {
    date: Date;
    monthDate: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
}

export const renderCustomHeader = ({
  date,
  monthDate,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: CustomHeaderProps) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 6;
  const endYear = currentYear + 6;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const displayDate = monthDate || date;

  return (
    <div className="rds-datepicker__custom-header">
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="Previous Month"
      />
      <div className="rds-datepicker__custom-header-controls">
        <select
          value={displayDate.getMonth()}
          onChange={(e) => changeMonth(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--month"
        >
          {months.map((m, idx) => (
            <option key={m} value={idx}>{m}</option>
          ))}
        </select>

        <select
          value={displayDate.getFullYear()}
          onChange={(e) => changeYear(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--year"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--next"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="Next Month"
      />
    </div>
  );
};

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
    dropdownMode: "select",
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

                    <li id="today"
                        className={`rds-datepicker__dropdown-item ${activeList === "today" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={todayClickHandler}
                    >
                        Today
                    </li>
                    <li id="yesterday"
                        className={`rds-datepicker__dropdown-item ${activeList === "yesterday" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={yesterdayClickHandler}
                    >
                        Yesterday
                    </li>
                    <li id="lastSeven"
                        className={`rds-datepicker__dropdown-item ${activeList === "lastSeven" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={lastSevenDaysClickHandler}
                    >
                        Last 7 days
                    </li>
                    <li id="lastFourteen"
                        className={`rds-datepicker__dropdown-item ${activeList === "lastFourteen" ? "rds-datepicker__dropdown-item--active" : ""}`}
                        onClick={lastFourteenDaysClickHandler}
                    >
                        Last 14 days
                    </li>
                    <SafeDatePicker
                        selected={startDate || null}
                        onChange={onRangeChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                                popperPlacement="right-start"
                        popperModifiers={[
                                    { name: 'flip', options: { fallbackPlacements: ['left-start','bottom-start'] } },
                           { name: 'preventOverflow', options: { boundary: 'viewport' } },
                           { name: 'offset', options: { offset: [0, 8] } }
                        ]}
                        popperContainer={({ children }: { children: React.ReactNode }) => <div>{children}</div>}
                        popperClassName="rds-datepicker__popper"
                        customInput={<ExampleCustomInput changeIcon={props.changeIcon} />}
                        disabled={props.isDisabled}
                        placeholderText={props.placeholderText || "Select date"}
                        showMonthYearPicker={props.layout === "Month Picker"}
                        showYearPicker={props.layout === "Year Picker"}
                        todayButton={<CustomButtons />}
                        peekNextMonth={true}
                        showMonthDropdown={props.datePickerStyleType === "Dropdown"}
                        showYearDropdown={props.datePickerStyleType === "Dropdown"}
                        dropdownMode="select"
                        showPreviousMonths
                        monthsShown={props.layout === "Multi Month" ? 3 : 1}
                        dayClassName={dayClassName}
                        autoFocus
                        renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
                    />
                </ul>
            </div>
        );
    }

    return null;
};

CustomButtons.displayName = 'CustomButtons';
ExampleCustomInput.displayName = 'ExampleCustomInput';
CustomInputWithClear.displayName = 'CustomInputWithClear';
