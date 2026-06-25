import React, { forwardRef } from "react";
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
                className={`rds-datepicker__input ${isDisabled ? 'rds-datepicker--disabled' : ''} ${showClearDate && value ? 'rds-datepicker__input--with-clear' : 'rds-datepicker__input--without-clear'}`}
                value={value || ''}
                onClick={handleTriggerClick}
                placeholder={placeholder}
                disabled={isDisabled}
                ref={ref}
            />
            {showClearDate && value && (
                <span
                    className={`rds-datepicker__clear-button ${isDisabled ? 'rds-datepicker__input--disabled' : 'rds-datepicker__clear-button--clickable'}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!isDisabled) {
                            clearDate?.();
                        }
                    }}
                    title="Clear date"
                >
                    <CloseIcon className="rds-datepicker__close-icon" />
                </span>
            )} <span
                className={`rds-datepicker__icon-container ${isDisabled ? 'rds-datepicker--disabled' : 'rds-datepicker__icon-container--clickable'}`}
                onClick={handleTriggerClick}
                title="Open calendar"
            >
                {changeIcon === "dashboard_settings" ? (
                    <SettingsIcon className="rds-datepicker__calendar-icon" />
                ) : (
                    <CalendarMonthIcon className="rds-datepicker__calendar-icon" />
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

    if (startDate && date.getFullYear() === startDate.getFullYear() && date.getMonth() === startDate.getMonth() && date.getDate() === startDate.getDate()) {
        return 'rds-datepicker__day--selected';
    }

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

export { renderDatePickerStateView, renderDatePickerTypeView } from './rds-comp-datepicker-renderers';

CustomButtons.displayName = 'CustomButtons';
ExampleCustomInput.displayName = 'ExampleCustomInput';
CustomInputWithClear.displayName = 'CustomInputWithClear';
