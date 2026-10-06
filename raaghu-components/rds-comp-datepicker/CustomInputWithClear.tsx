import { forwardRef, type MouseEvent } from "react";
import clsx from "clsx";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";

interface CustomInputWithClearProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  showClearDate?: boolean;
  clearDate?: () => void;
  changeIcon?: string;
  openCustomPicker?: () => void;
}

export const CustomInputWithClear = forwardRef<HTMLDivElement, CustomInputWithClearProps>(
  (
    {
      value,
      onClick,
      placeholder,
      disabled,
      showClearDate,
      clearDate,
      changeIcon,
      openCustomPicker,
    },
    ref
  ) => {
    const handleTriggerClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (disabled) return;
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
          className={clsx(
            "rds-datepicker__input",
            disabled && "rds-datepicker--disabled",
            showClearDate && value && "rds-datepicker__input--with-clear"
          )}
          value={value || ""}
          onClick={handleTriggerClick}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
        />
        {showClearDate && value && (
          <button
            type="button"
            className={clsx("rds-datepicker__clear-button", disabled && "rds-datepicker__input--disabled")}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                clearDate?.();
              }
            }}
            title="Clear date"
          >
            <CloseIcon className="rds-datepicker__close-icon" />
          </button>
        )}
        <button
          type="button"
          className={clsx("rds-datepicker__icon-container", disabled && "rds-datepicker--disabled")}
          onClick={handleTriggerClick}
          title="Open calendar"
          disabled={disabled}
          style={{ background: "transparent", border: "none" }}
        >
          {changeIcon === "dashboard_settings" ? (
            <SettingsIcon className="rds-datepicker__calendar-icon" />
          ) : (
            <CalendarMonthIcon className="rds-datepicker__calendar-icon" />
          )}
        </button>
      </div>
    );
  }
);

CustomInputWithClear.displayName = "CustomInputWithClear";
