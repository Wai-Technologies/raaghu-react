import { type InputHTMLAttributes, type MouseEvent, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import RdsInput, { type RdsInputProps } from "../../raaghu-elements/rds-input/rds-input";

interface CustomInputWithClearProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onClick" | "value" | "size" | "color"> {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  showClearDate?: boolean;
  clearDate?: () => void;
  changeIcon?: string;
  openPickerIcon?: ReactNode;
  openCustomPicker?: () => void;
  onInputClick?: () => void;
  expanded?: boolean;
  controlsId?: string;
  ref?: Ref<HTMLInputElement>;
}

export const renderPickerIcon = (changeIcon?: string, openPickerIcon?: ReactNode) =>
  openPickerIcon ?? (changeIcon === "dashboard_settings"
    ? <SettingsIcon className="rds-datepicker__calendar-icon" />
    : <CalendarMonthIcon className="rds-datepicker__calendar-icon" />);

export const CustomInputWithClear = (
    {
      ref,
      value,
      onClick,
      placeholder,
      isDisabled: isDisabledProp,
      showClearDate,
      clearDate,
      changeIcon,
      openPickerIcon,
      openCustomPicker,
      onInputClick,
      expanded,
      controlsId,
      id,
      className,
      disabled,
      required,
      onChange,
      onFocus,
      onBlur,
      autoFocus: _autoFocus,
      ...inputProps
    }: CustomInputWithClearProps) => {
    const isDisabled = isDisabledProp ?? disabled;

    const handleTriggerClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (isDisabled) return;
      if (typeof openCustomPicker === "function") {
        openCustomPicker();
      } else if (typeof onClick === "function") {
        onClick();
      }
    };

    const isEmpty = !value || value === "";

    return (
      <div className="rds-datepicker__input-container" data-empty={isEmpty}>
        <RdsInput
          id={id}
          className={clsx(
            "rds-datepicker__input",
            isDisabled && "rds-datepicker--disabled",
            className
          )}
          value={value || ""}
          onClick={(e) => {
            if (!onInputClick) return handleTriggerClick(e);
            e.stopPropagation();
            if (!isDisabled) onInputClick();
          }}
          onChange={onChange as RdsInputProps["onChange"]}
          onFocus={onFocus as RdsInputProps["onFocus"]}
          onBlur={onBlur as RdsInputProps["onBlur"]}
          placeholder={placeholder}
          disabled={isDisabled}
          required={required}
          inputRef={ref}
          slotProps={{ htmlInput: inputProps }}
          endIcon={
            <span className="rds-datepicker__adornment">
              {showClearDate && value && (
                <button
                  type="button"
                  className={clsx("rds-datepicker__clear-button", isDisabled && "rds-datepicker__input--disabled")}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isDisabled) {
                      clearDate?.();
                    }
                  }}
                  title="Clear date"
                  aria-label="Clear date"
                >
                  <CloseIcon className="rds-datepicker__close-icon" />
                </button>
              )}
              <button
                type="button"
                className={clsx("rds-datepicker__icon-container", isDisabled && "rds-datepicker--disabled")}
                onClick={handleTriggerClick}
                title="Open calendar"
                aria-label="Open calendar"
                aria-haspopup="dialog"
                aria-expanded={expanded}
                aria-controls={expanded !== undefined ? controlsId : undefined}
                disabled={isDisabled}
              >
                {renderPickerIcon(changeIcon, openPickerIcon)}
              </button>
            </span>
          }
        />
      </div>
    );
  };

CustomInputWithClear.displayName = "CustomInputWithClear";
